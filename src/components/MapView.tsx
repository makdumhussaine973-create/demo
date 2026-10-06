import React, { useEffect, useCallback } from 'react';
import {
  APIProvider,
  Map,
  AdvancedMarker,
  ColorScheme,
  useMap
} from '@vis.gl/react-google-maps';
import { Place, College } from '../types';
import {
  Compass,
  Layers,
  GraduationCap,
  Utensils,
  Clapperboard,
  BookOpen,
  Sparkles,
  Dumbbell,
  Library,
  HeartPulse
} from 'lucide-react';

interface MapViewProps {
  college: College;
  places: Place[];
  selectedPlace: Place | null;
  onSelectPlace: (place: Place) => void;
  radiusKm: number;
  onChangeRadius?: (km: number) => void;
  isDarkMode: boolean;
}

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAPS_API_KEY ||
  'AIzaSyAXH9O2yxS9hfxeNDzTeNBOH5N9OHq3Mr0';

const getCategoryColor = (category: string): string => {
  switch (category) {
    case 'food':
      return '#f97316'; // amber/orange
    case 'theatres':
      return '#a855f7'; // purple
    case 'bookstores':
      return '#10b981'; // emerald
    case 'hangouts':
      return '#ec4899'; // pink
    case 'sports':
      return '#3b82f6'; // blue
    case 'study':
      return '#06b6d4'; // cyan
    case 'hospitals':
      return '#ef4444'; // red
    default:
      return '#6366f1'; // indigo
  }
};

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'food':
      return <Utensils className="w-4 h-4" />;
    case 'theatres':
      return <Clapperboard className="w-4 h-4" />;
    case 'bookstores':
      return <BookOpen className="w-4 h-4" />;
    case 'hangouts':
      return <Sparkles className="w-4 h-4" />;
    case 'sports':
      return <Dumbbell className="w-4 h-4" />;
    case 'study':
      return <Library className="w-4 h-4" />;
    case 'hospitals':
      return <HeartPulse className="w-4 h-4" />;
    default:
      return <Compass className="w-4 h-4" />;
  }
};

/**
 * Renders the 30km radius overlay using the Google Maps Circle API
 */
const RadarCircleOverlay: React.FC<{
  center: { lat: number; lng: number };
  radiusKm: number;
  isDarkMode: boolean;
}> = ({ center, radiusKm, isDarkMode }) => {
  const map = useMap();

  useEffect(() => {
    if (!map || typeof google === 'undefined' || !google.maps) return;

    const circle = new google.maps.Circle({
      map,
      center,
      radius: radiusKm * 1000,
      strokeColor: '#6366f1',
      strokeOpacity: 0.65,
      strokeWeight: 1.5,
      fillColor: '#6366f1',
      fillOpacity: isDarkMode ? 0.07 : 0.04,
      clickable: false
    });

    return () => {
      circle.setMap(null);
    };
  }, [map, center.lat, center.lng, radiusKm, isDarkMode]);

  return null;
};

/**
 * Controller to handle map camera movements and floating action buttons
 */
const MapCameraController: React.FC<{
  college: College;
  places: Place[];
  selectedPlace: Place | null;
  radiusKm: number;
}> = ({ college, places, selectedPlace, radiusKm }) => {
  const map = useMap();

  // Pan to college when it changes or radius changes
  useEffect(() => {
    if (!map) return;
    map.panTo({ lat: college.coordinates[0], lng: college.coordinates[1] });
    map.setZoom(radiusKm >= 50 ? 10.5 : 12.5);
  }, [map, college.id, college.coordinates, radiusKm]);

  // Pan smoothly to selected place when user selects one
  useEffect(() => {
    if (!map || !selectedPlace) return;
    const [lat, lng] = selectedPlace.coordinates;
    // Slight offset so the bottom drawer doesn't completely cover the pin
    map.panTo({ lat: lat - 0.003, lng });
    map.setZoom(15.5);
  }, [map, selectedPlace]);

  const handleRecenterCollege = useCallback(() => {
    if (!map) return;
    map.panTo({ lat: college.coordinates[0], lng: college.coordinates[1] });
    map.setZoom(radiusKm >= 50 ? 10.5 : 12.5);
  }, [map, college.coordinates, radiusKm]);

  const handleFitAllPlaces = useCallback(() => {
    if (!map || typeof google === 'undefined' || !google.maps) return;
    const bounds = new google.maps.LatLngBounds();
    bounds.extend({ lat: college.coordinates[0], lng: college.coordinates[1] });
    places.forEach((p) => {
      bounds.extend({ lat: p.coordinates[0], lng: p.coordinates[1] });
    });
    map.fitBounds(bounds, { top: 60, bottom: 80, left: 40, right: 40 });
  }, [map, college.coordinates, places]);

  return (
    <div className="absolute right-3 bottom-24 sm:bottom-16 z-20 flex flex-col gap-2">
      <button
        onClick={handleRecenterCollege}
        title="Recenter on College Campus (50km View)"
        className="w-11 h-11 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 transition-all"
      >
        <Compass className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
      </button>

      <button
        onClick={handleFitAllPlaces}
        title="Fit All Spots in 50km Radar"
        className="w-11 h-11 rounded-2xl bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-lg border border-slate-200/80 dark:border-slate-800 text-slate-700 dark:text-slate-200 flex items-center justify-center hover:bg-indigo-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 active:scale-95 transition-all"
      >
        <Layers className="w-5 h-5" />
      </button>
    </div>
  );
};

export const MapView: React.FC<MapViewProps> = ({
  college,
  places,
  selectedPlace,
  onSelectPlace,
  radiusKm,
  onChangeRadius,
  isDarkMode
}) => {
  const collegeCenter = {
    lat: college.coordinates[0],
    lng: college.coordinates[1]
  };

  return (
    <div className="relative w-full h-full min-h-[420px] overflow-hidden bg-slate-100 dark:bg-slate-950">
      <APIProvider apiKey={GOOGLE_MAPS_API_KEY} language="en" region="IN">
        <Map
          mapId="DEMO_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          defaultCenter={collegeCenter}
          defaultZoom={radiusKm >= 50 ? 10.5 : 12.5}
          colorScheme={isDarkMode ? ColorScheme.DARK : ColorScheme.LIGHT}
          gestureHandling="greedy"
          disableDefaultUI={false}
          style={{ width: '100%', height: '100%' }}
        >
          {/* 50km Radius Boundary Overlay */}
          <RadarCircleOverlay
            center={collegeCenter}
            radiusKm={radiusKm}
            isDarkMode={isDarkMode}
          />

          {/* College Campus Pulsing Anchor Marker */}
          <AdvancedMarker
            position={collegeCenter}
            title={`${college.name} (Campus Anchor)`}
            zIndex={1000}
          >
            <div className="relative flex items-center justify-center cursor-pointer group">
              <div className="absolute w-12 h-12 bg-indigo-500/30 rounded-full animate-ping" />
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-xl border-2 border-white dark:border-slate-900 ring-4 ring-indigo-500/40 transform transition-transform group-hover:scale-110">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="absolute -bottom-6 px-2 py-0.5 bg-slate-900/90 text-white text-[10px] font-bold rounded-full whitespace-nowrap shadow-md pointer-events-none backdrop-blur-sm">
                🎓 {college.shortName} (Campus)
              </div>
            </div>
          </AdvancedMarker>

          {/* Place Markers with Category Icons */}
          {places.map((place) => {
            const isSelected = selectedPlace?.id === place.id;
            const color = getCategoryColor(place.category);

            return (
              <AdvancedMarker
                key={place.id}
                position={{
                  lat: place.coordinates[0],
                  lng: place.coordinates[1]
                }}
                title={place.name}
                zIndex={isSelected ? 900 : 400}
                onClick={() => onSelectPlace(place)}
              >
                <div
                  className={`cursor-pointer transition-transform duration-200 ${
                    isSelected ? 'scale-125 z-50' : 'hover:scale-110'
                  }`}
                >
                  <div className="relative flex flex-col items-center group">
                    <div
                      style={{ backgroundColor: color }}
                      className={`w-9 h-9 rounded-2xl flex items-center justify-center text-white shadow-lg border-2 ${
                        isSelected
                          ? 'border-white dark:border-slate-900 ring-4 ring-indigo-500/50'
                          : 'border-white dark:border-slate-900'
                      }`}
                    >
                      {getCategoryIcon(place.category)}
                    </div>
                    {/* Pin Pointer */}
                    <div
                      style={{ borderTopColor: color }}
                      className="w-0 h-0 border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[6px] -mt-[1px]"
                    />
                    {/* Ground Shadow */}
                    <div className="w-3 h-1 bg-black/30 rounded-full blur-[1px] mt-0.5" />
                    {/* Hover Label */}
                    <div className="absolute bottom-11 px-2 py-0.5 bg-slate-900/95 text-white text-[11px] font-semibold rounded-lg whitespace-nowrap shadow-md opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none backdrop-blur-sm z-50">
                      {place.name} • {place.distance_km}km
                    </div>
                  </div>
                </div>
              </AdvancedMarker>
            );
          })}

          {/* Camera Controller & Floating Action Buttons */}
          <MapCameraController
            college={college}
            places={places}
            selectedPlace={selectedPlace}
            radiusKm={radiusKm}
          />
        </Map>
      </APIProvider>

      {/* Floating Radar Tag & Quick Range Selector */}
      <div className="absolute left-3 top-3 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md border border-slate-200/80 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-300">
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
        <span className="font-extrabold text-indigo-600 dark:text-indigo-400">
          Radar: {radiusKm}km
        </span>
        <span className="text-slate-400 hidden sm:inline">around {college.shortName}</span>

        {/* Quick Range Switchers */}
        {onChangeRadius && (
          <div className="flex items-center gap-1 ml-1 pl-1.5 border-l border-slate-200 dark:border-slate-700">
            {[25, 50, 75].map((km) => (
              <button
                key={km}
                onClick={() => onChangeRadius(km)}
                className={`px-1.5 py-0.5 text-[10px] font-bold rounded-md transition-all ${
                  radiusKm === km
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 text-slate-500'
                }`}
              >
                {km}km
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
