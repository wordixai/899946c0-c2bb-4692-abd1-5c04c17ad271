import { useState, useEffect, useMemo } from "react";
import { Movie } from "@/types/movie";
import { MOVIES } from "@/data/movies";

export interface UserRating {
  movieId: number;
  rating: number;
}

export function useRecommendations() {
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [userRatings, setUserRatings] = useState<UserRating[]>([]);
  const [viewHistory, setViewHistory] = useState<number[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("moviePreferences");
    if (stored) {
      const data = JSON.parse(stored);
      setSelectedGenres(data.selectedGenres || []);
      setUserRatings(data.userRatings || []);
      setViewHistory(data.viewHistory || []);
    }
  }, []);

  // Save to localStorage whenever preferences change
  useEffect(() => {
    localStorage.setItem(
      "moviePreferences",
      JSON.stringify({ selectedGenres, userRatings, viewHistory })
    );
  }, [selectedGenres, userRatings, viewHistory]);

  const toggleGenre = (genre: string) => {
    setSelectedGenres((prev) =>
      prev.includes(genre) ? prev.filter((g) => g !== genre) : [...prev, genre]
    );
  };

  const rateMovie = (movieId: number, rating: number) => {
    setUserRatings((prev) => {
      const existing = prev.find((r) => r.movieId === movieId);
      if (existing) {
        return prev.map((r) => (r.movieId === movieId ? { movieId, rating } : r));
      }
      return [...prev, { movieId, rating }];
    });
  };

  const addToHistory = (movieId: number) => {
    setViewHistory((prev) => {
      if (prev.includes(movieId)) return prev;
      return [...prev, movieId];
    });
  };

  const recommendations = useMemo(() => {
    return getRecommendations(MOVIES, selectedGenres, userRatings, viewHistory);
  }, [selectedGenres, userRatings, viewHistory]);

  return {
    selectedGenres,
    userRatings,
    viewHistory,
    toggleGenre,
    rateMovie,
    addToHistory,
    recommendations,
    allMovies: MOVIES,
  };
}

function getRecommendations(
  movies: Movie[],
  selectedGenres: string[],
  userRatings: UserRating[],
  viewHistory: number[]
): Movie[] {
  if (selectedGenres.length === 0 && userRatings.length === 0) {
    return movies.slice(0, 6);
  }

  const scoredMovies = movies.map((movie) => {
    let score = 0;

    // Genre matching (highest weight)
    const genreMatch = movie.genre.filter((g) => selectedGenres.includes(g)).length;
    score += genreMatch * 3;

    // User ratings influence
    const highRatedGenres = userRatings
      .filter((r) => r.rating >= 4)
      .map((r) => movies.find((m) => m.id === r.movieId))
      .filter(Boolean)
      .flatMap((m) => m!.genre);

    const ratedGenreMatch = movie.genre.filter((g) => highRatedGenres.includes(g)).length;
    score += ratedGenreMatch * 2;

    // Boost highly rated movies
    if (movie.rating >= 8.5) score += 1;

    // Penalize already viewed
    if (viewHistory.includes(movie.id)) score -= 10;

    return { movie, score };
  });

  return scoredMovies
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map((item) => item.movie);
}
