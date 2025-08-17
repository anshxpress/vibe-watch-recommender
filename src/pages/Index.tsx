import React, { useState, useEffect } from 'react';
import { HeroSection } from '@/components/HeroSection';
import { TrendingSection, PersonalizedSection, SimilarMoviesSection } from '@/components/RecommendationSection';
import { SentimentDashboard } from '@/components/SentimentDashboard';
import { type Movie, movies, searchMovies } from '@/data/movies';
import { 
  getTrendingMovies, 
  getRecommendations, 
  getRecommendationsByPreferences 
} from '@/utils/recommendationEngine';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [recommendations, setRecommendations] = useState<Movie[]>([]);
  const [trending, setTrending] = useState<Movie[]>([]);
  const [personalized, setPersonalized] = useState<Movie[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();

  // Initialize trending movies on component mount
  useEffect(() => {
    const trendingMovies = getTrendingMovies(8);
    setTrending(trendingMovies);

    // Set initial personalized recommendations based on high-rated movies
    const initialPersonalized = getRecommendationsByPreferences({
      minRating: 8.5
    }, 6);
    setPersonalized(initialPersonalized);
  }, []);

  const handleMovieSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    setSearchQuery('');
    setSearchResults([]);
    
    // Generate recommendations based on selected movie
    const similarMovies = getRecommendations(movie, 6);
    setRecommendations(similarMovies);

    // Update personalized recommendations based on genre preferences
    const genrePreferences = getRecommendationsByPreferences({
      genres: movie.genre,
      minRating: 7.0
    }, 6).filter(m => m.id !== movie.id);
    setPersonalized(genrePreferences);

    toast({
      title: "Movie Selected!",
      description: `Finding recommendations based on "${movie.title}"`,
    });

    // Scroll to recommendations
    setTimeout(() => {
      const element = document.getElementById('recommendations');
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const results = searchMovies(query);
      setSearchResults(results);
      
      if (results.length === 0) {
        toast({
          title: "No results found",
          description: `No movies found for "${query}". Try a different search term.`,
          variant: "destructive",
        });
      } else {
        toast({
          title: "Search Results",
          description: `Found ${results.length} movies matching "${query}"`,
        });
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleTrendingMovieClick = (movie: Movie) => {
    handleMovieSelect(movie);
  };

  const moviesForSentiment = selectedMovie 
    ? [selectedMovie, ...recommendations]
    : searchResults.length > 0 
    ? searchResults 
    : trending;

  return (
    <div className="min-h-screen bg-cinema-bg">
      {/* Hero Section */}
      <HeroSection 
        onMovieSelect={handleMovieSelect}
        onSearch={handleSearch}
      />

      {/* Search Results */}
      {searchResults.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground mb-8">
              Search Results for "{searchQuery}"
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {searchResults.map((movie) => (
                <div key={movie.id} className="cursor-pointer" onClick={() => handleMovieSelect(movie)}>
                  <div className="bg-cinema-card rounded-lg overflow-hidden hover:scale-105 transition-transform duration-300 border border-cinema-accent/20 hover:border-cinema-accent/40">
                    <img
                      src={movie.poster}
                      alt={movie.title}
                      className="w-full h-64 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = 'https://images.unsplash.com/photo-1489599162367-6a934d0f1960?w=400&h=600&fit=crop';
                      }}
                    />
                    <div className="p-4">
                      <h3 className="font-bold text-foreground mb-2">{movie.title}</h3>
                      <p className="text-sm text-muted-foreground">{movie.year} • ★ {movie.rating}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Recommendations Section */}
      <div id="recommendations">
        {selectedMovie && recommendations.length > 0 && (
          <SimilarMoviesSection
            movies={recommendations}
            basedOn={selectedMovie.title}
            onMovieClick={handleMovieSelect}
          />
        )}

        {personalized.length > 0 && (
          <PersonalizedSection
            movies={personalized}
            basedOn={selectedMovie?.title}
            onMovieClick={handleMovieSelect}
          />
        )}
      </div>

      {/* Trending Section */}
      <TrendingSection
        movies={trending}
        onMovieClick={handleTrendingMovieClick}
      />

      {/* Sentiment Analysis Dashboard */}
      <SentimentDashboard
        movies={moviesForSentiment}
        title={selectedMovie 
          ? `Sentiment Analysis - ${selectedMovie.title} & Similar Movies`
          : searchResults.length > 0
          ? `Sentiment Analysis - "${searchQuery}" Results`
          : "Sentiment Analysis - Trending Movies"
        }
        className="bg-cinema-card/10"
      />

      {/* Footer */}
      <footer className="bg-cinema-card border-t border-cinema-accent/20 py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            CineMatch - Discover movies with AI-powered recommendations
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Powered by sentiment analysis of millions of movie reviews
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;