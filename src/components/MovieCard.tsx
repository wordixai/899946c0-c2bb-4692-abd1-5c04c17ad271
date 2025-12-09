import { Movie } from "@/types/movie";
import { Star, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

interface MovieCardProps {
  movie: Movie;
  userRating?: number;
  onRate: (movieId: number, rating: number) => void;
  onView: (movieId: number) => void;
  isViewed?: boolean;
}

export function MovieCard({ movie, userRating, onRate, onView, isViewed }: MovieCardProps) {
  const handleStarClick = (rating: number) => {
    onRate(movie.id, rating);
  };

  return (
    <div
      className="group relative bg-card rounded-lg overflow-hidden shadow-poster hover:shadow-cinema transition-all duration-300 hover:scale-105 cursor-pointer animate-slide-in"
      onClick={() => onView(movie.id)}
    >
      <div className="relative aspect-[2/3] overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-poster opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {isViewed && (
          <div className="absolute top-3 right-3 bg-primary rounded-full p-2">
            <Eye className="w-4 h-4 text-primary-foreground" />
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          <p className="text-sm text-muted-foreground line-clamp-3 mb-2">
            {movie.description}
          </p>
          <p className="text-xs text-muted-foreground">
            Directed by {movie.director}
          </p>
        </div>
      </div>

      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{movie.title}</h3>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">{movie.year}</span>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{movie.rating}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {movie.genre.slice(0, 3).map((genre) => (
            <span
              key={genre}
              className="text-xs px-2 py-1 bg-muted rounded-md text-muted-foreground"
            >
              {genre}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => handleStarClick(star)}
              className="transition-transform hover:scale-125"
            >
              <Star
                className={cn(
                  "w-5 h-5 transition-colors",
                  userRating && star <= userRating
                    ? "fill-primary text-primary"
                    : "fill-muted text-muted"
                )}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
