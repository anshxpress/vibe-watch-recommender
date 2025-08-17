import React from 'react';
import { Play, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MovieSearch } from './MovieSearch';
import { type Movie } from '@/data/movies';
import heroImage from '@/assets/hero-cinema.jpg';

interface HeroSectionProps {
  onMovieSelect: (movie: Movie) => void;
  onSearch: (query: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onMovieSelect,
  onSearch
}) => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cinema-bg/80 via-cinema-bg/60 to-cinema-bg" />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <div className="flex items-center justify-center gap-2 mb-6">
          <Play className="h-8 w-8 text-cinema-accent" />
          <h1 className="text-4xl sm:text-6xl font-bold text-foreground">
            CineMatch
          </h1>
        </div>
        
        <p className="text-xl sm:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Discover your next favorite movie with AI-powered recommendations and sentiment analysis
        </p>
        
        <div className="mb-8">
          <MovieSearch
            onMovieSelect={onMovieSelect}
            onSearch={onSearch}
            className="mx-auto"
          />
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <div className="flex items-center gap-2 text-cinema-gold">
            <TrendingUp className="h-5 w-5" />
            <span className="text-sm font-medium">
              Powered by sentiment analysis of millions of reviews
            </span>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-2 h-2 bg-cinema-accent rounded-full animate-pulse" />
      <div className="absolute top-40 right-20 w-3 h-3 bg-cinema-gold rounded-full animate-pulse delay-700" />
      <div className="absolute bottom-20 left-20 w-2 h-2 bg-cinema-green rounded-full animate-pulse delay-1000" />
    </section>
  );
};