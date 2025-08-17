import React from 'react';
import { BarChart3, Heart, Meh, Frown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { getSentimentAnalysis } from '@/utils/recommendationEngine';
import { type Movie } from '@/data/movies';
import { cn } from '@/lib/utils';

interface SentimentDashboardProps {
  movies: Movie[];
  title?: string;
  className?: string;
}

export const SentimentDashboard: React.FC<SentimentDashboardProps> = ({
  movies,
  title = "Sentiment Analysis",
  className
}) => {
  const analysis = getSentimentAnalysis(movies);

  const sentimentData = [
    {
      label: 'Very Positive',
      count: analysis.veryPositive.count,
      percentage: analysis.veryPositive.percentage,
      color: 'bg-cinema-green',
      textColor: 'text-cinema-green',
      icon: Heart
    },
    {
      label: 'Positive',
      count: analysis.positive.count,
      percentage: analysis.positive.percentage,
      color: 'bg-cinema-gold',
      textColor: 'text-cinema-gold',
      icon: TrendingUp
    },
    {
      label: 'Mixed',
      count: analysis.mixed.count,
      percentage: analysis.mixed.percentage,
      color: 'bg-cinema-accent',
      textColor: 'text-cinema-accent',
      icon: Meh
    }
  ];

  const getOverallSentiment = () => {
    if (analysis.averageScore >= 0.8) return { text: 'Excellent', color: 'text-cinema-green' };
    if (analysis.averageScore >= 0.7) return { text: 'Very Good', color: 'text-cinema-gold' };
    if (analysis.averageScore >= 0.6) return { text: 'Good', color: 'text-cinema-gold' };
    return { text: 'Mixed', color: 'text-cinema-accent' };
  };

  const overall = getOverallSentiment();

  return (
    <div className={cn("py-12", className)}>
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <BarChart3 className="h-8 w-8 text-cinema-accent" />
          <h2 className="text-3xl font-bold text-foreground">{title}</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Overall Score */}
          <Card className="bg-cinema-card border-cinema-accent/20">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Overall Sentiment</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold mb-2">
                  <span className={overall.color}>
                    {(analysis.averageScore * 100).toFixed(0)}%
                  </span>
                </div>
                <p className={cn("text-lg font-semibold", overall.color)}>
                  {overall.text}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  Based on {movies.length} movies
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Sentiment Breakdown */}
          <Card className="lg:col-span-2 bg-cinema-card border-cinema-accent/20">
            <CardHeader>
              <CardTitle className="text-lg text-foreground">Sentiment Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {sentimentData.map((item) => {
                  const Icon = item.icon;
                  return (
                    <div key={item.label} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Icon className={cn("h-4 w-4", item.textColor)} />
                          <span className="text-sm font-medium text-foreground">
                            {item.label}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">
                            {item.count} movies
                          </span>
                          <span className={cn("text-sm font-semibold", item.textColor)}>
                            {item.percentage}%
                          </span>
                        </div>
                      </div>
                      <Progress
                        value={item.percentage}
                        className="h-2 bg-cinema-bg"
                        indicatorClassName={item.color}
                      />
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Key Insights */}
        <Card className="mt-6 bg-cinema-card border-cinema-accent/20">
          <CardHeader>
            <CardTitle className="text-lg text-foreground">Key Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div className="text-center p-4 rounded-lg bg-cinema-bg">
                <div className="text-2xl font-bold text-cinema-green mb-1">
                  {Math.max(...movies.map(m => m.rating)).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Highest Rating</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-cinema-bg">
                <div className="text-2xl font-bold text-cinema-gold mb-1">
                  {(movies.reduce((sum, m) => sum + m.rating, 0) / movies.length).toFixed(1)}
                </div>
                <p className="text-sm text-muted-foreground">Average Rating</p>
              </div>
              
              <div className="text-center p-4 rounded-lg bg-cinema-bg">
                <div className="text-2xl font-bold text-cinema-accent mb-1">
                  {Math.max(...movies.map(m => m.sentimentScore * 100)).toFixed(0)}%
                </div>
                <p className="text-sm text-muted-foreground">Best Sentiment</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};