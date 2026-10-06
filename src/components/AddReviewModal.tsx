import React, { useState } from 'react';
import { Place, ReviewItem } from '../types';
import { X, Star, ThumbsUp, AlertTriangle, Send, Check } from 'lucide-react';

interface AddReviewModalProps {
  place: Place;
  isOpen: boolean;
  onClose: () => void;
  onSubmitReview: (placeId: string, review: ReviewItem) => void;
}

export const AddReviewModal: React.FC<AddReviewModalProps> = ({
  place,
  isOpen,
  onClose,
  onSubmitReview
}) => {
  const [author, setAuthor] = useState('');
  const [branch, setBranch] = useState('CSE');
  const [year, setYear] = useState('1st Year (Fresher)');
  const [rating, setRating] = useState(4);
  const [reviewType, setReviewType] = useState<'positive' | 'critical' | 'mixed'>('positive');
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [tagsInput, setTagsInput] = useState('Must Try, Budget Friendly');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!author.trim() || !comment.trim()) return;

    const newRev: ReviewItem = {
      id: `rev-custom-${Date.now()}`,
      author: author.trim(),
      branch,
      year,
      rating,
      type: reviewType,
      title: title.trim() || (reviewType === 'positive' ? 'Honest Recommendation' : 'Honest Warning'),
      comment: comment.trim(),
      date: 'Just now',
      verifiedStudent: true,
      likes: 1,
      tags: tagsInput.split(',').map((t) => t.trim()).filter(Boolean)
    };

    onSubmitReview(place.id, newRev);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div>
            <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
              Write Honest Review: {place.name}
            </h3>
            <p className="text-xs text-slate-500">
              Share your genuine feedback — good or bad — to guide new batchmates.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="py-16 text-center p-6 space-y-2">
            <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center mx-auto">
              <Check className="w-7 h-7" />
            </div>
            <h4 className="font-extrabold text-base text-slate-900 dark:text-white">
              Review Added Successfully!
            </h4>
            <p className="text-xs text-slate-500 max-w-xs mx-auto">
              Your honest perspective is now live for all freshers exploring {place.city}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="overflow-y-auto p-4 sm:p-5 space-y-4 flex-1">
            {/* Review Sentiment Toggle */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                Review Type (Good or Bad Experience?)
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setReviewType('positive');
                    if (rating < 4) setRating(4);
                  }}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    reviewType === 'positive'
                      ? 'bg-emerald-50 dark:bg-emerald-950/70 border-emerald-500 text-emerald-700 dark:text-emerald-300 ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>Good / Pro Tip</span>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setReviewType('critical');
                    if (rating > 2) setRating(2);
                  }}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    reviewType === 'critical'
                      ? 'bg-rose-50 dark:bg-rose-950/70 border-rose-500 text-rose-700 dark:text-rose-300 ring-2 ring-rose-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Bad / Warning</span>
                </button>
                <button
                  type="button"
                  onClick={() => setReviewType('mixed')}
                  className={`p-2.5 rounded-2xl border text-xs font-bold flex items-center justify-center gap-1.5 transition-all ${
                    reviewType === 'mixed'
                      ? 'bg-amber-50 dark:bg-amber-950/70 border-amber-500 text-amber-700 dark:text-amber-300 ring-2 ring-amber-500/20'
                      : 'border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  <span>Mixed / Neutral</span>
                </button>
              </div>
            </div>

            {/* Star Rating */}
            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">
                Your Rating: {rating} / 5 Stars
              </label>
              <div className="flex items-center gap-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    className="p-1 text-slate-300 hover:text-amber-400 transition-colors"
                  >
                    <Star
                      className={`w-6 h-6 ${
                        star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-700'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Student Info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Your Name / Alias *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Rahul V."
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Branch
                </label>
                <input
                  type="text"
                  placeholder="CSE, ECE, Mech..."
                  value={branch}
                  onChange={(e) => setBranch(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                  Year
                </label>
                <select
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
                >
                  <option value="1st Year (Fresher)">1st Year (Fresher)</option>
                  <option value="2nd Year">2nd Year</option>
                  <option value="3rd Year">3rd Year</option>
                  <option value="Final Year Senior">Final Year Senior</option>
                  <option value="Alumnus">Alumnus</option>
                </select>
              </div>
            </div>

            {/* Headline */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Headline / One-Liner Summary
              </label>
              <input
                type="text"
                placeholder={
                  reviewType === 'positive'
                    ? 'e.g. Best ginger tea & quick samosas near gate'
                    : 'e.g. Ridiculous queue and rude billing staff on exam morning'
                }
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Detailed Honest Review */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Detailed Experience (Good, Bad, or Brutal Truth) *
              </label>
              <textarea
                required
                rows={3}
                placeholder={
                  reviewType === 'critical'
                    ? 'What went wrong? Price rip-off, long waiting time, bad hygiene, strict security, or overhyped food?'
                    : 'What makes this spot awesome for freshers? Secret hacks, best timing, pricing, or must-try items?'
                }
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Tags */}
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                placeholder="Overcrowded, Must Try, Budget Friendly, Scam Alert..."
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-slate-900 dark:text-slate-100"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                className={`w-full py-3 px-4 rounded-2xl font-bold text-xs sm:text-sm text-white flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 ${
                  reviewType === 'critical'
                    ? 'bg-rose-600 hover:bg-rose-700 shadow-rose-600/30'
                    : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/30'
                }`}
              >
                <Send className="w-4 h-4" />
                <span>
                  Publish {reviewType === 'critical' ? 'Warning / Critical' : 'Honest'} Review
                </span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
