import React from 'react';
import { UMKM } from '../types';

const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const TrendingUpIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
    <polyline points="17 6 23 6 23 12" />
  </svg>
);

const MapPinIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
    </svg>
);

const ChevronRightIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <polyline points="9 18 15 12 9 6" />
    </svg>
);

const HeartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
);


interface UmkmCardProps {
  umkm: UMKM;
  onSelect: (umkm: UMKM) => void;
  index: number;
  isFavorite: boolean;
  onToggleFavorite: () => void;
}

const UmkmCard: React.FC<UmkmCardProps> = ({ umkm, onSelect, index, isFavorite, onToggleFavorite }) => {
  const isTrending = umkm.rating >= 4.8;

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleFavorite();
  };

  return (
    <div
      onClick={() => onSelect(umkm)}
      className="group relative cursor-pointer animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500" />
      <div className="relative bg-white/5 backdrop-blur-xl rounded-3xl border border-white/10 overflow-hidden group-hover:border-white/30 group-hover:translate-y-[-4px] transition-all duration-300">
        {/* Image */}
        <div className="relative h-56 overflow-hidden">
          <img
            src={umkm.photos[0]}
            alt={umkm.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          
          {/* Badges */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            {isTrending && (
              <div className="px-3 py-1.5 bg-gradient-to-r from-orange-500/90 to-pink-500/90 backdrop-blur-sm rounded-full border border-white/20 flex items-center gap-1.5">
                <TrendingUpIcon className="w-3.5 h-3.5 text-white" />
                <span className="text-xs font-bold text-white">Trending</span>
              </div>
            )}
            <button
                onClick={handleFavoriteClick}
                aria-label={isFavorite ? "Hapus dari favorit" : "Simpan ke favorit"}
                className="w-10 h-10 z-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm border border-white/20 bg-black/40 hover:bg-black/60"
            >
                <HeartIcon
                    className={`w-5 h-5 transition-all duration-300 ${
                        isFavorite ? 'text-pink-500 fill-pink-500' : 'text-white'
                    }`}
                />
            </button>
          </div>

          {/* Category */}
          <div className="absolute bottom-4 left-4">
            <div className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full border border-white/30">
              <span className="text-xs font-semibold text-white">{umkm.category}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <StarIcon className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span className="text-white font-bold">{umkm.rating.toFixed(1)}</span>
            <span className="text-white/40 text-sm">({umkm.reviews.length} reviews)</span>
          </div>
          
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-orange-400 transition-colors truncate">
            {umkm.name}
          </h3>
          
          <p className="text-white/60 text-sm mb-4 line-clamp-2 leading-relaxed h-10">
            {umkm.description}
          </p>
          
          {umkm.priceRange && (
            <div className="mb-4">
              <span className="text-white/60 text-sm">Rentang Harga</span>
              <p className="font-bold text-lg text-white">
                {`${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(umkm.priceRange.min)} - ${new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(umkm.priceRange.max)}`}
              </p>
            </div>
          )}

          <div className="flex items-start gap-2 text-white/50 text-sm">
            <MapPinIcon className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{umkm.address}</span>
          </div>

          {/* Hover Arrow */}
          <div className="flex items-center gap-2 mt-4 text-orange-400 opacity-0 group-hover:opacity-100 transition-all duration-300 h-5">
            <span className="text-sm font-semibold">Lihat Detail</span>
            <ChevronRightIcon className="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default UmkmCard;