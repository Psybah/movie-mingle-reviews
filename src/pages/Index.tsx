import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { MovieDialog } from "@/components/MovieDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";
import { RealtimePostgresChangesPayload } from "@supabase/supabase-js";

interface Movie {
  id: number;
  title: string;
  year: string;
  poster_path: string;
  rating: number;
  plot: string;
  director: string;
  cast_members: string[];
}

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { toast } = useToast();
  
  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('search-movies', {
        body: { query }
      });

      if (error) throw error;
      setMovies(data || []);
    } catch (error) {
      console.error('Search error:', error);
      toast({
        title: "Error",
        description: "Failed to search movies. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Set up real-time subscription
  useEffect(() => {
    const channel = supabase
      .channel('schema-db-changes')
      .on<Movie>(
        'postgres_changes' as const,
        {
          event: '*',
          schema: 'public',
          table: 'movies'
        },
        (payload: RealtimePostgresChangesPayload<Movie>) => {
          setMovies(current => {
            const updated = [...current];
            const index = updated.findIndex(movie => movie.id === (payload.new as Movie).id);
            if (index !== -1) {
              updated[index] = payload.new as Movie;
            } else {
              updated.push(payload.new as Movie);
            }
            return updated;
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  useEffect(() => {
    if (debouncedSearchQuery) {
      handleSearch(debouncedSearchQuery);
    }
  }, [debouncedSearchQuery]);

  return (
    <div className="min-h-screen p-6 space-y-8">
      <div className="space-y-4 text-center">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Movie Database
        </h1>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Discover and explore your favorite movies. Search through our collection and share your thoughts.
        </p>
        <SearchBar onSearch={handleSearch} />
      </div>

      {isLoading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              poster={movie.poster_path}
              rating={movie.rating || 0}
              onClick={() => {
                setSelectedMovie(movie);
                setDialogOpen(true);
              }}
            />
          ))}
        </div>
      )}

      {selectedMovie && (
        <MovieDialog
          movie={{
            title: selectedMovie.title,
            year: selectedMovie.year,
            poster: selectedMovie.poster_path,
            rating: selectedMovie.rating || 0,
            plot: selectedMovie.plot || '',
            director: selectedMovie.director || '',
            cast: selectedMovie.cast_members || []
          }}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
        />
      )}
    </div>
  );
};

export default Index;