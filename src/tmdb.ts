export type Movie = {
  id: number; title: string; overview: string; poster_path: string | null; backdrop_path: string | null
  release_date: string; vote_average: number; genre_ids: number[]; original_language: string
}

export type MovieDetails = Movie & {
  runtime: number | null
  genres: { id: number; name: string }[]
  tagline: string
  status: string
}

type ListResponse = { results: Movie[] }
type Video = { id: string; key: string; name: string; site: string; type: string; official: boolean }
type VideosResponse = { results: Video[] }
type CreditsResponse = {
  cast: { id: number; name: string; character: string; profile_path: string | null; order: number }[]
  crew: { id: number; name: string; job: string }[]
}
type WatchProvider = { provider_id: number; provider_name: string; logo_path: string | null }
type WatchProvidersResponse = {
  results: Record<string, { link?: string; flatrate?: WatchProvider[]; rent?: WatchProvider[]; buy?: WatchProvider[] }>
}
const baseUrl = 'https://api.themoviedb.org/3'
const apiKey = import.meta.env.VITE_TMDB_API_KEY

async function request<T>(path: string, params: Record<string, string> = {}): Promise<T> {
  if (!apiKey) throw new Error('TMDB API key belum dikonfigurasi.')
  const query = new URLSearchParams({ api_key: apiKey, language: 'en-US', ...params })
  const response = await fetch(`${baseUrl}${path}?${query}`)
  if (!response.ok) throw new Error(response.status === 429 ? 'TMDB sedang membatasi request. Coba lagi sesaat.' : 'Film tidak dapat dimuat.')
  return response.json() as Promise<T>
}

export const getTrending = () => request<ListResponse>('/trending/movie/week')
export const getPopular = () => request<ListResponse>('/movie/popular')
export const getUpcoming = () => request<ListResponse>('/movie/upcoming')
export const getMovieDetails = (id: number) => request<MovieDetails>(`/movie/${id}`)
export const getRecommendations = (id: number) => request<ListResponse>(`/movie/${id}/recommendations`)
export const getMovieVideos = (id: number) => request<VideosResponse>(`/movie/${id}/videos`)
export const getMovieCredits = (id: number) => request<CreditsResponse>(`/movie/${id}/credits`)
export const getWatchProviders = (id: number) => request<WatchProvidersResponse>(`/movie/${id}/watch/providers`)
export const searchMovies = (query: string) => request<ListResponse>('/search/movie', { query, include_adult: 'false' })
export const image = (path: string | null, size = 'w780') => path ? `https://image.tmdb.org/t/p/${size}${path}` : ''
