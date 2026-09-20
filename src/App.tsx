import { FormEvent, useEffect, useRef, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { gsap } from 'gsap'
import { getPopular, getTrending, getUpcoming, image, searchMovies, type Movie } from './tmdb'

const genres: Record<number, string> = { 28: 'Action', 12: 'Adventure', 16: 'Animation', 35: 'Comedy', 80: 'Crime', 18: 'Drama', 27: 'Horror', 878: 'Sci-Fi', 53: 'Thriller' }
const year = (date: string) => date?.slice(0, 4) || '—'

function Poster({ movie, priority = false }: { movie: Movie; priority?: boolean }) {
  const poster = image(movie.poster_path, 'w500')
  return <article className="poster-shell reveal-card">
    <div className="poster-core">
      {poster ? <img src={poster} alt={`Poster ${movie.title}`} loading={priority ? 'eager' : 'lazy'} /> : <div className="no-poster">No artwork</div>}
      <div className="poster-overlay"><span>{year(movie.release_date)}</span><strong>{movie.vote_average.toFixed(1)}</strong></div>
      <div className="poster-copy"><p>{movie.genre_ids.map(id => genres[id]).find(Boolean) || 'Feature film'}</p><h3>{movie.title}</h3></div>
    </div>
  </article>
}

function Rail({ title, index, movies }: { title: string; index: string; movies?: Movie[] }) {
  if (!movies?.length) return null
  return <section className="rail" aria-label={title}>
    <div className="rail-heading"><span>{index}</span><h2>{title}</h2><button aria-label={`Browse ${title}`}>View all <i>↗</i></button></div>
    <div className="rail-track">{movies.slice(0, 10).map((movie, itemIndex) => <Poster key={movie.id} movie={movie} priority={itemIndex < 3} />)}</div>
  </section>
}

export default function App() {
  const root = useRef<HTMLElement>(null)
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState('')
  const trending = useQuery({ queryKey: ['movies', 'trending'], queryFn: getTrending })
  const popular = useQuery({ queryKey: ['movies', 'popular'], queryFn: getPopular })
  const upcoming = useQuery({ queryKey: ['movies', 'upcoming'], queryFn: getUpcoming })
  const results = useQuery({ queryKey: ['movies', 'search', submitted], queryFn: () => searchMovies(submitted), enabled: submitted.length > 1 })
  const featured = trending.data?.results[0]

  useEffect(() => {
    const mm = gsap.matchMedia()
    mm.add({ reduce: '(prefers-reduced-motion: reduce)', motion: '(prefers-reduced-motion: no-preference)' }, context => {
      if (context.conditions?.reduce) return
      gsap.fromTo('.nav-island', { y: -28, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9, ease: 'power3.out' })
      gsap.fromTo('.hero-content > *', { y: 34, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: 1.05, stagger: .12, ease: 'power3.out', delay: .16 })
      gsap.fromTo('.reveal-card', { y: 42, autoAlpha: 0 }, { y: 0, autoAlpha: 1, duration: .9, stagger: .055, ease: 'power3.out', delay: .55 })
    }, root)
    return () => mm.revert()
  }, [trending.isSuccess, popular.isSuccess, upcoming.isSuccess, submitted])

  function onSearch(event: FormEvent) { event.preventDefault(); setSubmitted(query.trim()) }
  const isLoading = trending.isLoading || popular.isLoading || upcoming.isLoading

  return <main ref={root}>
    <div className="grain" />
    <nav className="nav-island"><a className="wordmark" href="#top">REEL<span>HOUSE</span></a><div className="nav-links"><a href="#discover">Discover</a><a href="#upcoming">Upcoming</a><a href="#about">About</a></div><button className="menu-button" aria-label="Open navigation"><b></b><b></b></button></nav>
    <section id="top" className="hero" style={featured?.backdrop_path ? { backgroundImage: `url(${image(featured.backdrop_path, 'original')})` } : undefined}>
      <div className="hero-shade" /><div className="hero-content">
        <p className="eyebrow">A considered film index <em>•</em> {featured ? `now showing ${year(featured.release_date)}` : 'loading cinema'}</p>
        <h1>{featured?.title || 'The stories worth your attention.'}</h1>
        <p className="hero-description">{featured?.overview || 'A handpicked stream of the world’s most compelling new cinema, updated weekly.'}</p>
        <div className="hero-actions"><a href="#discover" className="cta">Explore selection <span>↘</span></a><button className="text-action">Watch trailer <i>▶</i></button></div>
      </div>
      <div className="hero-meta"><span>01</span><div /><p>Curated from<br />the moving image</p></div>
    </section>
    <section id="discover" className="content">
      <div className="intro"><p className="eyebrow">The current edit</p><h2>Cinema for the curious<br /><i>and the restless.</i></h2><p>Browse what is moving culture forward. Data is supplied live by TMDB, intelligently cached to keep the experience calm and quick.</p></div>
      <form className="search-shell" onSubmit={onSearch}><div className="search-core"><label htmlFor="movie-search">Find a film</label><input id="movie-search" value={query} onChange={e => setQuery(e.target.value)} placeholder="Title, director, or a feeling…" /><button type="submit">Search <span>↗</span></button></div></form>
      {submitted && <section className="search-results"><div className="rail-heading"><span>00</span><h2>Results for “{submitted}”</h2><button onClick={() => { setQuery(''); setSubmitted('') }}>Clear <i>×</i></button></div>{results.isLoading ? <p className="status">Looking through the archive…</p> : <div className="result-grid">{results.data?.results.slice(0, 8).map(movie => <Poster key={movie.id} movie={movie} />) || <p className="status">No matching titles yet.</p>}</div>}</section>}
      {isLoading ? <p className="status">Curating the latest releases…</p> : <><Rail index="01" title="In the conversation" movies={trending.data?.results} /><Rail index="02" title="The essential popular" movies={popular.data?.results} /><Rail index="03" title="Coming into focus" movies={upcoming.data?.results} /></>}
    </section>
    <footer id="about"><a className="wordmark" href="#top">REEL<span>HOUSE</span></a><p>A living index for the cinema obsessed.</p><small>Data & imagery: TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</small></footer>
  </main>
}
