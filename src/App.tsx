import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { College, Place, CategoryId, ReviewItem } from './types';
import { COLLEGES, DEFAULT_COLLEGE } from './data/colleges';
import { RAW_PLACES, CATEGORIES_CONFIG } from './data/places';
import { calculateDistance } from './utils/distance';
import { Navbar } from './components/Navbar';
import { CategoryFilter } from './components/CategoryFilter';
import { MapView } from './components/MapView';
import { ListView } from './components/ListView';
import { BottomSheet } from './components/BottomSheet';
import { FavoritesModal } from './components/FavoritesModal';

export default function App() {
  // Global State
  const [college, setCollege] = useState<College>(DEFAULT_COLLEGE);
  const [radiusKm, setRadiusKm] = useState<number>(50); // Extended 50km radius boundary
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('all');
  const [activeView, setActiveView] = useState<'map' | 'list'>('map');
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  // Dynamic places state allowing real-time reviews addition
  const [placesList, setPlacesList] = useState<Place[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fc_custom_places_v2');
        if (saved) return JSON.parse(saved);
      } catch {}
    }
    return RAW_PLACES;
  });

  // Save updated reviews/places to localStorage
  useEffect(() => {
    localStorage.setItem('fc_custom_places_v2', JSON.stringify(placesList));
  }, [placesList]);

  // Listen for Google Maps quota exceeded events
  useEffect(() => {
    const handleQuota = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuota);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuota);
  }, []);

  // Dark Mode State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('fc_dark_mode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  // Favorites State
  const [favorites, setFavorites] = useState<string[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('fc_favorites');
        return saved ? JSON.parse(saved) : ['kritunga-restaurant', 'svc-cinemas', 'tea-time-gprec'];
      } catch {
        return ['kritunga-restaurant', 'svc-cinemas'];
      }
    }
    return [];
  });

  // Sync Dark Mode class with <html>
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('fc_dark_mode', String(isDarkMode));
  }, [isDarkMode]);

  // Sync Favorites to localStorage
  useEffect(() => {
    localStorage.setItem('fc_favorites', JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (placeId: string) => {
    setFavorites((prev) =>
      prev.includes(placeId) ? prev.filter((id) => id !== placeId) : [...prev, placeId]
    );
  };

  // Handle custom location or city in AP
  const handleSelectCustomLocation = useCallback(
    (name: string, coords: [number, number], district?: string) => {
      const customCollege: College = {
        id: `loc-${Date.now()}`,
        name: name,
        shortName: name.split(',')[0].slice(0, 20),
        city: name.split(',')[0],
        district: district || 'Andhra Pradesh',
        state: 'Andhra Pradesh',
        coordinates: coords,
        tagline: 'Custom Search Location in Andhra Pradesh',
        established: 2026,
        address: `${name}, Andhra Pradesh`,
        popularActivities: ['Campus Radar Exploration', 'Local Student Addas', 'Transit & Food Spots']
      };
      setCollege(customCollege);
      setSelectedPlace(null);
    },
    []
  );

  // Submit review callback (handles both good and bad reviews)
  const handleSubmitReview = useCallback((placeId: string, newReview: ReviewItem) => {
    setPlacesList((prev) =>
      prev.map((p) => {
        if (p.id !== placeId) return p;
        const updatedReviews = [newReview, ...p.reviews];
        // Recalculate average rating
        const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
        const newAvg = Math.round((totalRating / updatedReviews.length) * 10) / 10;
        return {
          ...p,
          rating: newAvg,
          review_count: updatedReviews.length,
          reviews: updatedReviews
        };
      })
    );

    // Also update currently selected place if open
    setSelectedPlace((current) => {
      if (!current || current.id !== placeId) return current;
      const updatedReviews = [newReview, ...current.reviews];
      const totalRating = updatedReviews.reduce((sum, r) => sum + r.rating, 0);
      const newAvg = Math.round((totalRating / updatedReviews.length) * 10) / 10;
      return {
        ...current,
        rating: newAvg,
        review_count: updatedReviews.length,
        reviews: updatedReviews
      };
    });
  }, []);

  // Recompute distance for all places whenever the selected college/AP location changes
  const placesWithDynamicDistance = useMemo<Place[]>(() => {
    const [cLat, cLng] = college.coordinates;
    return placesList.map((place) => {
      const dist = calculateDistance(cLat, cLng, place.coordinates[0], place.coordinates[1]);
      return {
        ...place,
        distance_km: dist
      };
    });
  }, [college, placesList]);

  // Filter places by radius & category
  const filteredPlaces = useMemo<Place[]>(() => {
    const matched = placesWithDynamicDistance.filter((place) => {
      const withinRadius = place.distance_km <= radiusKm;
      const categoryMatch = selectedCategory === 'all' || place.category === selectedCategory;
      return withinRadius && categoryMatch;
    });

    // Fallback: If current radius has 0 spots (e.g. user selected another AP city where few spots are seeded),
    // show spots from the same city or closest in AP so the list is never empty!
    if (matched.length === 0) {
      const cityMatched = placesWithDynamicDistance.filter(
        (p) =>
          p.city.toLowerCase().includes(college.city.toLowerCase()) ||
          college.city.toLowerCase().includes(p.city.toLowerCase())
      );
      if (cityMatched.length > 0) return cityMatched;
      return placesWithDynamicDistance.slice(0, 10);
    }

    return matched;
  }, [placesWithDynamicDistance, radiusKm, selectedCategory, college.city]);

  // Category counts
  const categoryCounts = useMemo<Record<CategoryId, number>>(() => {
    const counts: Record<CategoryId, number> = {
      all: 0,
      food: 0,
      theatres: 0,
      bookstores: 0,
      hangouts: 0,
      sports: 0,
      study: 0,
      hospitals: 0
    };

    placesWithDynamicDistance.forEach((p) => {
      if (p.distance_km <= radiusKm) {
        counts.all += 1;
        if (p.category in counts) {
          counts[p.category] += 1;
        }
      }
    });

    return counts;
  }, [placesWithDynamicDistance, radiusKm]);

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      {/* Quota Exceeded Sticky Notice */}
      {quotaExceeded && (
        <div className="bg-amber-50 border-b border-amber-200 text-amber-900 px-4 py-2.5 text-xs md:text-sm text-center sticky top-0 z-50 shadow-sm">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-semibold text-amber-950 hover:text-amber-800"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* 1. Top Glassmorphic Navigation with AP Search Bar */}
      <Navbar
        currentCollege={college}
        onSelectCollege={(c) => {
          setCollege(c);
          setSelectedPlace(null);
        }}
        onSelectCustomLocation={handleSelectCustomLocation}
        activeView={activeView}
        onToggleView={setActiveView}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        favoritesCount={favorites.length}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      {/* 2. Category Filter Bar (Food, Movies, Xerox, Hangouts, Sports, Study, Meds) */}
      <CategoryFilter
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
        categoryCounts={categoryCounts}
      />

      {/* 3. Main Viewport Area (Google Map or List) */}
      <main className="flex-1 relative overflow-hidden">
        {activeView === 'map' ? (
          <MapView
            college={college}
            places={filteredPlaces}
            selectedPlace={selectedPlace}
            onSelectPlace={setSelectedPlace}
            radiusKm={radiusKm}
            onChangeRadius={setRadiusKm}
            isDarkMode={isDarkMode}
          />
        ) : (
          <ListView
            places={filteredPlaces}
            college={college}
            onSelectPlace={setSelectedPlace}
            favorites={favorites}
            onToggleFavorite={toggleFavorite}
          />
        )}
      </main>

      {/* 4. Bottom Sheet (Detailed Place View, Activities & Good/Bad Reviews) */}
      <BottomSheet
        place={selectedPlace}
        college={college}
        onClose={() => setSelectedPlace(null)}
        isFavorite={selectedPlace ? favorites.includes(selectedPlace.id) : false}
        onToggleFavorite={toggleFavorite}
        onSubmitReview={handleSubmitReview}
      />

      {/* 5. Saved Places Modal */}
      <FavoritesModal
        isOpen={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        favorites={favorites}
        places={placesWithDynamicDistance}
        college={college}
        onSelectPlace={(place) => {
          setSelectedPlace(place);
          setActiveView('map');
        }}
        onToggleFavorite={toggleFavorite}
      />
    </div>
  );
}
