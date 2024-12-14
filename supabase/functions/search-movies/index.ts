import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { query } = await req.json()
    const TMDB_API_KEY = Deno.env.get('TMDB_API_KEY')
    
    if (!TMDB_API_KEY) {
      throw new Error('TMDB API key not configured')
    }

    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${TMDB_API_KEY}&query=${encodeURIComponent(query)}`,
      { method: 'GET' }
    )

    const data = await response.json()

    // Transform TMDB response to match our Movie interface
    const movies = data.results.map((movie: any) => ({
      id: movie.id,
      title: movie.title,
      year: movie.release_date?.split('-')[0] || 'N/A',
      poster_path: movie.poster_path 
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : '/placeholder.svg',
      rating: movie.vote_average,
      plot: movie.overview,
      director: 'N/A', // TMDB search endpoint doesn't include crew info
      cast_members: []
    }))

    return new Response(
      JSON.stringify(movies),
      { 
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        } 
      }
    )
  } catch (error) {
    console.error('Error:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      { 
        status: 500,
        headers: { 
          'Content-Type': 'application/json',
          ...corsHeaders
        }
      }
    )
  }
})