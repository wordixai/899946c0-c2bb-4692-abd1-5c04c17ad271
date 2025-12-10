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
      <header className="relative bg-gradient-cinema border-b border-border/50 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=1920&q=80')] bg-cover bg-center opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />

        <div className="container mx-auto px-4 py-20 relative">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-3 mb-6 animate-float">
              <div className="p-4 bg-gradient-hero rounded-2xl shadow-cinema">
                <Film className="w-12 h-12 text-primary-foreground" />
              </div>
            </div>

            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-4 animate-slide-in">
              CineMatch
            </h1>

            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto animate-slide-in">
              Discover your next favorite movie with personalized recommendations powered by your unique taste
            </p>

            <div className="flex flex-wrap items-center justify-center gap-6 pt-4 text-sm text-muted-foreground animate-slide-in">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-glow" />
                <span>Smart Recommendations</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-secondary animate-glow" />
                <span>Personal Ratings</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-glow" />
                <span>View History</span>
              </div>
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
