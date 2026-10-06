import React from 'react';
import { Place, College } from '../types';
import { X, Heart, Star, Trash2, Navigation, ExternalLink } from 'lucide-react';
import { getTravelEstimate } from '../utils/distance';

interface FavoritesModalProps {
  isOpen: boolean;
  onClose: () => void;
  favorites: string[];
  places: Place[];
  college: College;
  onSelectPlace: (place: Place) => void;
  onToggleFavorite: (placeId: string) => void;
}

export const FavoritesModal: React.FC<FavoritesModalProps> = ({
  isOpen,
  onClose,
  favorites,
  places,
  college,
  onSelectPlace,
  onToggleFavorite
}) => {
  if (!isOpen) return null;

  const savedPlaces = places.filter((p) => favorites.includes(p.id));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[85vh]">
        {/* Header */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-rose-100 dark:bg-rose-950/80 text-rose-600 flex items-center justify-center">
              <Heart className="w-4 h-4 fill-current" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-900 dark:text-white">
                Saved Survival Spots
              </h2>
              <p className="text-xs text-slate-500">
                {savedPlaces.length} bookmark{savedPlaces.length === 1 ? '' : 's'} around {college.shortName}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* List Content */}
        <div className="overflow-y-auto p-3 space-y-2 flex-1">
          {savedPlaces.length > 0 ? (
            savedPlaces.map((place) => {
              const travel = getTravelEstimate(place.distance_km);
              return (
                <div
                  key={place.id}
                  onClick={() => {
                    onSelectPlace(place);
                    onClose();
                  }}
                  className="p-2.5 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/60 dark:hover:bg-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-center justify-between gap-3 cursor-pointer transition-all group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <img
                      src={place.image_url}
                      alt={place.name}
                      className="w-12 h-12 rounded-xl object-cover flex-shrink-0"
                    />
                    <div className="min-w-0">
                      <h4 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate group-hover:text-indigo-600">
                        {place.name}
                      </h4>
                      <div className="flex items-center gap-1.5 text-[11px] text-slate-500 mt-0.5">
                        <span className="font-semibold text-amber-500 flex items-center gap-0.5">
                          <Star className="w-3 h-3 fill-current" /> {place.rating}
                        </span>
                        <span>•</span>
                        <span>{travel.icon} {place.distance_km} km</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite(place.id);
                      }}
                      className="p-2 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/50 rounded-xl transition-all"
                      title="Remove from saved"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="text-center py-10 px-4">
              <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center mx-auto mb-2">
                <Heart className="w-5 h-5" />
              </div>
              <p className="text-sm font-bold text-slate-700 dark:text-slate-300">
                No spots saved yet
              </p>
              <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
                Tap the heart icon on any landmark or eatery to keep it in your quick fresher survival list!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
