import React, { useState } from 'react';
import { REVIEWS_DATA } from '../data/cafeData';
import { Review } from '../types';
import { Star, MessageSquarePlus, CheckCircle, X, ThumbsUp, Heart } from 'lucide-react';

export const ReviewsSection: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>(REVIEWS_DATA);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [newAuthor, setNewAuthor] = useState('');
  const [newTitle, setNewTitle] = useState('');
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(5);
  const [newFavorite, setNewFavorite] = useState('');
  const [submittedMessage, setSubmittedMessage] = useState(false);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAuthor.trim() || !newComment.trim()) return;

    const newRev: Review = {
      id: `r-${Date.now()}`,
      author: newAuthor.trim(),
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80',
      location: 'Verified Guest',
      rating: newRating,
      date: 'Just now',
      title: newTitle.trim() || 'Wonderful Experience!',
      comment: newComment.trim(),
      favoriteItem: newFavorite.trim() || 'Himalayan Masala Chiya',
      verified: true,
    };

    setReviews([newRev, ...reviews]);
    setSubmittedMessage(true);
    setTimeout(() => {
      setSubmittedMessage(false);
      setShowReviewModal(false);
      setNewAuthor('');
      setNewTitle('');
      setNewComment('');
      setNewFavorite('');
    }, 1500);
  };

  return (
    <section id="reviews" className="py-20 md:py-28 px-4 md:px-12 bg-[#fcf9f8] relative">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs md:text-sm font-bold tracking-widest text-[#c86d3b] uppercase font-sans">
              Guest Testimonials
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#271310] mt-2 mb-3 tracking-tight">
              Stories from Our Community
            </h2>
            <p className="text-sm md:text-base text-[#504442]">
              Over 5,000+ patrons make Chiya Hub their daily sanctuary for warmth, conversation, and exceptional brews.
            </p>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <button
              onClick={() => setShowReviewModal(true)}
              className="bg-[#271310] hover:bg-[#3e2723] text-white font-sans text-xs md:text-sm font-semibold px-5 py-3 rounded-xl flex items-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <MessageSquarePlus className="w-4 h-4 text-[#ae8d87]" />
              <span>Share Your Story</span>
            </button>
          </div>
        </div>

        {/* Reviews Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {reviews.map((rev) => (
            <div
              key={rev.id}
              className="bg-[#f6f3f2] p-6 sm:p-7 rounded-2xl border border-[#e5e2e1] shadow-[0_4px_16px_rgba(39,19,16,0.04)] flex flex-col justify-between hover:shadow-[0_12px_24px_rgba(39,19,16,0.08)] transition-all"
            >
              <div>
                {/* Header Rating & Date */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < rev.rating
                            ? 'text-amber-500 fill-amber-500'
                            : 'text-[#d3c3c0]'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-xs font-bold text-[#271310]">
                      {rev.rating}.0
                    </span>
                  </div>
                  <span className="text-xs text-[#827472]">{rev.date}</span>
                </div>

                <h3 className="font-serif text-base sm:text-lg font-bold text-[#271310] mb-2">
                  "{rev.title}"
                </h3>

                <p className="text-xs sm:text-sm text-[#504442] leading-relaxed mb-6 italic">
                  "{rev.comment}"
                </p>
              </div>

              {/* Author & Favorite Tag */}
              <div className="pt-4 border-t border-[#e5e2e1] flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3">
                  <img
                    src={rev.avatar}
                    alt={rev.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#ae8d87]"
                  />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-[#271310]">
                        {rev.author}
                      </span>
                      {rev.verified && (
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600" title="Verified Customer" />
                      )}
                    </div>
                    <span className="text-[11px] text-[#827472]">{rev.location}</span>
                  </div>
                </div>

                {rev.favoriteItem && (
                  <div className="text-[11px] bg-[#eadecc] text-[#271310] font-medium px-2.5 py-1 rounded-full">
                    Favorite: {rev.favoriteItem}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#fcf9f8] w-full max-w-lg rounded-2xl shadow-2xl border border-[#e5e2e1] p-6 sm:p-8 relative">
            <button
              onClick={() => setShowReviewModal(false)}
              className="absolute top-5 right-5 text-[#827472] hover:text-[#271310] cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <h3 className="font-serif text-2xl font-bold text-[#271310] mb-2">
              Share Your Chiya Hub Experience
            </h3>
            <p className="text-xs text-[#504442] mb-6">
              Your honest feedback helps us nurture our cozy neighborhood sanctuary.
            </p>

            {submittedMessage ? (
              <div className="py-12 text-center text-emerald-700">
                <CheckCircle className="w-12 h-12 mx-auto mb-3" />
                <h4 className="font-serif text-xl font-bold">Thank You!</h4>
                <p className="text-xs">Your review has been published to our community board.</p>
              </div>
            ) : (
              <form onSubmit={handleAddReview} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                    Your Rating
                  </label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        type="button"
                        key={star}
                        onClick={() => setNewRating(star)}
                        className="p-1 cursor-pointer focus:outline-none"
                      >
                        <Star
                          className={`w-6 h-6 ${
                            star <= newRating
                              ? 'text-amber-500 fill-amber-500'
                              : 'text-[#d3c3c0]'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Samira Khan"
                      value={newAuthor}
                      onChange={(e) => setNewAuthor(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                      Favorite Item
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Matka Chiya & Momos"
                      value={newFavorite}
                      onChange={(e) => setNewFavorite(e.target.value)}
                      className="w-full text-xs p-2.5 rounded-lg border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                    Review Headline
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Heavenly aroma and super cozy seats"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[#271310] mb-1">
                    Your Review & Experience *
                  </label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Tell us what you loved about your visit..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    className="w-full text-xs p-2.5 rounded-lg border border-[#d3c3c0] bg-white focus:outline-none focus:border-[#c86d3b]"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full bg-[#271310] hover:bg-[#3e2723] text-white py-3 rounded-xl font-sans font-bold text-xs md:text-sm tracking-wide shadow transition-colors cursor-pointer"
                  >
                    Submit Review
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </section>
  );
};
