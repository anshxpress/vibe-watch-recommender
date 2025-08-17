export interface Movie {
  id: number;
  title: string;
  year: number;
  genre: string[];
  director: string;
  actors: string[];
  plot: string;
  poster: string;
  rating: number;
  sentimentScore: number; // -1 to 1, where 1 is very positive
  reviewCount: number;
  runtime: number;
}

export const movies: Movie[] = [
  {
    id: 1,
    title: "The Shawshank Redemption",
    year: 1994,
    genre: ["Drama"],
    director: "Frank Darabont",
    actors: ["Tim Robbins", "Morgan Freeman", "Bob Gunton"],
    plot: "Two imprisoned men bond over years, finding solace and eventual redemption through acts of common decency.",
    poster: "https://images.unsplash.com/photo-1489599162367-6a934d0f1960?w=400&h=600&fit=crop",
    rating: 9.3,
    sentimentScore: 0.9,
    reviewCount: 2500000,
    runtime: 142
  },
  {
    id: 2,
    title: "The Godfather",
    year: 1972,
    genre: ["Crime", "Drama"],
    director: "Francis Ford Coppola",
    actors: ["Marlon Brando", "Al Pacino", "James Caan"],
    plot: "The aging patriarch of an organized crime dynasty transfers control to his reluctant son.",
    poster: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
    rating: 9.2,
    sentimentScore: 0.85,
    reviewCount: 1800000,
    runtime: 175
  },
  {
    id: 3,
    title: "The Dark Knight",
    year: 2008,
    genre: ["Action", "Crime", "Drama"],
    director: "Christopher Nolan",
    actors: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    plot: "Batman faces the Joker, a criminal mastermind who seeks to undermine Batman's influence and create chaos.",
    poster: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=600&fit=crop",
    rating: 9.0,
    sentimentScore: 0.88,
    reviewCount: 2300000,
    runtime: 152
  },
  {
    id: 4,
    title: "Pulp Fiction",
    year: 1994,
    genre: ["Crime", "Drama"],
    director: "Quentin Tarantino",
    actors: ["John Travolta", "Uma Thurman", "Samuel L. Jackson"],
    plot: "The lives of two mob hitmen, a boxer, and others intertwine in four tales of violence and redemption.",
    poster: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
    rating: 8.9,
    sentimentScore: 0.82,
    reviewCount: 2000000,
    runtime: 154
  },
  {
    id: 5,
    title: "Inception",
    year: 2010,
    genre: ["Action", "Sci-Fi", "Thriller"],
    director: "Christopher Nolan",
    actors: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    plot: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea.",
    poster: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
    rating: 8.8,
    sentimentScore: 0.86,
    reviewCount: 2200000,
    runtime: 148
  },
  {
    id: 6,
    title: "Forrest Gump",
    year: 1994,
    genre: ["Drama", "Romance"],
    director: "Robert Zemeckis",
    actors: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    plot: "The presidencies of Kennedy and Johnson through the events of Vietnam, Watergate and other history unfold through the perspective of an Alabama man.",
    poster: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    rating: 8.8,
    sentimentScore: 0.91,
    reviewCount: 1900000,
    runtime: 142
  },
  {
    id: 7,
    title: "The Matrix",
    year: 1999,
    genre: ["Action", "Sci-Fi"],
    director: "The Wachowskis",
    actors: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    plot: "A computer programmer discovers that reality as he knows it is a simulation and joins a rebellion to free humanity.",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=400&h=600&fit=crop",
    rating: 8.7,
    sentimentScore: 0.84,
    reviewCount: 1700000,
    runtime: 136
  },
  {
    id: 8,
    title: "Goodfellas",
    year: 1990,
    genre: ["Biography", "Crime", "Drama"],
    director: "Martin Scorsese",
    actors: ["Robert De Niro", "Ray Liotta", "Joe Pesci"],
    plot: "The story of Henry Hill and his life in the mob, covering his relationship with his wife Karen Hill and his mob partners.",
    poster: "https://images.unsplash.com/photo-1564419320461-6870880221ad?w=400&h=600&fit=crop",
    rating: 8.7,
    sentimentScore: 0.87,
    reviewCount: 1100000,
    runtime: 146
  },
  {
    id: 9,
    title: "Interstellar",
    year: 2014,
    genre: ["Adventure", "Drama", "Sci-Fi"],
    director: "Christopher Nolan",
    actors: ["Matthew McConaughey", "Anne Hathaway", "Jessica Chastain"],
    plot: "A team of explorers travel through a wormhole in space in an attempt to ensure humanity's survival.",
    poster: "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?w=400&h=600&fit=crop",
    rating: 8.6,
    sentimentScore: 0.79,
    reviewCount: 1600000,
    runtime: 169
  },
  {
    id: 10,
    title: "The Departed",
    year: 2006,
    genre: ["Crime", "Drama", "Thriller"],
    director: "Martin Scorsese",
    actors: ["Leonardo DiCaprio", "Matt Damon", "Jack Nicholson"],
    plot: "An undercover cop and a police informant play a cat and mouse game with each other as they attempt to find out each other's identity.",
    poster: "https://images.unsplash.com/photo-1574267432553-4b4628081c31?w=400&h=600&fit=crop",
    rating: 8.5,
    sentimentScore: 0.83,
    reviewCount: 1300000,
    runtime: 151
  }
];

export const getMoviesByGenre = (genre: string): Movie[] => {
  return movies.filter(movie => 
    movie.genre.some(g => g.toLowerCase().includes(genre.toLowerCase()))
  );
};

export const searchMovies = (query: string): Movie[] => {
  const lowerQuery = query.toLowerCase();
  return movies.filter(movie =>
    movie.title.toLowerCase().includes(lowerQuery) ||
    movie.director.toLowerCase().includes(lowerQuery) ||
    movie.actors.some(actor => actor.toLowerCase().includes(lowerQuery)) ||
    movie.genre.some(genre => genre.toLowerCase().includes(lowerQuery))
  );
};