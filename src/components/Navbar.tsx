import React from 'react';
import { College } from '../types';
import { APSearchBar } from './APSearchBar';
import { 
  Compass, 
  Moon, 
  Sun, 
  Bookmark, 
  Map,
  List
} from 'lucide-react';

interface NavbarProps {
  currentCollege: College;
  onSelectCollege: (college: College) => void;
  onSelectCustomLocation: (name: string, coords: [number, number], district?: string) => void;
  activeView: 'map' | 'list';
  onToggleView: (view: 'map' | 'list') => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  favoritesCount: number;
  onOpenFavorites: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentCollege,
  onSelectCollege,
  onSelectCustomLocation,
  activeView,
  onToggleView,
  isDarkMode,
  onToggleDarkMode,
  favoritesCount,
  onOpenFavorites
}) => {
  return (
    <header className="sticky top-0 z-40 w-full bg-white/85 dark:bg-slate-900/85 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-2.5 flex items-center justify-between gap-2">
        {/* Brand Logo & Name */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-indigo-500 to-violet-600 flex items-center justify-center text-white shadow-md shadow-indigo-500/20">
            <Compass className="w-5 h-5 animate-[spin_20s_linear_infinite]" />
          </div>
          <div className="hidden min-[480px]:block">
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-base tracking-tight text-slate-900 dark:text-white leading-none">
                Fresher<span className="text-indigo-600 dark:text-indigo-400">Compass</span>
              </span>
              <span className="text-[10px] font-black uppercase tracking-wider px-1.5 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                AP
              </span>
            </div>
            <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium leading-tight mt-0.5">
              Active: {currentCollege.shortName} ({currentCollege.city})
            </p>
          </div>
        </div>

        {/* Powerful AP Search Bar: Search any college, city or place in Andhra Pradesh */}
        <APSearchBar
          currentCollege={currentCollege}
          onSelectCollege={onSelectCollege}
          onSelectCustomLocation={onSelectCustomLocation}
        />

        {/* Right Action Buttons */}
        <div className="flex items-center gap-1.5 flex-shrink-0">
          {/* View Toggle Pill */}
          <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200/80 dark:border-slate-700">
            <button
              onClick={() => onToggleView('map')}
              title="Map View"
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'map'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Map</span>
            </button>
            <button
              onClick={() => onToggleView('list')}
              title="List View"
              className={`p-1.5 sm:px-2.5 sm:py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                activeView === 'list'
                  ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-sm'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-slate-100'
              }`}
            >
              <List className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">List</span>
            </button>
          </div>

          {/* Favorites Button */}
          <button
            onClick={onOpenFavorites}
            title="Saved Survival Spots"
            className="relative p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all border border-slate-200/80 dark:border-slate-700 active:scale-95"
          >
            <Bookmark className="w-4 h-4" />
            {favoritesCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-rose-500 text-white text-[9px] font-bold flex items-center justify-center shadow">
                {favoritesCount}
              </span>
            )}
          </button>

          {/* Dark Mode Toggle */}
          <button
            onClick={onToggleDarkMode}
            title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 transition-all border border-slate-200/80 dark:border-slate-700 active:scale-95"
          >
            {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-600" />}
          </button>
        </div>
      </div>
    </header>
  );
};
