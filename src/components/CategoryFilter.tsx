import React from 'react';
import { CategoryId } from '../types';
import { CATEGORIES_CONFIG } from '../data/places';
import { 
  Compass, 
  Utensils, 
  Clapperboard, 
  BookOpen, 
  Sparkles, 
  Dumbbell,
  Library,
  HeartPulse 
} from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: CategoryId;
  onSelectCategory: (categoryId: CategoryId) => void;
  categoryCounts: Record<CategoryId, number>;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onSelectCategory,
  categoryCounts
}) => {
  const getIcon = (id: CategoryId) => {
    switch (id) {
      case 'all':
        return <Compass className="w-4 h-4" />;
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

  return (
    <div className="w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800/80 py-2.5 px-3 z-30 transition-colors">
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-0.5">
        {CATEGORIES_CONFIG.map((cat) => {
          const isActive = selectedCategory === cat.id;
          const count = categoryCounts[cat.id] ?? 0;

          return (
            <button
              key={cat.id}
              onClick={() => onSelectCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-3.5 py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-200 active:scale-95 ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25 ring-2 ring-indigo-500/30'
                  : 'bg-slate-100 hover:bg-slate-200/80 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-300 border border-slate-200/50 dark:border-slate-700/50'
              }`}
            >
              <span className={isActive ? 'text-white' : 'text-slate-500 dark:text-slate-400'}>
                {getIcon(cat.id)}
              </span>
              <span>{cat.label}</span>
              <span
                className={`text-[11px] px-1.5 py-0.2 rounded-full font-mono transition-colors ${
                  isActive
                    ? 'bg-white/20 text-white'
                    : 'bg-slate-200/80 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
