import { type Movie, movies } from '@/data/movies';

// Calculate similarity between two movies based on genre, director, and actors
const calculateSimilarity = (movie1: Movie, movie2: Movie): number => {
  let similarity = 0;
  let factors = 0;

  // Genre similarity (40% weight)
  const genreOverlap = movie1.genre.filter(g => movie2.genre.includes(g)).length;
  const totalGenres = new Set([...movie1.genre, ...movie2.genre]).size;
  if (totalGenres > 0) {
    similarity += (genreOverlap / totalGenres) * 0.4;
    factors += 0.4;
  }

  // Director similarity (25% weight)
  if (movie1.director === movie2.director) {
    similarity += 0.25;
  }
  factors += 0.25;

  // Actor similarity (20% weight)
  const actorOverlap = movie1.actors.filter(a => movie2.actors.includes(a)).length;
  const totalActors = new Set([...movie1.actors, ...movie2.actors]).size;
  if (totalActors > 0) {
    similarity += (actorOverlap / totalActors) * 0.2;
  }
  factors += 0.2;

  // Rating similarity (10% weight)
  const ratingDiff = Math.abs(movie1.rating - movie2.rating);
  const ratingSimilarity = Math.max(0, 1 - (ratingDiff / 10));
  similarity += ratingSimilarity * 0.1;
  factors += 0.1;

  // Year proximity (5% weight)
  const yearDiff = Math.abs(movie1.year - movie2.year);
  const yearSimilarity = Math.max(0, 1 - (yearDiff / 50)); // Movies within 50 years are considered similar
  similarity += yearSimilarity * 0.05;
  factors += 0.05;

  return factors > 0 ? similarity / factors : 0;
};

// Get recommendations based on a selected movie
export const getRecommendations = (
  selectedMovie: Movie,
  count: number = 6,
  minSimilarity: number = 0.1
): Movie[] => {
  const recommendations = movies
    .filter(movie => movie.id !== selectedMovie.id)
    .map(movie => ({
      movie,
      similarity: calculateSimilarity(selectedMovie, movie)
    }))
    .filter(item => item.similarity >= minSimilarity)
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, count)
    .map(item => item.movie);

  return recommendations;
};

// Get recommendations based on user preferences (genres, directors, etc.)
export const getRecommendationsByPreferences = (
  preferences: {
    genres?: string[];
    directors?: string[];
    minRating?: number;
    maxYear?: number;
    minYear?: number;
  },
  count: number = 6
): Movie[] => {
  let filteredMovies = movies;

  // Filter by genres
  if (preferences.genres && preferences.genres.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.genre.some(genre => preferences.genres!.includes(genre))
    );
  }

  // Filter by directors
  if (preferences.directors && preferences.directors.length > 0) {
    filteredMovies = filteredMovies.filter(movie =>
      preferences.directors!.includes(movie.director)
    );
  }

  // Filter by rating
  if (preferences.minRating) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.rating >= preferences.minRating!
    );
  }

  // Filter by year range
  if (preferences.minYear) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.year >= preferences.minYear!
    );
  }

  if (preferences.maxYear) {
    filteredMovies = filteredMovies.filter(movie =>
      movie.year <= preferences.maxYear!
    );
  }

  // Sort by a combination of rating and sentiment score
  return filteredMovies
    .sort((a, b) => {
      const scoreA = (a.rating * 0.7) + (a.sentimentScore * 3 * 0.3);
      const scoreB = (b.rating * 0.7) + (b.sentimentScore * 3 * 0.3);
      return scoreB - scoreA;
    })
    .slice(0, count);
};

// Get trending movies based on sentiment and rating
export const getTrendingMovies = (count: number = 6): Movie[] => {
  return movies
    .sort((a, b) => {
      // Weight: 50% rating, 30% sentiment, 20% review count
      const scoreA = (a.rating * 0.5) + (a.sentimentScore * 10 * 0.3) + (Math.log(a.reviewCount) * 0.2);
      const scoreB = (b.rating * 0.5) + (b.sentimentScore * 10 * 0.3) + (Math.log(b.reviewCount) * 0.2);
      return scoreB - scoreA;
    })
    .slice(0, count);
};

// Analyze sentiment distribution
export const getSentimentAnalysis = (movieList: Movie[]) => {
  const total = movieList.length;
  const veryPositive = movieList.filter(m => m.sentimentScore >= 0.8).length;
  const positive = movieList.filter(m => m.sentimentScore >= 0.6 && m.sentimentScore < 0.8).length;
  const mixed = movieList.filter(m => m.sentimentScore < 0.6).length;

  return {
    veryPositive: {
      count: veryPositive,
      percentage: Math.round((veryPositive / total) * 100)
    },
    positive: {
      count: positive,
      percentage: Math.round((positive / total) * 100)
    },
    mixed: {
      count: mixed,
      percentage: Math.round((mixed / total) * 100)
    },
    averageScore: movieList.reduce((sum, movie) => sum + movie.sentimentScore, 0) / total
  };
};