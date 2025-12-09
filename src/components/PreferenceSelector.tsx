import { GENRES } from "@/data/movies";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

interface PreferenceSelectorProps {
  selectedGenres: string[];
  onToggleGenre: (genre: string) => void;
}

export function PreferenceSelector({ selectedGenres, onToggleGenre }: PreferenceSelectorProps) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-poster">
      <div className="flex items-center gap-2 mb-4">
        <Sparkles className="w-5 h-5 text-primary" />
        <h2 className="text-xl font-semibold">Your Preferences</h2>
      </div>
      <p className="text-sm text-muted-foreground mb-4">
        Select your favorite genres to get personalized recommendations
      </p>
      <div className="flex flex-wrap gap-2">
        {GENRES.map((genre) => {
          const isSelected = selectedGenres.includes(genre);
          return (
            <button
              key={genre}
              onClick={() => onToggleGenre(genre)}
              className={cn(
                "px-4 py-2 rounded-lg font-medium transition-all duration-200",
                isSelected
                  ? "bg-gradient-hero text-primary-foreground shadow-cinema"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
            >
              {genre}
            </button>
          );
        })}
      </div>
    </div>
  );
}
