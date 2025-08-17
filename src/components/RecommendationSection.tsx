import React from 'react';
import { Sparkles, TrendingUp, User } from 'lucide-react';
import { MovieCard } from './MovieCard';
import { type Movie } from '@/data/movies';
import { cn } from '@/lib/utils';

interface RecommendationSectionProps {
  title: string;
  movies: Movie[];
  icon?: React.ReactNode;
  onMovieClick?: (movie: Movie) => void;
  className?: string;
  subtitle?: string;
}

export const RecommendationSection: React.FC<RecommendationSectionProps> = ({
  title,
  movies,
  icon,
  onMovieClick,
  className,
  subtitle
}) => {
  if (movies.length === 0) return null;

  return (
    <section className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          {icon && <div className="text-cinema-accent">{icon}</div>}
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        </div>
        
        {subtitle && (
          <p className="text-muted-foreground mb-8 max-w-2xl">{subtitle}</p>
        )}
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onClick={onMovieClick}
              className="h-full"
            />
          ))}
        </div>
      </div>
    </section>
  );
};

// Preset components for different types of recommendations
export const TrendingSection: React.FC<{
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
}> = ({ movies, onMovieClick }) => (
  <RecommendationSection
    title="Trending Now"
    subtitle="Most popular movies based on ratings and positive sentiment"
    movies={movies}
    icon={<TrendingUp className="h-8 w-8" />}
    onMovieClick={onMovieClick}
    className="bg-cinema-bg"
  />
);

export const PersonalizedSection: React.FC<{
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
  basedOn?: string;
}> = ({ movies, onMovieClick, basedOn }) => (
  <RecommendationSection
    title="Recommended for You"
    subtitle={basedOn ? `Based on "${basedOn}" and your preferences` : "Personalized recommendations based on your taste"}
    movies={movies}
    icon={<User className="h-8 w-8" />}
    onMovieClick={onMovieClick}
  />
);

export const SimilarMoviesSection: React.FC<{
  movies: Movie[];
  onMovieClick?: (movie: Movie) => void;
  basedOn: string;
}> = ({ movies, onMovieClick, basedOn }) => (
  <RecommendationSection
    title="Similar Movies"
    subtitle={`Because you're interested in "${basedOn}"`}
    movies={movies}
    icon={<Sparkles className="h-8 w-8" />}
    onMovieClick={onMovieClick}
    className="bg-cinema-card/20"
  />
);