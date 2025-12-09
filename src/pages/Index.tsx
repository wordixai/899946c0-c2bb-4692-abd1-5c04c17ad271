import { MovieCard } from "@/components/MovieCard";
import { PreferenceSelector } from "@/components/PreferenceSelector";
import { useRecommendations } from "@/hooks/useRecommendations";
import { Film, TrendingUp, History } from "lucide-react";

export default function Index() {
  const {
    selectedGenres,
    userRatings,
    viewHistory,
    toggleGenre,
    rateMovie,
    addToHistory,
    recommendations,
    allMovies,
  } = useRecommendations();

  const getRating = (movieId: number) => {
    return userRatings.find((r) => r.movieId === movieId)?.rating;
  };

  const isViewed = (movieId: number) => {
    return viewHistory.includes(movieId);
  };

  return (
    <div className="min-h-screen pb-16">
      {/* Hero Section */}
      <header className="relative bg-gradient-cinema border-b border-border/50">
        <div className="container mx-auto px-4 py-12">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-3 bg-gradient-hero rounded-lg shadow-cinema">
              <Film className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                CineMatch
              </h1>
              <p className="text-muted-foreground">Your Personal Movie Recommendation Engine</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 space-y-12">
        {/* Preferences */}
        <section>
          <PreferenceSelector selectedGenres={selectedGenres} onToggleGenre={toggleGenre} />
        </section>

        {/* Recommendations */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <TrendingUp className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Recommended For You</h2>
          </div>
          {recommendations.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {recommendations.map((movie) => (
                <MovieCard
                  key={movie.id}
                  movie={movie}
                  userRating={getRating(movie.id)}
                  onRate={rateMovie}
                  onView={addToHistory}
                  isViewed={isViewed(movie.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-card rounded-lg">
              <p className="text-muted-foreground">
                Select your favorite genres above to get personalized recommendations
              </p>
            </div>
          )}
        </section>

        {/* All Movies */}
        <section>
          <div className="flex items-center gap-2 mb-6">
            <History className="w-6 h-6 text-primary" />
            <h2 className="text-2xl font-bold">Browse All Movies</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allMovies.map((movie) => (
              <MovieCard
                key={movie.id}
                movie={movie}
                userRating={getRating(movie.id)}
                onRate={rateMovie}
                onView={addToHistory}
                isViewed={isViewed(movie.id)}
              />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
