import React, { useState, useMemo } from 'react';
import { Place, College } from '../types';
import { getTravelEstimate } from '../utils/distance';
import { 
  Star, 
  MapPin, 
  Heart, 
  Search, 
  ArrowUpDown, 
  ChevronRight, 
  Quote, 
  Sparkles,
  Activity,
  CheckCircle2,
  AlertTriangle,
  ThumbsUp
} from 'lucide-react';

interface ListViewProps {
  places: Place[];
  college: College;
  onSelectPlace: (place: Place) => void;
  favorites: string[];
  onToggleFavorite: (placeId: string) => void;
}

export const ListView: React.FC<ListViewProps> = ({
  places,
  college,
  onSelectPlace,
  favorites,
  onToggleFavorite
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'nearest' | 'rating' | 'reviews'>('nearest');

  const filteredAndSortedPlaces = useMemo(() => {
    let list = places.filter((p) => {
      const q = searchQuery.toLowerCase();
      return (
        p.name.toLowerCase().includes(q) ||
        p.tag.toLowerCase().includes(q) ||
        p.city.toLowerCase().includes(q) ||
        p.senior_review.toLowerCase().includes(q) ||
        p.address.toLowerCase().includes(q) ||
        p.activities.some((act) => act.toLowerCase().includes(q)) ||
        p.features.some((f) => f.toLowerCase().includes(q))
      );
    });

    list.sort((a, b) => {
      if (sortBy === 'nearest') {
        return a.distance_km - b.distance_km;
      } else if (sortBy === 'rating') {
        return b.rating - a.rating;
      } else if (sortBy === 'reviews') {
        return b.review_count - a.review_count;
      }
      return 0;
    });

    return list;
  }, [places, searchQuery, sortBy]);

  const getCategoryBadgeClass = (category: string) => {
    switch (category) {
      case 'food':
        return 'bg-amber-100 dark:bg-amber-950/70 text-amber-800 dark:text-amber-300';
      case 'theatres':
        return 'bg-purple-100 dark:bg-purple-950/70 text-purple-800 dark:text-purple-300';
      case 'bookstores':
        return 'bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300';
      case 'hangouts':
        return 'bg-pink-100 dark:bg-pink-950/70 text-pink-800 dark:text-pink-300';
      case 'sports':
        return 'bg-blue-100 dark:bg-blue-950/70 text-blue-800 dark:text-blue-300';
      case 'study':
        return 'bg-cyan-100 dark:bg-cyan-950/70 text-cyan-800 dark:text-cyan-300';
      case 'hospitals':
        return 'bg-red-100 dark:bg-red-950/70 text-red-800 dark:text-red-300';
      default:
        return 'bg-indigo-100 dark:bg-indigo-950/70 text-indigo-800 dark:text-indigo-300';
    }
  };

  return (
    <div className="w-full h-full overflow-y-auto p-3 sm:p-5 max-w-5xl mx-auto space-y-4">
      {/* Search & Sort Controls */}
      <div className="flex flex-col sm:flex-row gap-2.5 items-stretch sm:items-center justify-between">
        <div className="relative flex-1">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search activities, chai, turf, movies, xerox in radar..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400"
          />
        </div>

        {/* Sort Selector */}
        <div className="flex items-center gap-1.5 self-end sm:self-auto bg-white dark:bg-slate-900 p-1 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
          <span className="text-[11px] font-semibold text-slate-400 pl-2 pr-1 flex items-center gap-1">
            <ArrowUpDown className="w-3 h-3" />
            Sort:
          </span>
          <button
            onClick={() => setSortBy('nearest')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              sortBy === 'nearest'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Nearest
          </button>
          <button
            onClick={() => setSortBy('rating')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              sortBy === 'rating'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Top Rated
          </button>
          <button
            onClick={() => setSortBy('reviews')}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              sortBy === 'reviews'
                ? 'bg-indigo-600 text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            Popular
          </button>
        </div>
      </div>

      {/* Spots Cards Grid */}
      {filteredAndSortedPlaces.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 pb-20">
          {filteredAndSortedPlaces.map((place) => {
            const isFav = favorites.includes(place.id);
            const travel = getTravelEstimate(place.distance_km);
            const posReviews = place.reviews.filter((r) => r.type === 'positive').length;
            const critReviews = place.reviews.filter((r) => r.type === 'critical').length;

            return (
              <div
                key={place.id}
                onClick={() => onSelectPlace(place)}
                className="group relative bg-white dark:bg-slate-900 rounded-3xl p-3.5 border border-slate-200/80 dark:border-slate-800 hover:border-indigo-400 dark:hover:border-indigo-600 shadow-sm hover:shadow-lg transition-all duration-200 cursor-pointer flex flex-col justify-between"
              >
                {/* Top Section */}
                <div className="flex gap-3.5 items-start">
                  {/* Thumbnail */}
                  <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden flex-shrink-0 bg-slate-100 dark:bg-slate-800">
                    <img
                      src={place.image_url}
                      alt={place.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-1.5 left-1.5">
                      <span className="px-1.5 py-0.5 rounded-md text-[10px] font-bold bg-slate-950/75 text-white backdrop-blur-sm">
                        {place.price_tier}
                      </span>
                    </div>
                  </div>

                  {/* Content Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-1 mb-1">
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-md ${getCategoryBadgeClass(
                            place.category
                          )}`}
                        >
                          {place.category}
                        </span>
                        <span className="text-[10px] font-bold text-slate-500 bg-slate-100 dark:bg-slate-800 px-1.5 py-0.5 rounded-md">
                          {place.city}
                        </span>
                      </div>

                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onToggleFavorite(place.id);
                        }}
                        className={`p-1.5 rounded-full transition-all active:scale-90 ${
                          isFav
                            ? 'text-rose-500 bg-rose-50 dark:bg-rose-950/50'
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                        title="Save to favorites"
                      >
                        <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                      </button>
                    </div>

                    <h3 className="font-extrabold text-sm sm:text-base text-slate-900 dark:text-white leading-tight truncate group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                      {place.name}
                    </h3>

                    {/* Rating & Distance */}
                    <div className="flex items-center gap-2 mt-1 text-xs">
                      <div className="flex items-center gap-1 font-bold text-amber-500">
                        <Star className="w-3.5 h-3.5 fill-current" />
                        <span>{place.rating.toFixed(1)}</span>
                      </div>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <div className="text-indigo-600 dark:text-indigo-400 font-semibold truncate">
                        <span>{travel.icon} {place.distance_km} km</span>
                      </div>
                    </div>

                    {/* Review counts (Good & Bad) */}
                    <div className="flex items-center gap-2 mt-1.5 text-[11px]">
                      <span className="inline-flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                        <ThumbsUp className="w-3 h-3" /> {posReviews} Good
                      </span>
                      <span className="text-slate-300 dark:text-slate-700">•</span>
                      <span className="inline-flex items-center gap-1 text-rose-600 dark:text-rose-400 font-semibold">
                        <AlertTriangle className="w-3 h-3" /> {critReviews} Warnings
                      </span>
                    </div>
                  </div>
                </div>

                {/* College Activities Preview */}
                <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800/80">
                  <div className="flex flex-wrap gap-1">
                    {place.activities.slice(0, 3).map((act, i) => (
                      <span
                        key={i}
                        className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-900/60"
                      >
                        ⚡ {act}
                      </span>
                    ))}
                  </div>

                  {/* Senior Review Headline */}
                  <div className="mt-2 flex items-start gap-1.5 text-xs text-slate-600 dark:text-slate-300 italic">
                    <Quote className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
                    <span className="line-clamp-2 text-[11px] sm:text-xs">
                      "{place.senior_review}"
                    </span>
                  </div>

                  <div className="flex items-center justify-between mt-2 pt-1 text-[10px] text-slate-400">
                    <span>— {place.senior_author}</span>
                    <span className="font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                      Inspect good & bad reviews <ChevronRight className="w-3 h-3" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8">
          <div className="w-14 h-14 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 flex items-center justify-center mx-auto mb-3">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-extrabold text-base text-slate-800 dark:text-slate-200">
            No spots found in radar
          </h3>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto mt-1">
            Try searching for other colleges or cities in AP using the top search bar!
          </p>
        </div>
      )}
    </div>
  );
};
