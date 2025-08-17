import React from 'react';
import { Star, Clock, Users } from 'lucide-react';
import { type Movie } from '@/data/movies';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface MovieCardProps {
  movie: Movie;
  onClick?: (movie: Movie) => void;
  className?: string;
  showDetails?: boolean;
}

export const MovieCard: React.FC<MovieCardProps> = ({
  movie,
  onClick,
  className,
  showDetails = true
}) => {
  const getSentimentColor = (score: number) => {
    if (score >= 0.8) return 'bg-cinema-green/20 text-cinema-green border-cinema-green/30';
    if (score >= 0.6) return 'bg-cinema-gold/20 text-cinema-gold border-cinema-gold/30';
    return 'bg-cinema-accent/20 text-cinema-accent border-cinema-accent/30';
  };

  const getSentimentText = (score: number) => {
    if (score >= 0.8) return 'Very Positive';
    if (score >= 0.6) return 'Positive';
    return 'Mixed';
  };

  const formatReviewCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}M`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}K`;
    return count.toString();
  };

  return (
    <Card
      className={cn(
        "group cursor-pointer overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg bg-cinema-card border-cinema-accent/20 hover:border-cinema-accent/40",
        className
      )}
      onClick={() => onClick?.(movie)}
    >
      <div className="relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 sm:h-80 object-cover transition-transform duration-300 group-hover:scale-110"
          onError={(e) => {
            e.currentTarget.src = 'https://images.unsplash.com/photo-1489599162367-6a934d0f1960?w=400&h=600&fit=crop';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm rounded-full px-2 py-1 flex items-center gap-1">
          <Star className="h-3 w-3 text-cinema-gold fill-current" />
          <span className="text-xs text-white font-medium">{movie.rating}</span>
        </div>

        {/* Sentiment badge */}
        <div className={cn(
          "absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-medium border backdrop-blur-sm",
          getSentimentColor(movie.sentimentScore)
        )}>
          {getSentimentText(movie.sentimentScore)}
        </div>
      </div>

      {showDetails && (
        <div className="p-4">
          <h3 className="font-bold text-lg text-foreground mb-2 line-clamp-1">
            {movie.title}
          </h3>
          
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <span>{movie.year}</span>
            <span>•</span>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              <span>{movie.runtime}min</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-1 mb-3">
            {movie.genre.slice(0, 2).map((genre) => (
              <Badge
                key={genre}
                variant="secondary"
                className="text-xs bg-cinema-accent/20 text-cinema-accent border-cinema-accent/30"
              >
                {genre}
              </Badge>
            ))}
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2 mb-3">
            {movie.plot}
          </p>

          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>by {movie.director}</span>
            <div className="flex items-center gap-1">
              <Users className="h-3 w-3" />
              <span>{formatReviewCount(movie.reviewCount)}</span>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};