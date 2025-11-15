import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import UmkmCard from './components/UmkmCard';
import UmkmDetail from './components/UmkmDetail';
import Footer from './components/Footer';
import { umkmData } from './data/umkmData';
import { UMKM, Category, Review } from './types';
import { db, isFirebaseConfigValid, firebaseError } from './firebaseConfig';
import { collection, doc, onSnapshot, writeBatch, updateDoc, arrayUnion } from 'firebase/firestore';
import FirebaseSetupGuide from './components/FirebaseSetupGuide';

// Icons
const SearchIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
);
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const FilterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
);
const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" /></svg>
);
const ArrowUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <line x1="12" y1="19" x2="12" y2="5"></line>
        <polyline points="5 12 12 5 19 12"></polyline>
    </svg>
);
const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);
const ChevronDownIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="6 9 12 15 18 9"></polyline></svg>
);


const FAVORITES_KEY = 'umkm_favorites';

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | 'Semua' | 'Favorit'>('Semua');
  const [selectedUmkmId, setSelectedUmkmId] = useState<number | null>(null);
  const [umkms, setUmkms] = useState<UMKM[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFirebaseConnected, setIsFirebaseConnected] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [favoriteIds, setFavoriteIds] = useState<Set<number>>(new Set());
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [sortOrder, setSortOrder] = useState<'default' | 'nearest' | 'farthest'>('default');
  
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    if (typeof window !== 'undefined' && localStorage.getItem('theme')) {
        return localStorage.getItem('theme') as 'light' | 'dark';
    }
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
  });

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    localStorage.setItem('theme', newTheme);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  // Tampilkan halaman panduan jika terjadi error spesifik saat inisialisasi Firebase
  if (isFirebaseConfigValid && firebaseError?.includes('Service firestore is not available')) {
    return <FirebaseSetupGuide />;
  }

  // Geolocation Logic
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.warn(`Geolocation error: ${error.message}`);
        }
      );
    }
  }, []);

  // Routing Logic based on URL Hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      const match = hash.match(/^#\/umkm\/(\d+)$/);
      if (match) {
        const id = parseInt(match[1], 10);
        setSelectedUmkmId(id);
      } else {
        setSelectedUmkmId(null);
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange(); // Check hash on initial load

    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Favorite Logic
  useEffect(() => {
    try {
        const storedFavorites = localStorage.getItem(FAVORITES_KEY);
        if (storedFavorites) {
            setFavoriteIds(new Set(JSON.parse(storedFavorites)));
        }
    } catch (error) {
        console.error("Failed to parse favorites from localStorage", error);
        setFavoriteIds(new Set());
    }
  }, []);

  const toggleFavorite = useCallback((umkmId: number) => {
    setFavoriteIds(prevIds => {
        const newIds = new Set(prevIds);
        if (newIds.has(umkmId)) {
            newIds.delete(umkmId);
        } else {
            newIds.add(umkmId);
        }
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newIds)));
        return newIds;
    });
  }, []);

  const isFavorite = useCallback((umkmId: number) => {
    return favoriteIds.has(umkmId);
  }, [favoriteIds]);

  // Firebase Data Fetching
  useEffect(() => {
    // Jalankan mode online HANYA jika konfigurasi valid DAN db berhasil diinisialisasi
    if (isFirebaseConfigValid && db) {
      setIsFirebaseConnected(true);
      const umkmCollection = collection(db, "umkms");

      const seedDatabase = async () => {
          console.log("Database kosong, melakukan seeding...");
          const batch = writeBatch(db);
          umkmData.forEach((umkm) => {
              const docRef = doc(db, "umkms", umkm.id.toString());
              batch.set(docRef, umkm);
          });
          await batch.commit();
          console.log("Seeding selesai.");
      };

      const unsubscribe = onSnapshot(umkmCollection, async (querySnapshot) => {
        if (querySnapshot.empty) {
          await seedDatabase();
        } else {
          const umkmsFromDb = querySnapshot.docs.map(doc => doc.data() as UMKM);
          const localDataMap = new Map(umkmData.map(item => [item.id, item]));

          // Gabungkan data Firestore dengan data lokal untuk memastikan semua field ada
          const mergedUmkms = umkmsFromDb.map(dbUmkm => {
            const localUmkm = localDataMap.get(dbUmkm.id);
            return {
                ...(localUmkm || {}), // Use local as a base to get all properties, with empty object fallback
                ...dbUmkm,            // Override with any data from DB
                // Explicitly ensure critical array fields are arrays to prevent crashes
                reviews: dbUmkm.reviews || localUmkm?.reviews || [],
                photos: (dbUmkm.photos && dbUmkm.photos.length > 0) 
                    ? dbUmkm.photos 
                    : (localUmkm?.photos && localUmkm.photos.length > 0
                        ? localUmkm.photos
                        : ['https://picsum.photos/seed/placeholder/800/600']),
            } as UMKM;
          });

          setUmkms(mergedUmkms.sort((a, b) => a.id - b.id));
        }
        setLoading(false);
      }, (error) => {
        console.error("Error mengambil data dari Firestore: ", error);
        setLoading(false);
        // Jika ada error (misal: permissions), fallback ke mode lokal dengan data yang ada
        setUmkms(umkmData); 
        setIsFirebaseConnected(false);
      });

      return () => unsubscribe();
    } else {
      // Mode Lokal: Konfigurasi Firebase tidak valid atau gagal inisialisasi
      setIsFirebaseConnected(false);
      setUmkms(umkmData);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      const shouldShowScrollButton = window.scrollY > 400;
      setScrolled(isScrolled);
      setShowScrollTopButton(shouldShowScrollButton);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = useMemo(() => ['Semua', ...Object.values(Category), 'Favorit'], []);

  const trendingUmkms = useMemo(() => umkms.filter(u => u.rating >= 4.8).sort((a,b) => b.rating - a.rating), [umkms]);
  
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const filteredAndSortedUmkms = useMemo(() => {
    let resultsWithDistance = umkms.map(umkm => ({
        ...umkm,
        distance: userLocation ? calculateDistance(userLocation.lat, userLocation.lng, umkm.location.lat, umkm.location.lng) : undefined
    }));

    let filteredResults: UMKM[];
    if (selectedCategory === 'Favorit') {
        filteredResults = resultsWithDistance.filter(umkm => favoriteIds.has(umkm.id));
    } else if (selectedCategory === 'Semua') {
        filteredResults = resultsWithDistance;
    } else {
        filteredResults = resultsWithDistance.filter(umkm => umkm.category === selectedCategory);
    }

    filteredResults = filteredResults.filter(umkm =>
        umkm.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        umkm.description.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOrder === 'nearest' && userLocation) {
        filteredResults.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
    } else if (sortOrder === 'farthest' && userLocation) {
        filteredResults.sort((a, b) => (b.distance ?? -Infinity) - (a.distance ?? -Infinity));
    }

    return filteredResults;
  }, [searchTerm, selectedCategory, umkms, favoriteIds, userLocation, sortOrder]);
  
  const handleSelectUmkm = (umkm: UMKM) => {
    window.location.hash = `#/umkm/${umkm.id}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBack = () => {
    window.location.hash = '';
  };

  const handleUpdateReviews = async (umkmId: number, newReview: Review) => {
    const umkmToUpdate = umkms.find(u => u.id === umkmId);
    if (!umkmToUpdate) return;
    
    const updatedReviews = [newReview, ...(umkmToUpdate.reviews || [])];
    const newRating = updatedReviews.length > 0
      ? parseFloat((updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length).toFixed(1))
      : 0;
    
    if (isFirebaseConnected && db) {
        const docRef = doc(db, "umkms", umkmId.toString());
        try {
            await updateDoc(docRef, {
                reviews: arrayUnion(newReview),
                rating: newRating
            });
            // Listener real-time akan memperbarui state secara otomatis
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    } else {
        // Fallback: perbarui state lokal
        setUmkms(prevUmkms =>
            prevUmkms.map(umkm =>
                umkm.id === umkmId
                    ? { ...umkm, reviews: updatedReviews, rating: newRating }
                    : umkm
            )
        );
    }
  };

  const handleUpdateUmkm = async (updatedUmkm: UMKM) => {
    if (isFirebaseConnected && db) {
      const docRef = doc(db, "umkms", updatedUmkm.id.toString());
      try {
        const { distance, ...dataToSave } = updatedUmkm;
        await updateDoc(docRef, { ...dataToSave });
      } catch (error) {
        console.error("Gagal memperbarui data UMKM:", error);
      }
    } else {
      setUmkms(prevUmkms =>
        prevUmkms.map(umkm =>
          umkm.id === updatedUmkm.id ? updatedUmkm : umkm
        )
      );
    }
  };
  
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const selectedUmkm = useMemo(() => umkms.find(u => u.id === selectedUmkmId), [umkms, selectedUmkmId]);
  
  if (loading) {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-white">
            <div className="text-center">
                <svg className="animate-spin h-10 w-10 text-gray-800 dark:text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <p className="text-xl font-semibold">Memuat Data UMKM...</p>
                <p className="text-gray-500 dark:text-white/50">Memeriksa koneksi database...</p>
            </div>
        </div>
    )
  }

  return (
    <>
      <AnimatePresence>
        {selectedUmkm ? (
          <motion.div key="detail">
            <UmkmDetail 
              umkm={selectedUmkm} 
              onBack={handleBack}
              onUpdateReviews={(newReview) => handleUpdateReviews(selectedUmkm.id, newReview)}
              onUpdateUmkm={handleUpdateUmkm}
              isFavorite={isFavorite(selectedUmkm.id)}
              onToggleFavorite={() => toggleFavorite(selectedUmkm.id)}
            />
          </motion.div>
        ) : (
          <motion.div key="main" className="min-h-screen bg-gray-100 dark:bg-black text-gray-800 dark:text-white transition-colors duration-300">
            <div className="relative overflow-hidden">
              <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-orange-500/20 rounded-full blur-[120px] animate-pulse" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-pink-500/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
              </div>
              
              <div className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled ? 'bg-gray-100/80 dark:bg-black/80 backdrop-blur-xl border-b border-gray-200 dark:border-white/10' : 'bg-transparent'
              }`}>
                <div className="max-w-7xl mx-auto px-6 py-6 flex justify-between items-center">
                  <Header />
                  <Header.ThemeToggle theme={theme} onToggle={toggleTheme} />
                </div>
              </div>

              <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-32 z-10">
                <div className="text-center max-w-4xl mx-auto mb-12">
                  <h2 className="text-6xl md:text-7xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                    Temukan UMKM
                    <span className="block bg-gradient-to-r from-orange-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                      Favorit Anda
                    </span>
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-white/60 leading-relaxed">
                    Jelajahi bisnis lokal terbaik di sekitar Anda dan dukung ekonomi lokal
                  </p>
                </div>

                <div className="max-w-2xl mx-auto mb-16">
                  <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : 'scale-100'}`}>
                    <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-3xl blur-xl" />
                    <div className="relative bg-white/80 dark:bg-white/10 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/20 overflow-hidden">
                      <div className="flex items-center px-6 py-5">
                        <SearchIcon className="w-6 h-6 text-gray-400 dark:text-white/50 mr-4" />
                        <input
                          type="text"
                          placeholder="Cari UMKM favorit Anda..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          onFocus={() => setIsSearchFocused(true)}
                          onBlur={() => setIsSearchFocused(false)}
                          className="flex-1 bg-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-white/40 text-lg focus:outline-none"
                        />
                        {searchTerm && (
                          <button
                            onClick={() => setSearchTerm("")}
                            className="ml-4 w-8 h-8 rounded-full bg-gray-500/10 dark:bg-white/10 hover:bg-gray-500/20 dark:hover:bg-white/20 flex items-center justify-center transition-all"
                          >
                            <XIcon className="w-4 h-4 text-gray-800 dark:text-white" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
                   <div className="flex items-center gap-3">
                     <FilterIcon className="w-5 h-5 text-gray-500 dark:text-white/50 hidden md:block" />
                     <div className="flex gap-3 flex-wrap justify-center">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setSelectedCategory(category as Category | 'Semua' | 'Favorit')}
                          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-medium transition-all duration-300 ${
                            selectedCategory === category
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg shadow-orange-500/30'
                              : 'bg-white dark:bg-white/5 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10'
                          }`}
                        >
                          {category === 'Favorit' && <HeartIcon className="w-4 h-4" />}
                          {category}
                        </button>
                      ))}
                    </div>
                   </div>

                   <div className="relative">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value as any)}
                            disabled={!userLocation}
                            className="appearance-none cursor-pointer w-full md:w-auto px-6 py-3 rounded-2xl font-medium transition-all duration-300 bg-white dark:bg-white/5 text-gray-700 dark:text-white/70 hover:bg-gray-200 dark:hover:bg-white/10 border border-gray-200 dark:border-white/10 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <option value="default">Urutkan: Relevansi</option>
                            <option value="nearest">Urutkan: Jarak Terdekat</option>
                            <option value="farthest">Urutkan: Jarak Terjauh</option>
                        </select>
                        <ChevronDownIcon className="w-5 h-5 text-gray-500 dark:text-white/50 absolute top-1/2 right-4 -translate-y-1/2 pointer-events-none" />
                    </div>
                </div>
              </div>
            </div>

            {selectedCategory === "Semua" && !searchTerm && (
              <div className="relative max-w-7xl mx-auto px-6 mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <TrendingUpIcon className="w-7 h-7 text-orange-500 dark:text-orange-400" />
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white">Sedang Trending</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {trendingUmkms.slice(0, 4).map((umkm) => (
                    <div key={umkm.id} onClick={() => handleSelectUmkm(umkm)} className="group relative cursor-pointer">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-3xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                      <div className="relative bg-white/80 dark:bg-white/5 backdrop-blur-xl rounded-3xl border border-gray-200 dark:border-white/10 overflow-hidden group-hover:border-gray-300 dark:group-hover:border-white/30 transition-all duration-300">
                        <div className="relative h-48 overflow-hidden">
                          <img src={umkm.photos[0]} alt={umkm.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />
                        </div>
                        <div className="p-5">
                          <div className="flex items-center gap-2 mb-2">
                            <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                            <span className="text-gray-900 dark:text-white font-semibold">{umkm.rating.toFixed(1)}</span>
                            <span className="text-gray-500 dark:text-white/40 text-sm">({umkm.reviews.length})</span>
                          </div>
                          <h4 className="text-gray-900 dark:text-white font-bold text-lg mb-1 group-hover:text-orange-500 dark:group-hover:text-orange-400 transition-colors truncate">{umkm.name}</h4>
                          <p className="text-gray-500 dark:text-white/50 text-sm">{umkm.category}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="relative max-w-7xl mx-auto px-6 pb-20">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                  {searchTerm ? `Hasil untuk "${searchTerm}"` : selectedCategory === 'Favorit' ? 'UMKM Favorit Anda' : 'Semua UMKM'}
                </h3>
                <div className="text-gray-500 dark:text-white/50">
                  <span className="font-semibold text-orange-500 dark:text-orange-400">{filteredAndSortedUmkms.length}</span> tempat ditemukan
                </div>
              </div>

              {filteredAndSortedUmkms.length === 0 ? (
                <div className="text-center py-20">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gray-200 dark:bg-white/5 flex items-center justify-center">
                    <SearchIcon className="w-12 h-12 text-gray-400 dark:text-white/30" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-3">
                    {selectedCategory === 'Favorit' ? 'Anda belum punya favorit' : 'Tidak ada hasil'}
                  </h3>
                  <p className="text-gray-500 dark:text-white/50 text-lg">
                    {selectedCategory === 'Favorit' ? 'Tekan ikon hati untuk menambahkan.' : 'Coba gunakan kata kunci yang berbeda'}
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedUmkms.map((umkm, index) => (
                    <UmkmCard 
                      key={umkm.id} 
                      umkm={umkm} 
                      onSelect={handleSelectUmkm} 
                      index={index} 
                      isFavorite={isFavorite(umkm.id)}
                      onToggleFavorite={() => toggleFavorite(umkm.id)}
                    />
                  ))}
                </div>
              )}
            </div>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showScrollTopButton && !selectedUmkm && (
          <motion.button
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-11 h-11 bg-white/80 dark:bg-white/10 backdrop-blur-md border border-gray-200 dark:border-white/20 rounded-full flex items-center justify-center text-gray-800 dark:text-white hover:bg-white dark:hover:bg-white/20 hover:scale-110 active:scale-95 transition-all duration-300 z-[60]"
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            aria-label="Scroll to top"
          >
            <ArrowUpIcon className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
