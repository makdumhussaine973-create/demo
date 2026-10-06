import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Place, College, ReviewItem } from '../types';
import { getTravelEstimate } from '../utils/distance';
import {
  X,
  Star,
  Navigation,
  Heart,
  Share2,
  Clock,
  MapPin,
  Check,
  Quote,
  Sparkles,
  ExternalLink,
  ThumbsUp,
  AlertTriangle,
  MessageSquarePlus,
  Activity,
  CheckCircle2,
  XCircle,
  ShieldAlert
} from 'lucide-react';
import { AddReviewModal } from './AddReviewModal';

interface BottomSheetProps {
  place: Place | null;
  college: College;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (placeId: string) => void;
  onSubmitReview: (placeId: string, review: ReviewItem) => void;
}

export const BottomSheet: React.FC<BottomSheetProps> = ({
  place,
  college,
  onClose,
  isFavorite,
  onToggleFavorite,
  onSubmitReview
}) => {
  const [copied, setCopied] = useState(false);
  const [activeTab, setActiveTab] = useState<'overview' | 'reviews'>('overview');
  const [reviewFilter, setReviewFilter] = useState<'all' | 'positive' | 'critical'>('all');
  const [isAddReviewOpen, setIsAddReviewOpen] = useState(false);

  if (!place) return null;

  const travel = getTravelEstimate(place.distance_km);

  const handleGetDirections = () => {
    const [lat, lng] = place.coordinates;
    const url = `https://www.google.com/maps/dir/?api=1&origin=${college.coordinates[0]},${college.coordinates[1]}&destination=${lat},${lng}&travelmode=driving`;
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handleShare = () => {
    const text = `Check out "${place.name}" in ${place.city} on FresherCompass! Senior Tip: "${place.senior_review}" — ${place.distance_km}km from ${college.shortName}`;
    if (navigator.share) {
      navigator.share({
        title: `${place.name} - FresherCompass`,
        text: text,
        url: window.location.href
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const filteredReviews = place.reviews.filter((rev) => {
    if (reviewFilter === 'all') return true;
    return rev.type === reviewFilter;
  });

  const positiveCount = place.reviews.filter((r) => r.type === 'positive').length;
  const criticalCount = place.reviews.filter((r) => r.type === 'critical').length;

  return (
    <>
      <AnimatePresence>
        <div className="fixed inset-0 z-50 pointer-events-none flex justify-center items-end sm:items-center p-0 sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm pointer-events-auto"
          />

          {/* Drawer Sheet */}
          <motion.div
            initial={{ y: '100%', opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
            className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 max-h-[88vh] flex flex-col overflow-hidden pointer-events-auto z-10"
          >
            {/* Top Drag Handle (Mobile) */}
            <div className="w-full flex justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing sm:hidden">
              <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full" />
            </div>

            {/* Close Button Floating */}
            <button
              onClick={onClose}
              className="absolute top-3.5 right-3.5 z-20 w-9 h-9 rounded-full bg-slate-900/75 text-white hover:bg-slate-900 flex items-center justify-center backdrop-blur-md transition-all active:scale-95 shadow"
              aria-label="Close details"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable Content Container */}
            <div className="overflow-y-auto no-scrollbar flex-1 pb-4">
              {/* Cover Image Banner */}
              <div className="relative w-full h-48 sm:h-52 overflow-hidden bg-slate-200 dark:bg-slate-800">
                <img
                  src={place.image_url}
                  alt={place.name}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent" />

                {/* Badges on top of cover */}
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-indigo-600 text-white shadow-md">
                      {place.category}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-white/90 dark:bg-slate-900/90 text-slate-800 dark:text-slate-100 backdrop-blur-md">
                      {place.city}
                    </span>
                    <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-slate-900/80 text-white">
                      {place.price_tier}
                    </span>
                  </div>

                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-400 text-slate-950 font-bold text-xs shadow-md">
                    <Star className="w-3.5 h-3.5 fill-current" />
                    <span>{place.rating.toFixed(1)}</span>
                    <span className="text-[10px] opacity-75">({place.review_count})</span>
                  </div>
                </div>
              </div>

              {/* Title & Address Header */}
              <div className="p-4 sm:p-5 space-y-3 pb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                      {place.tag}
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white tracking-tight leading-tight">
                    {place.name}
                  </h2>
                  <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500 dark:text-slate-400">
                    <MapPin className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                    <span className="truncate">{place.address}</span>
                  </div>
                </div>

                {/* Distance & Travel Badge */}
                <div className="flex flex-wrap items-center gap-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200 text-xs font-semibold">
                    <span className="text-sm">{travel.icon}</span>
                    <span className="font-extrabold">{place.distance_km} km away</span>
                    <span className="text-indigo-400">•</span>
                    <span>{travel.text} from {college.shortName}</span>
                  </div>

                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-2xl bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 text-slate-700 dark:text-slate-300 text-xs font-medium">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{place.opening_hours}</span>
                  </div>
                </div>

                {/* Tabs: Overview vs All Reviews */}
                <div className="flex items-center border-b border-slate-200 dark:border-slate-800 pt-2">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeTab === 'overview'
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <Activity className="w-4 h-4" />
                    <span>Activities & Pros/Cons</span>
                  </button>

                  <button
                    onClick={() => setActiveTab('reviews')}
                    className={`pb-2.5 px-3 text-xs sm:text-sm font-bold border-b-2 transition-all flex items-center gap-1.5 ${
                      activeTab === 'reviews'
                        ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                        : 'border-transparent text-slate-500 hover:text-slate-800'
                    }`}
                  >
                    <span>Student Reviews ({place.reviews.length})</span>
                    <span className="text-[10px] px-1.5 py-0.2 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                      Good & Bad
                    </span>
                  </button>
                </div>
              </div>

              {/* TAB 1: OVERVIEW & ACTIVITIES */}
              {activeTab === 'overview' ? (
                <div className="px-4 sm:px-5 space-y-4">
                  {/* Senior Pro Tip Blockquote */}
                  <div className="p-4 rounded-2xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800/60 shadow-sm">
                    <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-indigo-700 dark:text-indigo-300 mb-1.5">
                      <Quote className="w-4 h-4 text-indigo-600" />
                      <span>Senior Pro-Tip (Headline)</span>
                    </div>
                    <blockquote className="text-sm font-medium text-slate-800 dark:text-slate-200 italic leading-relaxed">
                      "{place.senior_review}"
                    </blockquote>
                    <div className="mt-2.5 pt-2 border-t border-indigo-200/60 dark:border-indigo-800/80 flex items-center justify-between text-xs">
                      <span className="font-bold text-slate-900 dark:text-slate-100">
                        — {place.senior_author} ({place.senior_branch})
                      </span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full">
                        ✓ Senior Verified
                      </span>
                    </div>
                  </div>

                  {/* CAMPUS ACTIVITIES AROUND SPOT */}
                  <div>
                    <h3 className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
                      <Activity className="w-3.5 h-3.5 text-indigo-500" />
                      <span>College Activities Around This Spot ({place.activities.length})</span>
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {place.activities.map((act, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/70 border border-slate-200/60 dark:border-slate-700/60 flex items-center gap-2 text-xs font-semibold text-slate-800 dark:text-slate-200"
                        >
                          <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                          <span>{act}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PROS VS CONS BREAKDOWN (GOOD VS BAD) */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    {/* Good (Pros) */}
                    <div className="p-3.5 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-800/50">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-emerald-800 dark:text-emerald-300 mb-2">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>The Good (Why Seniors Love It)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {place.pros.map((pro, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5"
                          >
                            <span className="text-emerald-500 font-bold mt-0.5">✓</span>
                            <span>{pro}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Bad (Cons / Critical Warnings) */}
                    <div className="p-3.5 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-800/50">
                      <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-rose-800 dark:text-rose-300 mb-2">
                        <ShieldAlert className="w-4 h-4 text-rose-600" />
                        <span>The Bad (Watch-Outs & Cons)</span>
                      </div>
                      <ul className="space-y-1.5">
                        {place.cons.map((con, idx) => (
                          <li
                            key={idx}
                            className="text-xs text-slate-700 dark:text-slate-300 flex items-start gap-1.5"
                          >
                            <span className="text-rose-500 font-bold mt-0.5">✗</span>
                            <span>{con}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Freshers Hack if present */}
                  {place.timing_tip && (
                    <div className="p-3 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-2">
                      <Sparkles className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                      <div>
                        <span className="font-extrabold">Fresher Hack: </span>
                        <span>{place.timing_tip}</span>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                /* TAB 2: ALL REVIEWS (GOOD OR BAD) */
                <div className="px-4 sm:px-5 space-y-3">
                  {/* Filter Pills & Add Review Button */}
                  <div className="flex items-center justify-between gap-2 flex-wrap pb-1">
                    <div className="flex items-center gap-1.5 bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200/80 dark:border-slate-700">
                      <button
                        onClick={() => setReviewFilter('all')}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all ${
                          reviewFilter === 'all'
                            ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-sm'
                            : 'text-slate-500 hover:text-slate-800'
                        }`}
                      >
                        All ({place.reviews.length})
                      </button>
                      <button
                        onClick={() => setReviewFilter('positive')}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          reviewFilter === 'positive'
                            ? 'bg-emerald-600 text-white shadow-sm'
                            : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-600'
                        }`}
                      >
                        <ThumbsUp className="w-3 h-3" />
                        <span>Good ({positiveCount})</span>
                      </button>
                      <button
                        onClick={() => setReviewFilter('critical')}
                        className={`px-2.5 py-1 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
                          reviewFilter === 'critical'
                            ? 'bg-rose-600 text-white shadow-sm'
                            : 'text-rose-700 dark:text-rose-400 hover:text-rose-600'
                        }`}
                      >
                        <AlertTriangle className="w-3 h-3" />
                        <span>Bad / Warnings ({criticalCount})</span>
                      </button>
                    </div>

                    <button
                      onClick={() => setIsAddReviewOpen(true)}
                      className="px-3 py-1.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm active:scale-95 transition-all"
                    >
                      <MessageSquarePlus className="w-3.5 h-3.5" />
                      <span>Write Review</span>
                    </button>
                  </div>

                  {/* Review Cards List */}
                  <div className="space-y-2.5">
                    {filteredReviews.length > 0 ? (
                      filteredReviews.map((rev) => (
                        <div
                          key={rev.id}
                          className={`p-3.5 rounded-2xl border transition-all ${
                            rev.type === 'critical'
                              ? 'bg-rose-50/40 dark:bg-rose-950/20 border-rose-200 dark:border-rose-900/60'
                              : 'bg-white dark:bg-slate-800/80 border-slate-200/80 dark:border-slate-700/60'
                          }`}
                        >
                          {/* Review Author & Rating */}
                          <div className="flex items-center justify-between gap-2 mb-1.5">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded-full flex items-center justify-center font-black text-xs text-white ${
                                  rev.type === 'critical' ? 'bg-rose-500' : 'bg-indigo-600'
                                }`}
                              >
                                {rev.author[0]}
                              </div>
                              <div>
                                <div className="flex items-center gap-1.5">
                                  <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                                    {rev.author}
                                  </span>
                                  <span className="text-[10px] text-slate-400">
                                    • {rev.branch} ({rev.year})
                                  </span>
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-1">
                              <span
                                className={`text-[10px] font-bold px-1.5 py-0.2 rounded ${
                                  rev.type === 'critical'
                                    ? 'bg-rose-100 dark:bg-rose-900 text-rose-700 dark:text-rose-300'
                                    : 'bg-emerald-100 dark:bg-emerald-900 text-emerald-700 dark:text-emerald-300'
                                }`}
                              >
                                {rev.type === 'critical' ? '⚠️ Warning' : '👍 Recommended'}
                              </span>
                              <div className="flex items-center text-amber-500 text-xs font-bold">
                                <Star className="w-3 h-3 fill-current" />
                                <span>{rev.rating}</span>
                              </div>
                            </div>
                          </div>

                          {/* Review Title & Content */}
                          <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white mb-1">
                            {rev.title}
                          </h4>
                          <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                            {rev.comment}
                          </p>

                          {/* Review Footer Tags */}
                          <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-[10px] text-slate-400">
                            <div className="flex flex-wrap gap-1">
                              {rev.tags.map((t, i) => (
                                <span
                                  key={i}
                                  className="px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 font-medium"
                                >
                                  #{t}
                                </span>
                              ))}
                            </div>
                            <span>{rev.date}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-8 text-xs text-slate-500">
                        No {reviewFilter} reviews posted yet for this spot.
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Bottom Action Buttons */}
            <div className="p-3 sm:p-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-t border-slate-200 dark:border-slate-800 flex items-center gap-2">
              <button
                onClick={handleGetDirections}
                className="flex-1 py-3 px-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 active:scale-98 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30 transition-all min-h-[48px]"
              >
                <Navigation className="w-4 h-4" />
                <span>Get Directions</span>
                <ExternalLink className="w-3.5 h-3.5 opacity-70" />
              </button>

              <button
                onClick={() => onToggleFavorite(place.id)}
                className={`p-3 rounded-2xl border transition-all active:scale-95 flex items-center justify-center min-w-[48px] min-h-[48px] ${
                  isFavorite
                    ? 'bg-rose-50 dark:bg-rose-950/70 text-rose-600 border-rose-200 dark:border-rose-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:bg-slate-200'
                }`}
                title={isFavorite ? 'Remove from Saved' : 'Save to Survival List'}
              >
                <Heart
                  className={`w-5 h-5 ${isFavorite ? 'fill-current text-rose-500' : ''}`}
                />
              </button>

              <button
                onClick={handleShare}
                className="p-3 rounded-2xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center min-w-[48px] min-h-[48px]"
                title="Share Spot"
              >
                {copied ? <Check className="w-5 h-5 text-emerald-500" /> : <Share2 className="w-5 h-5" />}
              </button>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Add Review Dialog Modal */}
      <AddReviewModal
        place={place}
        isOpen={isAddReviewOpen}
        onClose={() => setIsAddReviewOpen(false)}
        onSubmitReview={onSubmitReview}
      />
    </>
  );
};
