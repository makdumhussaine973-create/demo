import React, { useState, useRef, useEffect } from 'react';
import { College, APSearchResult } from '../types';
import { COLLEGES, AP_MAJOR_HUBS } from '../data/colleges';
import { RAW_PLACES } from '../data/places';
import {
  Search,
  MapPin,
  GraduationCap,
  Sparkles,
  Compass,
  X,
  ChevronRight,
  Navigation
} from 'lucide-react';

interface APSearchBarProps {
  currentCollege: College;
  onSelectCollege: (college: College) => void;
  onSelectCustomLocation: (name: string, coords: [number, number], district?: string) => void;
}

export const APSearchBar: React.FC<APSearchBarProps> = ({
  currentCollege,
  onSelectCollege,
  onSelectCustomLocation
}) => {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isSearchingGeocode, setIsSearchingGeocode] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const trimmed = query.trim().toLowerCase();

  // Matched Colleges
  const matchedColleges = COLLEGES.filter((col) => {
    if (!trimmed) return true;
    return (
      col.name.toLowerCase().includes(trimmed) ||
      col.shortName.toLowerCase().includes(trimmed) ||
      col.city.toLowerCase().includes(trimmed) ||
      col.district.toLowerCase().includes(trimmed) ||
      col.popularActivities.some((act) => act.toLowerCase().includes(trimmed))
    );
  });

  // Matched AP Cities and Districts
  const matchedHubs = AP_MAJOR_HUBS.filter((hub) => {
    if (!trimmed) return true;
    return (
      hub.name.toLowerCase().includes(trimmed) ||
      hub.district.toLowerCase().includes(trimmed)
    );
  });

  // Matched Student Spots & Activities
  const matchedPlaces = RAW_PLACES.filter((p) => {
    if (!trimmed) return false;
    return (
      p.name.toLowerCase().includes(trimmed) ||
      p.city.toLowerCase().includes(trimmed) ||
      p.tag.toLowerCase().includes(trimmed) ||
      p.activities.some((act) => act.toLowerCase().includes(trimmed))
    );
  }).slice(0, 5);

  const handleSelectCollege = (col: College) => {
    onSelectCollege(col);
    setQuery('');
    setIsOpen(false);
  };

  const handleSelectHub = (hub: typeof AP_MAJOR_HUBS[0]) => {
    // Find closest college in that hub or create custom college anchor
    const foundCollege = COLLEGES.find(
      (c) => c.city.toLowerCase() === hub.name.toLowerCase() || c.district.toLowerCase() === hub.district.toLowerCase()
    );
    if (foundCollege) {
      onSelectCollege(foundCollege);
    } else {
      onSelectCustomLocation(hub.name, hub.coordinates, hub.district);
    }
    setQuery('');
    setIsOpen(false);
  };

  const handleSelectPlaceSpot = (place: typeof RAW_PLACES[0]) => {
    onSelectCustomLocation(place.name, place.coordinates, place.city);
    setQuery('');
    setIsOpen(false);
  };

  // Fallback to Google Maps Geocoder for arbitrary AP address
  const handleGeocodeSearch = () => {
    if (!trimmed) return;
    if (typeof google === 'undefined' || !google.maps || !google.maps.Geocoder) {
      // Simple fallback
      return;
    }

    setIsSearchingGeocode(true);
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        address: `${query}, Andhra Pradesh, India`,
        componentRestrictions: { country: 'IN' }
      },
      (results, status) => {
        setIsSearchingGeocode(false);
        if (status === 'OK' && results && results[0]) {
          const loc = results[0].geometry.location;
          onSelectCustomLocation(results[0].formatted_address, [loc.lat(), loc.lng()]);
          setQuery('');
          setIsOpen(false);
        }
      }
    );
  };

  return (
    <div className="relative flex-1 max-w-lg mx-2" ref={containerRef}>
      {/* Input Box */}
      <div className="relative flex items-center">
        <Search className="w-4 h-4 absolute left-3.5 text-indigo-500 pointer-events-none" />
        <input
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            if (!isOpen) setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleGeocodeSearch();
            }
          }}
          placeholder="Search any college, city, or activity in AP (Vizag, Vijayawada, Kurnool...)"
          className="w-full pl-9 pr-9 py-2 rounded-2xl bg-slate-100/90 dark:bg-slate-800/90 hover:bg-slate-200/70 dark:hover:bg-slate-700/70 focus:bg-white dark:focus:bg-slate-900 border border-slate-200/80 dark:border-slate-700 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all shadow-inner"
        />
        {query ? (
          <button
            onClick={() => {
              setQuery('');
              setIsOpen(false);
            }}
            className="absolute right-3 p-0.5 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        ) : (
          <div className="absolute right-3 flex items-center gap-1 text-[10px] font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950 px-1.5 py-0.5 rounded-md pointer-events-none">
            AP RADAR
          </div>
        )}
      </div>

      {/* Autocomplete Dropdown Modal */}
      {isOpen && (
        <div className="absolute left-0 right-0 top-full mt-2 w-full min-w-[300px] sm:min-w-[420px] max-h-[75vh] overflow-y-auto no-scrollbar bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
          {/* Quick Category Suggestions */}
          {!trimmed && (
            <div className="mb-3 pb-2.5 border-b border-slate-100 dark:border-slate-800">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block mb-2 px-1">
                Explore Andhra Pradesh Student Hubs
              </span>
              <div className="flex flex-wrap gap-1.5">
                {AP_MAJOR_HUBS.slice(0, 6).map((hub) => (
                  <button
                    key={hub.name}
                    onClick={() => handleSelectHub(hub)}
                    className="px-2.5 py-1 rounded-xl bg-slate-100 hover:bg-indigo-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 hover:text-indigo-600 dark:text-slate-300 text-xs font-semibold flex items-center gap-1 transition-all"
                  >
                    <MapPin className="w-3 h-3 text-indigo-500" />
                    <span>{hub.name.split(' ')[0]}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 1. Colleges Section */}
          {matchedColleges.length > 0 && (
            <div className="mb-3">
              <div className="flex items-center justify-between px-1 mb-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1">
                  <GraduationCap className="w-3.5 h-3.5" />
                  AP Universities & Engineering Colleges ({matchedColleges.length})
                </span>
              </div>
              <div className="space-y-1">
                {matchedColleges.map((col) => {
                  const isActive = col.id === currentCollege.id;
                  return (
                    <button
                      key={col.id}
                      onClick={() => handleSelectCollege(col)}
                      className={`w-full text-left p-2.5 rounded-2xl flex items-center justify-between gap-2 transition-all ${
                        isActive
                          ? 'bg-indigo-50 dark:bg-indigo-950/70 border border-indigo-200 dark:border-indigo-800'
                          : 'hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent'
                      }`}
                    >
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-extrabold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                            {col.name}
                          </span>
                          {isActive && (
                            <span className="text-[9px] font-bold px-1.5 py-0.2 rounded-full bg-indigo-600 text-white">
                              Active
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="font-semibold text-indigo-600 dark:text-indigo-400">
                            📍 {col.city} ({col.district})
                          </span>
                          <span>•</span>
                          <span className="truncate">{col.tagline}</span>
                        </div>
                        {/* Activities Preview Tag */}
                        <div className="flex flex-wrap gap-1 mt-1.5">
                          {col.popularActivities.slice(0, 3).map((act, i) => (
                            <span
                              key={i}
                              className="text-[10px] font-medium px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300"
                            >
                              ⚡ {act}
                            </span>
                          ))}
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 2. Matched Student Spots & Activities */}
          {matchedPlaces.length > 0 && (
            <div className="mb-3">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-pink-600 dark:text-pink-400 block px-1 mb-1.5 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" />
                Activities & Landmarks in AP ({matchedPlaces.length})
              </span>
              <div className="space-y-1">
                {matchedPlaces.map((place) => (
                  <button
                    key={place.id}
                    onClick={() => handleSelectPlaceSpot(place)}
                    className="w-full text-left p-2.5 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/70 border border-transparent flex items-center justify-between gap-2 transition-all"
                  >
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white truncate">
                          {place.name}
                        </span>
                        <span className="text-[10px] px-1.5 py-0.2 rounded bg-pink-100 dark:bg-pink-950 text-pink-700 dark:text-pink-300 font-bold uppercase">
                          {place.city}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 truncate mt-0.5">
                        Activities: {place.activities.slice(0, 2).join(' • ')}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-slate-400 flex-shrink-0" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. AP Cities & Districts Section */}
          {matchedHubs.length > 0 && (
            <div>
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400 block px-1 mb-1.5 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-400" />
                AP Cities & District Centers
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {matchedHubs.slice(0, 8).map((hub) => (
                  <button
                    key={hub.name}
                    onClick={() => handleSelectHub(hub)}
                    className="text-left p-2 rounded-xl bg-slate-50 hover:bg-indigo-50 dark:bg-slate-800/60 dark:hover:bg-slate-800 transition-all border border-slate-200/50 dark:border-slate-700/50"
                  >
                    <span className="font-bold text-xs text-slate-900 dark:text-white block truncate">
                      {hub.name}
                    </span>
                    <span className="text-[10px] text-slate-500 block truncate">
                      {hub.district} District
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 4. Google Maps Search Any Place in AP Button */}
          {trimmed && (
            <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <button
                onClick={handleGeocodeSearch}
                disabled={isSearchingGeocode}
                className="w-full py-2.5 px-3 rounded-2xl bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-700 hover:to-violet-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all active:scale-98"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>
                  {isSearchingGeocode ? 'Locating in AP...' : `Locate "${query}" anywhere in Andhra Pradesh`}
                </span>
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
