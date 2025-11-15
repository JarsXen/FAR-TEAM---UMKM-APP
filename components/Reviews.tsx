import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Review } from '../types';

// Icons
const MessageSquareIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
);
const StarIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
);
const SendIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
);
const LoaderIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-spin" {...props}>
        <line x1="12" y1="2" x2="12" y2="6"></line><line x1="12" y1="18" x2="12" y2="22"></line>
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line><line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
        <line x1="2" y1="12" x2="6" y2="12"></line><line x1="18" y1="12" x2="22" y2="12"></line>
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line><line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
    </svg>
);
const CheckIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><polyline points="20 6 9 17 4 12"></polyline></svg>
);

interface ReviewsProps {
  reviews: Review[];
  onSubmit: (newReview: { author: string; rating: number; comment: string }) => Promise<void>;
}

const Reviews: React.FC<ReviewsProps> = ({ reviews, onSubmit }) => {
  const [author, setAuthor] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (author && rating > 0 && comment && !isSubmitting) {
      setIsSubmitting(true);
      try {
        await onSubmit({ author, rating, comment });
        setAuthor('');
        setRating(0);
        setComment('');
        setShowSuccessToast(true);
        setTimeout(() => {
          setShowSuccessToast(false);
        }, 3000);
      } catch (error) {
        console.error("Gagal mengirim ulasan:", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <>
      <AnimatePresence>
        {showSuccessToast && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 20, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className="fixed top-24 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-green-500/80 to-teal-500/80 backdrop-blur-md border border-white/20 rounded-2xl shadow-lg"
          >
            <CheckIcon className="w-5 h-5 text-white" />
            <span className="font-semibold text-white">Ulasan Anda berhasil dikirim!</span>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 p-8 mb-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 flex items-center justify-center border border-purple-500/30">
            <MessageSquareIcon className="w-6 h-6 text-purple-400" />
          </div>
          <h2 className="text-3xl font-bold text-white">Ulasan Pengguna</h2>
        </div>
        
        {/* Review Form */}
        <div className="bg-white/5 p-6 rounded-2xl border border-white/10 mb-8">
          <h3 className="text-xl font-semibold text-white mb-4">Tinggalkan Ulasan Anda</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Nama Anda"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                className="w-full sm:w-1/3 bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition"
                required
              />
              <div className="flex items-center gap-2">
                <span className="text-white/60">Rating:</span>
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <StarIcon
                      key={star}
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className={`w-6 h-6 cursor-pointer transition-colors ${
                        (hoverRating || rating) >= star
                          ? 'text-yellow-400 fill-yellow-400'
                          : 'text-white/30 fill-transparent'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
            <textarea
              placeholder="Tulis ulasan Anda di sini..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500 transition h-24 resize-none"
              required
            />
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/20 hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!author || rating === 0 || !comment || isSubmitting}
            >
              {isSubmitting ? <LoaderIcon className="w-4 h-4" /> : <SendIcon className="w-4 h-4" />}
              <span>{isSubmitting ? 'Mengirim...' : 'Kirim Ulasan'}</span>
            </button>
          </form>
        </div>

        {/* Reviews List */}
        <div className="space-y-6">
          <AnimatePresence initial={false}>
            {reviews.map((review) => (
              <motion.div
                key={review.id}
                layout
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.95 }}
                transition={{ duration: 0.4, ease: 'easeOut' }}
                className="p-5 bg-white/5 rounded-2xl border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-bold text-white text-lg">{review.author}</h4>
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon
                        key={i}
                        className={`w-4 h-4 ${
                          i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-white/30 fill-transparent'
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-white/70 leading-relaxed mb-2">{review.comment}</p>
                <p className="text-xs text-white/40">{new Date(review.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
              </motion.div>
            ))}
          </AnimatePresence>
          {reviews.length === 0 && (
              <div className="text-center py-8 text-white/50">
                  <p>Belum ada ulasan. Jadilah yang pertama!</p>
              </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Reviews;
