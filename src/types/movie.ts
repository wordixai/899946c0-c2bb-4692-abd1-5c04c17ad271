export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  rating: number;
  poster: string;
  description: string;
  director: string;
}

export interface UserRating {
  movieId: number;
  rating: number;
}

export interface UserPreferences {
  genres: string[];
  ratings: UserRating[];
  viewHistory: number[];
}
