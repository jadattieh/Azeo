import React, { useState, useEffect } from "react";
import { Star, MessageSquare, Send, Sparkles, User, ShieldCheck } from "lucide-react";

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  avatar?: string;
  createdAt: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  
  // Form states
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchReviews = async () => {
    try {
      const response = await fetch("/api/reviews");
      if (response.ok) {
        const data = await response.json();
        setReviews(data);
      }
    } catch (err) {
      console.error("Failed to fetch reviews:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) {
      setFormError("Please fill out both your name and your review.");
      return;
    }

    setSubmitting(true);
    setFormError("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (response.ok) {
        setName("");
        setComment("");
        setRating(5);
        setFormSuccess(true);
        setShowForm(false); // Collapses the form upon successful submission!
        // Refresh reviews list
        await fetchReviews();
        setTimeout(() => setFormSuccess(false), 5000);
      } else {
        const errData = await response.json();
        setFormError(errData.error || "Failed to submit your review. Please try again.");
      }
    } catch (err) {
      console.error("Error submitting review:", err);
      setFormError("A network error occurred. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="bg-[#111c15] text-linen-cream py-24 relative overflow-hidden">
      {/* Decorative luxury backgrounds */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-champagne-gold/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-champagne-gold/5 rounded-full blur-3xl" />

      <div className="max-w-6xl mx-auto px-4 md:px-10 relative z-10">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 border border-champagne-gold/30 bg-champagne-gold/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.25em] text-champagne-gold uppercase mb-4">
            <Sparkles className="w-3.5 h-3.5 fill-champagne-gold" />
            Guestbook & Reviews
          </div>
          <h2 className="font-serif text-3xl md:text-5xl text-linen-cream font-bold mb-4 tracking-wide leading-tight">
            WHAT OUR GUESTS SAY
          </h2>
          <p className="text-sm md:text-base text-zinc-400 font-sans leading-relaxed">
            Real feedback from our distinguished events across Lebanon, from high-profile corporate galas to romantic vineyard weddings.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left Column: Review Form or CTA Trigger */}
          <div className="lg:col-span-5 h-full">
            {!showForm ? (
              <div className="bg-black/40 border border-champagne-gold/20 rounded-3xl p-8 backdrop-blur-md shadow-xl text-center flex flex-col items-center justify-center min-h-[350px] space-y-6 group hover:border-champagne-gold/45 transition-colors duration-300">
                <div className="w-16 h-16 rounded-full bg-champagne-gold/10 border border-champagne-gold/30 flex items-center justify-center text-champagne-gold">
                  <MessageSquare className="w-8 h-8 fill-champagne-gold/10" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-serif text-2xl text-linen-cream font-bold group-hover:text-champagne-gold transition-colors duration-300">
                    Shared an Event with Us?
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed max-w-sm mx-auto">
                    We invite you to write a notes about your culinary experience. Your feedback inspires our hospitality daily.
                  </p>
                </div>
                
                {formSuccess && (
                  <div className="text-xs bg-emerald-950/40 border border-emerald-555/30 text-emerald-300 rounded-xl p-3 text-center flex flex-col items-center gap-1 w-full scale-95 transition-transform duration-300">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Your review was published successfully!</span>
                  </div>
                )}

                <button
                  onClick={() => setShowForm(true)}
                  className="bg-champagne-gold text-primary font-bold text-xs uppercase tracking-widest py-4 px-8 rounded-full hover:bg-white hover:text-primary transition-all duration-300 shadow-xl flex items-center gap-2 cursor-pointer active:scale-95"
                >
                  <Sparkles className="w-4 h-4 fill-primary/20" />
                  Write a Guest Review
                </button>
              </div>
            ) : (
              <div className="bg-black/40 border border-champagne-gold/30 rounded-3xl p-6 md:p-8 backdrop-blur-md shadow-xl relative animate-fade-in">
                <button 
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="absolute top-4 right-4 text-zinc-400 hover:text-champagne-gold text-xs font-bold uppercase tracking-wider font-sans flex items-center gap-1 cursor-pointer transition-colors"
                >
                  ✕ Close
                </button>
                <h3 className="font-serif text-xl md:text-2xl text-champagne-gold font-semibold mb-2 flex items-center gap-2 pt-2">
                  <MessageSquare className="w-5 h-5 text-champagne-gold fill-champagne-gold/10" />
                  Share Your Experience
                </h3>
                <p className="text-xs text-zinc-400 mb-6 font-sans">
                  Help us continue to refine our Lebanese culinary Excellence. Your review will be published instantly for all visitors.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-champagne-gold/80 mb-2">
                      Your Full Name
                    </label>
                    <input 
                      type="text"
                      placeholder="e.g. Salim El Khoury"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-zinc-900/60 border border-champagne-gold/20 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-champagne-gold text-white placeholder-zinc-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-champagne-gold/80 mb-2">
                      Overall Rating
                    </label>
                    <div className="flex items-center gap-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          onClick={() => setRating(star)}
                          disabled={submitting}
                          className="p-1 hover:scale-110 transition-transform"
                        >
                          <Star 
                            className={`w-7 h-7 transition-colors ${
                              star <= rating 
                                ? "text-champagne-gold fill-champagne-gold" 
                                : "text-zinc-650"
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-semibold text-champagne-gold italic ml-2">
                        {rating === 5 ? "Exceptional" : rating === 4 ? "Very Good" : rating === 3 ? "Good" : rating === 2 ? "Fair" : "Poor"}
                      </span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-widest font-semibold text-champagne-gold/80 mb-2">
                      Your Thoughts
                    </label>
                    <textarea 
                      rows={4}
                      placeholder="Describe the menu design, specific dishes, elegance of plating, service quality..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      disabled={submitting}
                      className="w-full bg-zinc-900/60 border border-champagne-gold/20 rounded-xl p-4 text-sm focus:outline-none focus:border-champagne-gold text-white placeholder-zinc-600 transition-colors resize-none font-sans"
                    />
                  </div>

                  {formError && (
                    <div className="text-xs bg-red-950/40 border border-red-500/30 text-rose-300 rounded-xl p-3 text-center font-sans">
                      {formError}
                    </div>
                  )}

                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => setShowForm(false)}
                      className="flex-1 border border-zinc-700 text-zinc-350 text-xs font-semibold uppercase tracking-widest py-3 px-4 rounded-xl hover:bg-zinc-900 transition-colors cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="flex-[2] bg-champagne-gold text-primary font-bold text-xs uppercase tracking-widest py-3 px-6 rounded-xl hover:bg-white hover:text-primary transition-all duration-300 shadow-lg flex items-center justify-center gap-2 cursor-pointer disabled:opacity-55 disabled:cursor-not-allowed"
                    >
                      {submitting ? (
                        <span>Submitting...</span>
                      ) : (
                        <>
                          <Send className="w-4 h-4 shrink-0" />
                          Submit Review
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>

          {/* Right Column: Dynamic Reviews Feed */}
          <div className="lg:col-span-7 space-y-6">
            {loading ? (
              <div className="py-20 flex flex-col items-center justify-center gap-3">
                <div className="w-8 h-8 rounded-full border-2 border-champagne-gold border-t-transparent animate-spin" />
                <p className="text-xs text-zinc-405 italic tracking-wider">Retrieving Azeo Culinary Logs...</p>
              </div>
            ) : reviews.length === 0 ? (
              <div className="text-center py-20 bg-black/10 border border-dashed border-zinc-700/50 rounded-3xl p-8">
                <MessageSquare className="w-12 h-12 text-zinc-650 mx-auto mb-4 scale-75" />
                <h4 className="text-sm font-semibold text-zinc-400 mb-1 font-serif">No reviews yet</h4>
                <p className="text-xs text-zinc-500">Be the first to share your festive experience with us.</p>
              </div>
            ) : (
              <div className="space-y-6 max-h-[580px] overflow-y-auto pr-2 custom-scrollbar">
                {reviews.map((review) => (
                  <div 
                    key={review.id}
                    className="p-6 bg-zinc-950/40 border border-zinc-800/60 rounded-2xl hover:border-champagne-gold/30 transition-all duration-300 flex flex-col md:flex-row gap-4 items-start"
                  >
                    {/* Guest image/fallback placeholder */}
                    <div className="w-12 h-12 rounded-full overflow-hidden bg-primary-container border border-champagne-gold/30 shrink-0 flex items-center justify-center shadow-md bg-zinc-900">
                      {review.avatar ? (
                        <img 
                          alt={review.name}
                          className="w-full h-full object-cover scale-102"
                          src={review.avatar}
                          referrerPolicy="no-referrer"
                        />
                      ) : (
                        <span className="text-xs font-bold text-champagne-gold uppercase tracking-widest font-sans">
                          {review.name.slice(0, 2)}
                        </span>
                      )}
                    </div>

                    <div className="flex-1 space-y-2">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-1.5">
                        <h4 className="font-serif text-base text-linen-cream font-bold tracking-wide">
                          {review.name}
                        </h4>
                        <span className="text-[10px] text-zinc-500 tracking-wider font-sans uppercase">
                          {review.createdAt}
                        </span>
                      </div>

                      {/* Stars */}
                      <div className="flex items-center gap-0.5">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star 
                            key={index}
                            className={`w-3.5 h-3.5 ${
                              index < review.rating 
                                ? "text-champagne-gold fill-champagne-gold" 
                                : "text-zinc-700 fill-zinc-800"
                            }`}
                          />
                        ))}
                      </div>

                      <p className="text-xs md:text-sm text-zinc-300 leading-relaxed font-sans italic">
                        "{review.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
