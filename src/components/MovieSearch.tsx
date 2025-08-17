import React, { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { searchMovies, type Movie } from '@/data/movies';
import { cn } from '@/lib/utils';

interface MovieSearchProps {
  onMovieSelect: (movie: Movie) => void;
  onSearch: (query: string) => void;
  className?: string;
}

export const MovieSearch: React.FC<MovieSearchProps> = ({
  onMovieSelect,
  onSearch,
  className
}) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<Movie[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length > 1) {
      const results = searchMovies(query).slice(0, 8);
      setSuggestions(results);
      setShowSuggestions(true);
      setSelectedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [query]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleMovieSelect = (movie: Movie) => {
    setQuery(movie.title);
    setShowSuggestions(false);
    onMovieSelect(movie);
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
      setShowSuggestions(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : 0
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setSelectedIndex(prev => 
          prev > 0 ? prev - 1 : suggestions.length - 1
        );
        break;
      case 'Enter':
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleMovieSelect(suggestions[selectedIndex]);
        } else {
          handleSearch();
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setSelectedIndex(-1);
        break;
    }
  };

  const getSentimentColor = (score: number) => {
    if (score >= 0.8) return 'text-cinema-green';
    if (score >= 0.6) return 'text-cinema-gold';
    return 'text-cinema-accent';
  };

  return (
    <div className={cn("relative w-full max-w-2xl", className)}>
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
        <Input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => query.length > 1 && setShowSuggestions(true)}
          placeholder="Search for movies, directors, or actors..."
          className="pl-12 pr-20 h-14 text-lg bg-cinema-card border-cinema-accent/20 focus:border-cinema-accent transition-colors"
        />
        <Button
          onClick={handleSearch}
          variant="default"
          size="sm"
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-cinema-accent hover:bg-cinema-accent-hover"
        >
          Search
        </Button>
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <div
          ref={suggestionsRef}
          className="absolute top-full left-0 right-0 mt-2 bg-cinema-card border border-cinema-accent/20 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto"
        >
          {suggestions.map((movie, index) => (
            <div
              key={movie.id}
              onClick={() => handleMovieSelect(movie)}
              className={cn(
                "flex items-center gap-4 p-4 cursor-pointer transition-colors",
                index === selectedIndex 
                  ? "bg-cinema-accent/20" 
                  : "hover:bg-cinema-accent/10"
              )}
            >
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-12 h-16 object-cover rounded"
                onError={(e) => {
                  e.currentTarget.src = 'https://images.unsplash.com/photo-1489599162367-6a934d0f1960?w=48&h=64&fit=crop';
                }}
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-semibold text-foreground truncate">
                  {movie.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {movie.year} • {movie.director}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-cinema-gold">
                    ★ {movie.rating}
                  </span>
                  <span className={cn("text-xs", getSentimentColor(movie.sentimentScore))}>
                    {movie.sentimentScore >= 0.8 ? '😊 Very Positive' :
                     movie.sentimentScore >= 0.6 ? '😐 Positive' : '😔 Mixed'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};