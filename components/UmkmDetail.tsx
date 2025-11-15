import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { UMKM, Review } from '../types';
import Reviews from './Reviews';

// Icons
const XIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
);
const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
);
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
);
const PhoneIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
);
const ClockIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
);
const PriceTagIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
);
const CameraIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path><circle cx="12" cy="13" r="3"></circle></svg>
);
const ChevronLeftIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="15 18 9 12 15 6"></polyline></svg>
);
const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="9 18 15 12 9 6"></polyline></svg>
);
const ShareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
);
const LinkIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72"></path></svg>
);
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);
const TwitterIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.9 3.3 4.9s-1.4.6-2.8.4c-1.4 2.1-3.3 3.4-3.3 3.4s-1.4-.2-2.8-1.1c-1.4 1-2.8 1.1-2.8 1.1s-1.9-1.3-3.3-3.4c-1.4.2-2.8-.4-2.8-.4s1.7-3.5 3.3-4.9c-1.3-1.3-2-3.4-2-3.4s1.4-.2 2.8.6c1.4-1.9 3.3-3.2 3.3-3.2s1.4.4 2.8 1.5c1.4-1.1 2.8-1.5 2.8-1.5z"></path></svg>
);
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="0" {...props}><path d="M16.75 13.96c.25.13.43.2.5.25.13.06.14.01.25-.12.12-.14.13-.25.13-.44 0-.13-.01-.25-.03-.37-.02-.13-.04-.25-.04-.25s-.01-.01 0 0c0-.01.01-.03.01-.03 0 0 0 0 0 0-.01-.02-.01-.03-.02-.04 0 0 0 0 0 0-.01-.02-.02-.03-.03-.04 0 0 0 0 0 0-.01-.01-.02-.03-.03-.04l-.01-.01c-.01-.01-.02-.02-.03-.03 0-.01-.01-.01-.02-.02l-.01-.01c-.01-.01-.02-.02-.03-.03s-.02-.02-.03-.03c-.02-.02-.04-.03-.06-.05 0 0-.01-.01-.01-.01-.43-.25-.86-.5-1.29-.75s-.86-.5-1.29-.75c-.01 0-.01 0-.02-.01l-.01-.01c-.03-.02-.06-.03-.09-.05 0 0-.01 0-.01-.01-.03-.01-.06-.03-.09-.04-.03-.01-.06-.02-.09-.03-.03-.01-.06-.02-.09-.03l-.11-.03c-.03,0-.06-.01-.09-.02s-.06-.01-.09-.01l-.14-.02c-.06,0-.11-.01-.17-.01-.06,0-.11,0-.17.01s-.11.01-.17.02l-.11.02c-.03.01-.06.01-.09.02l-.11.03c-.03.01-.06.02-.09.03-.03.01-.06.02-.09.03-.03.01-.06.03-.09.04-.03.01-.06.02-.09.04s-.06.03-.09.05l-.02.01c-1.38.81-2.75 1.63-4.13 2.44-.13.08-.25.15-.38.23-.13.08-.25.15-.38.23.01-.01.01-.01 0 0-.01 0-.01.01-.02.01l-.01.01c-.01.01-.02.01-.03.02 0 0-.01.01-.01.01s-.02.02-.03.03l-.01.01c-.01.01-.02.02-.03.03 0 0-.01.01-.01.01-.01.01-.02.02-.02.03l-.01.01c-.01.01-.01.02-.02.03l-.01.01c-.01.01-.01.02-.02.03s-.01.02-.02.03l-.01.02c-.01.01-.01.02-.02.03l-.01.02c0 .01-.01.02-.01.03v.01c0 .01-.01.02-.01.03l-.01.04c0 .01-.01.02-.01.03l-.01.04c0 .01,0 .02-.01.03s0 .03-.01.04l-.01.04c0 .01,0 .02,0 .03v.04c0 .01,0 .02,0 .03v.04c0 .01,0 .02,0 .03v.04c0 .01,0 .02,0 .03v.04c0 .01,0 .02,0 .03l.01.04c0 .01,0 .02.01.03l.01.04c0 .01.01.02.01.03l.01.04c0 .01.01.02.01.03l.01.04c.01.01.01.02.02.03l.01.02c.01.01.01.02.02.03l.01.02c.01.01.02.02.02.03l.01.02c.01.01.02.02.03.03h.01c.01.01.02.02.03.03l.01.01c.01.01.02.02.03.03l.03.03c.01.01.02.01.02.02l.03.03c.02.02.04.03.06.05l.01.01c.13.06.25.13.38.19.13.06.25.13.38.19.68.31 1.38.63 2.06.94.06.03.13.06.19.09.25.13.5.25.75.38.25.13.5.25.75.38.13.06.25.13.38.19.06.03.13.06.19.09s.13.06.19.09c.06.03.13.06.19.09.13.06.25.13.38.19.13.06.25.13.38.19.13.06.25.13.38.19.06.03.13.06.19.09s.13.06.19.09c.06.03.13.06.19.09l.38.19c.06.03.13.06.19.09.06.03.13.06.19.09l.38.19c.06.03.13.06.19.09.13.06.25.13.38.19l.19.09c.06.03.13.06.19.09s.13.06.19.09l.19.09c.06.03.13.06.19.09.13.06.25.13.38.19.13.06.25.13.38.19.13.06.25.13.38.19.01,0,.01,0,.02,0h.01c.12-.06.25-.12.37-.18s.25-.12.37-.18c.01,0,.01,0,.02,0h.01c.12-.06.25-.12.37-.18l.37-.18c.12-.06.25-.12.37-.18.12-.06.25-.12.37-.18.12-.06.25-.12.37-.18.12-.06.25-.12.37-.18.12-.06.25-.12.37-.18.12-.06.25-.12.37-.18.01,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,ci.w-.25.13-.5.25-.75.37a.1.1 0 00-.03.01.03.03 0 000 .01.03.03 0 00.01.02.04.04 0 00.01.02.04.04 0 00.02.01.04.04 0 00.02.01.05.05 0 00.02.01h.02c.02.01.03.01.05.02a.1.1 0 00.05.02.1.1 0 00.05.01.14.14 0 00.06.01.14.14 0 00.06.01c.06.01.11.01.17.01h.34c.06 0 .11,0 .17-.01.06,0 .11-.01.17-.01.05,0 .1-.01.14-.02a.3.3 0 00.14-.04.3.3 0 00.14-.04.32.32 0 00.14-.06.32.32 0 00.14-.06.32.32 0 00.14-.06.32.32 0 00.14-.06c.05-.02.1-.05.14-.07.05-.02.1-.05.14-.07.05-.02.1-.05.14-.07l.14-.07c.05-.02.1-.05.14-.07.05-.02.1-.05.14-.07.05-.02.1-.05.14-.07.05-.02.1-.05.14-.07a.35.35 0 00.14-.09.35.35 0 00.14-.09c.04-.03.09-.06.13-.1.04-.03.09-.06.13-.1.04-.03.09-.06.13-.1.04-.03.09-.06.13-.1.04-.03.09-.06.13-.1.04-.03.09-.06.13-.1.04-.03.09-.06.13-.1s.09-.06.13-.1c.04-.03.09-.06.13-.1.04-.03.09-.06.13-.1.04-.03.09-.06.13-.1.02-.02.04-.03.06-.05.02-.02.04-.03.06-.05.02-.02.04-.03.06-.05.02-.02.04-.03.06-.05.02-.02.04-.03.06-.05.02-.02.04-.03.06-.05.02-.02.04-.03.06-.05.02-.02.04-.03.06-.05.02-.01.03-.03.05-.04a.29.29 0 00.05-.04.29.29 0 00.05-.04.29.29 0 00.05-.04.29.29 0 00.05-.04.28.28 0 00.05-.06.28.28 0 00.05-.06.28.28 0 00.05-.06c.01-.02.03-.04.04-.06a.28.28 0 00.04-.06c.01-.02.03-.04.04-.06a.28.28 0 00.04-.06.28.28 0 00.04-.06.28.28 0 00.04-.06.28.28 0 00.04-.06.28.28 0 00.04-.06.28.28 0 00.04-.06.28.28 0 00.04-.06.27.27 0 00.03-.08.27.27 0 00.03-.08.27.27 0 00.03-.08c.01-.02.02-.05.03-.08a.27.27 0 00.03-.08c.01-.02.02-.05.03-.08a.27.27 0 00.03-.08.27.27 0 00.03-.08.26.26 0 00.02-.1.26.26 0 00.02-.1.26.26 0 00.02-.1c0-.04.01-.07.02-.1a.26.26 0 00.02-.1.26.26 0 00.02-.1.26.26 0 00.02-.1.25.25 0 00.01-.13.25.25 0 00.01-.13.25.25 0 00.01-.13c0-.04.01-.09.01-.13a.25.25 0 00.01-.13V12a10.06 10.06 0 00-2.01-6.33A10.06 10.06 0 0012 2a10.06 10.06 0 00-6.33 2.01A10.06 10.06 0 002 12a10.06 10.06 0 002.01 6.33A10.06 10.06 0 0012 22Z" /></svg>
);
const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);


interface UmkmDetailProps {
  umkm: UMKM;
  onBack: () => void;
  onUpdateReviews: (review: Review) => Promise<void>;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const UmkmDetail: React.FC<UmkmDetailProps> = ({ umkm, onBack, onUpdateReviews, isFavorite, onToggleFavorite }) => {
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrolled, setScrolled] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [operatingStatus, setOperatingStatus] = useState({ text: '', color: '' });
  const shareMenuRef = useRef<HTMLDivElement>(null);
  const isTrending = umkm.rating >= 4.8;
  
  useEffect(() => {
    const calculateStatus = () => {
        const now = new Date();
        
        const parts = umkm.operatingHours.split(' - ');
        if (parts.length !== 2) {
          setOperatingStatus({ text: 'N/A', color: 'bg-gray-500/20 text-gray-400' });
          return;
        }

        const startParts = parts[0].split(':').map(Number);
        const endParts = parts[1].split(':').map(Number);

        if (startParts.length !== 2 || endParts.length !== 2 || startParts.some(isNaN) || endParts.some(isNaN)) {
            setOperatingStatus({ text: 'Format Waktu Salah', color: 'bg-gray-500/20 text-gray-400' });
            return;
        }

        const [startHour, startMinute] = startParts;
        const [endHour, endMinute] = endParts;

        const startTime = new Date();
        startTime.setHours(startHour, startMinute, 0, 0);

        const endTime = new Date();
        endTime.setHours(endHour, endMinute, 0, 0);

        if (endTime < startTime) {
          if (now < endTime) {
            startTime.setDate(startTime.getDate() - 1);
          } else {
            endTime.setDate(endTime.getDate() + 1);
          }
        }
        
        const closingSoonTime = new Date(endTime.getTime() - 60 * 60 * 1000);

        if (now >= startTime && now < closingSoonTime) {
          setOperatingStatus({ text: 'Buka', color: 'bg-green-500/20 text-green-400' });
        } else if (now >= closingSoonTime && now < endTime) {
          setOperatingStatus({ text: 'Segera Tutup', color: 'bg-yellow-500/20 text-yellow-400' });
        } else {
          setOperatingStatus({ text: 'Tutup', color: 'bg-red-500/20 text-red-400' });
        }
    };

    calculateStatus();
    const intervalId = setInterval(calculateStatus, 1000);

    return () => clearInterval(intervalId);
  }, [umkm.operatingHours]);


  const handleAddReview = (newReview: { author: string; rating: number; comment: string }) => {
    if (!umkm.id) return Promise.resolve();
    const reviewToAdd: Review = {
      ...newReview,
      id: `${new Date().getTime()}`,
      date: new Date().toISOString(),
    };
    
    return onUpdateReviews(reviewToAdd);
  };

  const handleShare = async () => {
    const shareData = {
      title: umkm.name,
      text: umkm.description,
      url: window.location.href,
    };
    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        console.error("Error sharing:", err);
      }
    } else {
      setIsShareMenuOpen(true);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
      setIsShareMenuOpen(false);
    }, 2000);
  };
  
  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  const nextImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => (prevIndex! + 1) % umkm.photos.length);
  };
  
  const prevImage = () => {
    if (lightboxIndex === null) return;
    setLightboxIndex((prevIndex) => (prevIndex! - 1 + umkm.photos.length) % umkm.photos.length);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
        if (lightboxIndex === null) return;
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'Escape') closeLightbox();
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (shareMenuRef.current && !shareMenuRef.current.contains(event.target as Node)) {
        setIsShareMenuOpen(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [lightboxIndex]);

  const mapSrc = `https://maps.google.com/maps?q=${umkm.location.lat},${umkm.location.lng}&hl=id&z=16&output=embed`;

  return (
    <>
    <motion.div
      className="bg-black min-h-screen text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <button
            onClick={onBack}
            className="group flex items-center gap-2 text-white/70 hover:text-white transition-all duration-300"
          >
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-all">
              <XIcon className="w-4 h-4" />
            </div>
            <span className="font-medium">Kembali</span>
          </button>
        </div>
      </div>

      <div className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={umkm.photos[selectedImage]}
            alt={umkm.name}
            className="w-full h-full object-cover scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-2">
          {umkm.photos.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedImage(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                idx === selectedImage ? 'bg-white w-12' : 'bg-white/30 w-8 hover:bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>

      <div className="relative -mt-20 z-10">
        <div className="max-w-5xl mx-auto px-6">
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 mb-8">
            <div className="flex items-center gap-3 mb-3">
              {isTrending && (
                <div className="flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-pink-500/20 rounded-full border border-orange-500/30">
                  <TrendingUpIcon className="w-3.5 h-3.5 text-orange-400" />
                  <span className="text-xs font-semibold text-orange-300">Trending</span>
                </div>
              )}
              <div className="px-3 py-1 bg-white/10 rounded-full border border-white/20">
                <span className="text-sm font-medium text-white/80">{umkm.category}</span>
              </div>
            </div>
            <h1 className="text-5xl font-bold text-white mb-3 leading-tight">
              {umkm.name}
            </h1>
            <div className="flex items-center gap-1.5">
              <StarIcon className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              <span className="text-xl font-bold text-white">{umkm.rating.toFixed(1)}</span>
              <span className="text-white/50">({umkm.reviews.length} reviews)</span>
            </div>
            <p className="text-lg text-white/70 leading-relaxed my-6">
              {umkm.description}
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="relative inline-block">
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white/80 hover:bg-white/20 transition-all duration-300"
                >
                  <ShareIcon className="w-4 h-4" />
                  <span>Bagikan</span>
                </button>
                <AnimatePresence>
                  {isShareMenuOpen && (
                    <motion.div
                      ref={shareMenuRef}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: 'easeOut' }}
                      className="absolute top-full left-0 mt-2 w-48 bg-white/10 backdrop-blur-xl border border-white/20 rounded-xl shadow-lg z-20 overflow-hidden"
                    >
                      <a
                        href={`https://api.whatsapp.com/send?text=${encodeURIComponent(umkm.name + ' - ' + window.location.href)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-white/80 hover:bg-white/20"
                      >
                        <WhatsAppIcon className="w-5 h-5 text-green-400" />
                        <span>WhatsApp</span>
                      </a>
                      <a
                        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent('Kunjungi ' + umkm.name + ':')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-4 py-2 text-sm text-white/80 hover:bg-white/20"
                      >
                        <TwitterIcon className="w-5 h-5 text-sky-400" />
                        <span>Twitter</span>
                      </a>
                      <button
                        onClick={handleCopyLink}
                        className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white/80 hover:bg-white/20 disabled:opacity-50"
                        disabled={copied}
                      >
                        {copied ? <CheckIcon className="w-5 h-5 text-green-400" /> : <LinkIcon className="w-5 h-5" />}
                        <span>{copied ? 'Tautan Disalin!' : 'Salin Tautan'}</span>
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
              <button
                onClick={onToggleFavorite}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300 ${
                    isFavorite
                        ? 'bg-pink-500/20 border border-pink-500/30 text-pink-300 hover:bg-pink-500/30'
                        : 'bg-white/10 border border-white/20 text-white/80 hover:bg-white/20'
                }`}
              >
                  <HeartIcon className={`w-4 h-4 transition-all duration-300 ${isFavorite ? 'fill-current' : ''}`} />
                  <span>{isFavorite ? 'Disimpan di Favorit' : 'Simpan ke Favorit'}</span>
              </button>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="group p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center border border-orange-500/30">
                    <MapPinIcon className="w-5 h-5 text-orange-400" />
                  </div>
                  <span className="text-sm font-semibold text-white/50 uppercase tracking-wider">Lokasi</span>
                </div>
                <p className="text-white leading-relaxed">{umkm.address}</p>
              </div>
              <div className="group p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center border border-blue-500/30">
                    <PhoneIcon className="w-5 h-5 text-blue-400" />
                  </div>
                  <span className="text-sm font-semibold text-white/50 uppercase tracking-wider">Telepon</span>
                </div>
                <p className="text-white">{umkm.contact.phone}</p>
              </div>
              {umkm.priceRange && (
                <div className="group p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500/20 to-teal-500/20 flex items-center justify-center border border-green-500/30">
                      <PriceTagIcon className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-sm font-semibold text-white/50 uppercase tracking-wider">Rentang Harga</span>
                  </div>
                  <p className="text-white text-xl font-bold">
                    {`${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(umkm.priceRange.min)} - ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(umkm.priceRange.max)}`}
                  </p>
                </div>
              )}
              <div className="group p-5 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-300">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center border border-purple-500/30">
                    <ClockIcon className="w-5 h-5 text-purple-400" />
                  </div>
                  <span className="text-sm font-semibold text-white/50 uppercase tracking-wider">Jam Buka</span>
                </div>
                <p className="text-white text-2xl font-bold">{umkm.operatingHours}</p>
                {operatingStatus.text && (
                  <div className={`mt-2 inline-block px-3 py-1 text-sm font-semibold rounded-full ${operatingStatus.color}`}>
                    {operatingStatus.text}
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {umkm.photos.length > 0 && (
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-500/20 to-cyan-500/20 flex items-center justify-center border border-green-500/30">
                  <CameraIcon className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Galeri Foto</h2>
              </div>
              <div className="relative">
                <div className="flex overflow-x-auto space-x-4 pb-4 horizontal-gallery">
                  {umkm.photos.map((photo, index) => (
                    <motion.div
                      key={index}
                      className="relative flex-shrink-0 w-64 h-48 overflow-hidden rounded-lg cursor-pointer group"
                      onClick={() => openLightbox(index)}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.2 }}
                    >
                      <img src={photo} alt={`${umkm.name} gallery ${index + 1}`} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy"/>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          )}

          <Reviews reviews={umkm.reviews} onSubmit={handleAddReview} />
          
          <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-pink-500/20 flex items-center justify-center border border-orange-500/30">
                <MapPinIcon className="w-6 h-6 text-orange-400" />
              </div>
              <h2 className="text-3xl font-bold text-white">Peta Lokasi</h2>
            </div>
            <div className="rounded-2xl overflow-hidden border border-white/10">
              <iframe
                src={mapSrc}
                width="100%"
                height="450"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[80%] invert-[100%]"
                title={`Peta Lokasi ${umkm.name}`}
              ></iframe>
            </div>
          </div>
        </div>
        <div className="h-20" />
      </div>
    </motion.div>
    
    <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
              className="relative"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={umkm.photos[lightboxIndex]}
                alt={`Lightbox ${umkm.name} ${lightboxIndex + 1}`}
                className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            <button onClick={closeLightbox} className="absolute top-4 right-4 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
                <XIcon className="w-6 h-6"/>
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); prevImage(); }} 
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
                <ChevronLeftIcon className="w-8 h-8"/>
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); nextImage(); }} 
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 p-2 rounded-full hover:bg-white/20 transition-all">
                <ChevronRightIcon className="w-8 h-8"/>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default UmkmDetail;