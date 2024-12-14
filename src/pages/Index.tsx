import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { MovieCard } from "@/components/MovieCard";
import { MovieDialog } from "@/components/MovieDialog";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useDebounce } from "@/hooks/use-debounce";

const Index = () => {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const { toast } = useToast();
  
  // Add debounce hook for search
  const useDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState(value);
  
    useEffect(() => {
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);
  
      return () => {
        clearTimeout(handler);
      };
    }, [value, delay]);
  
    return debouncedValue;
  };

  const handleSearch = async (query: string) => {
    if (!query.trim()) {
      setMovies([]);
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/search-movies`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify({ query }),
        }
      );

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const data = await response.json();
      setMovies(data);
    } catch (error) {
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
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'movies'
        },
        (payload) => {
          setMovies(current => {
            const updated = [...current];
            const index = updated.findIndex(movie => movie.id === payload.new.id);
            if (index !== -1) {
              updated[index] = payload.new;
            } else {
              updated.push(payload.new);
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

  const debouncedSearch = useDebounce(query, 500);

  useEffect(() => {
    if (debouncedSearch) {
      handleSearch(debouncedSearch);
    }
  }, [debouncedSearch]);

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
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard
              key={movie.id}
              title={movie.title}
              year={movie.year}
              poster={movie.poster_path}
              rating={movie.rating}
              onClick={() => {
                setSelectedMovie(movie);
                setDialogOpen(true);
              }}
            />
          ))}
        </div>
      )}

      <MovieDialog
        movie={selectedMovie}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
};

export default Index;