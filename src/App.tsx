import { FormEvent, useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { gsap } from "gsap";
import {
  discoverByGenre,
  getCollection,
  getLatest,
  getMovieCredits,
  getMovieDetails,
  getMovieImages,
  getMovieReviews,
  getMovieVideos,
  getNowPlaying,
  getPopular,
  getRecommendations,
  getReleaseDates,
  getTopRated,
  getTrending,
  getUpcoming,
  getWatchProviders,
  image,
  searchMovies,
  type Movie,
} from "./tmdb";

const genres: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  18: "Drama",
  27: "Horror",
  878: "Sci-Fi",
  53: "Thriller",
};
const year = (date: string) => date?.slice(0, 4) || "—";

function Poster({
  movie,
  priority = false,
  onSelect,
}: {
  movie: Movie;
  priority?: boolean;
  onSelect: (movie: Movie) => void;
}) {
  const poster = image(movie.poster_path, "w500");
  return (
    <button
      className="poster-shell reveal-card"
      onClick={() => onSelect(movie)}
      aria-label={`View details for ${movie.title}`}
    >
      <div className="poster-core">
        {poster ? (
          <img
            src={poster}
            alt={`Poster ${movie.title}`}
            loading={priority ? "eager" : "lazy"}
          />
        ) : (
          <div className="no-poster">No artwork</div>
        )}
        <div className="poster-overlay">
          <span>{year(movie.release_date)}</span>
          <strong>{movie.vote_average.toFixed(1)}</strong>
        </div>
        <div className="poster-copy">
          <p>
            {movie.genre_ids.map((id) => genres[id]).find(Boolean) ||
              "Feature film"}
          </p>
          <h3>{movie.title}</h3>
        </div>
      </div>
    </button>
  );
}

function Rail({
  title,
  index,
  movies,
  onSelect,
}: {
  title: string;
  index: string;
  movies?: Movie[];
  onSelect: (movie: Movie) => void;
}) {
  if (!movies?.length) return null;
  return (
    <section className="rail" aria-label={title}>
      <div className="rail-heading">
        <span>{index}</span>
        <h2>{title}</h2>
        <button aria-label={`Browse ${title}`}>
          View all <i>↗</i>
        </button>
      </div>
      <div className="rail-track">
        {movies.slice(0, 10).map((movie, itemIndex) => (
          <Poster
            key={movie.id}
            movie={movie}
            priority={itemIndex < 3}
            onSelect={onSelect}
          />
        ))}
      </div>
    </section>
  );
}

function DetailPage({
  movieId,
  onBack,
  onSelect,
  onTrailer,
}: {
  movieId: number;
  onBack: () => void;
  onSelect: (movie: Movie) => void;
  onTrailer: (movie: Movie) => void;
}) {
  const details = useQuery({
    queryKey: ["movie", movieId],
    queryFn: () => getMovieDetails(movieId),
  });
  const recommendations = useQuery({
    queryKey: ["movie", movieId, "recommendations"],
    queryFn: () => getRecommendations(movieId),
  });
  const credits = useQuery({
    queryKey: ["movie", movieId, "credits"],
    queryFn: () => getMovieCredits(movieId),
  });
  const watchProviders = useQuery({
    queryKey: ["movie", movieId, "watch-providers", "ID"],
    queryFn: () => getWatchProviders(movieId),
  });
  const reviews = useQuery({
    queryKey: ["movie", movieId, "reviews"],
    queryFn: () => getMovieReviews(movieId),
  });
  const gallery = useQuery({
    queryKey: ["movie", movieId, "images"],
    queryFn: () => getMovieImages(movieId),
  });
  const collection = useQuery({
    queryKey: ["collection", details.data?.belongs_to_collection?.id],
    queryFn: () => getCollection(details.data!.belongs_to_collection!.id),
    enabled: Boolean(details.data?.belongs_to_collection),
  });
  const releaseDates = useQuery({
    queryKey: ["movie", movieId, "release-dates"],
    queryFn: () => getReleaseDates(movieId),
  });
  const director = credits.data?.crew.find(
    (member) => member.job === "Director",
  );
  const availability = watchProviders.data?.results.ID;
  const localRelease =
    releaseDates.data?.results.find(
      (release) => release.iso_3166_1 === "ID",
    ) ??
    releaseDates.data?.results.find((release) => release.iso_3166_1 === "US");
  const certification = localRelease?.release_dates.find(
    (release) => release.certification,
  )?.certification;

  return (
    <main className="detail-page">
      <nav className="detail-nav">
        <button onClick={onBack}>Back to discovery</button>
        <a className="wordmark" href="#top" onClick={onBack}>
          REEL<span>HOUSE</span>
        </a>
      </nav>
      {details.isLoading ? (
        <p className="detail-status status">Opening the film file…</p>
      ) : details.data ? (
        <>
          <section
            className="detail-hero"
            style={
              details.data.backdrop_path
                ? {
                    backgroundImage: `url(${image(details.data.backdrop_path, "original")})`,
                  }
                : undefined
            }
          >
            <div className="detail-hero-shade" />
            <div className="detail-hero-copy">
              <p>
                {details.data.genres.map((genre) => genre.name).join(" / ") ||
                  "Feature film"}{" "}
                · {year(details.data.release_date)}
              </p>
              <h1>{details.data.title}</h1>
              {details.data.tagline && (
                <blockquote>{details.data.tagline}</blockquote>
              )}
              <div className="detail-facts">
                <span>{details.data.vote_average.toFixed(1)} rating</span>
                {details.data.runtime && (
                  <span>{details.data.runtime} min</span>
                )}
                <span>{details.data.status}</span>
                {certification && (
                  <span>
                    {localRelease?.iso_3166_1} {certification}
                  </span>
                )}
                <button
                  className="watch-trailer"
                  onClick={() => onTrailer(details.data)}
                >
                  Watch trailer <i>▶</i>
                </button>
              </div>
            </div>
          </section>
          <section className="detail-content">
            <div className="detail-summary">
              <h2>About the film</h2>
              <p>
                {details.data.overview ||
                  "No synopsis is available for this title."}
              </p>
            </div>
            {collection.data?.parts.length ? (
              <section
                className="collection"
                aria-label={`The ${collection.data.name} collection`}
              >
                <h2>{collection.data.name}</h2>
                {collection.data.overview && <p>{collection.data.overview}</p>}
                <div>
                  {collection.data.parts.slice(0, 8).map((item) => (
                    <Poster key={item.id} movie={item} onSelect={onSelect} />
                  ))}
                </div>
              </section>
            ) : null}
            {gallery.data?.backdrops.length ? (
              <section className="gallery" aria-label="Film gallery">
                <h2>Visual world</h2>
                <div>
                  {gallery.data.backdrops
                    .slice()
                    .sort((a, b) => b.vote_average - a.vote_average)
                    .slice(0, 4)
                    .map((backdrop) => (
                      <img
                        key={backdrop.file_path}
                        src={image(backdrop.file_path, "w1280")}
                        alt={`Scene from ${details.data.title}`}
                        loading="lazy"
                      />
                    ))}
                </div>
              </section>
            ) : null}
            {availability && (
              <section
                className="watch-providers"
                aria-label="Where to watch in Indonesia"
              >
                <div>
                  <h2>Where to watch</h2>
                  <p>Available in Indonesia</p>
                </div>
                <div className="provider-groups">
                  {(
                    [
                      ["Stream", availability.flatrate],
                      ["Rent", availability.rent],
                      ["Buy", availability.buy],
                    ] as const
                  )
                    .filter(([, providers]) => providers?.length)
                    .map(([label, providers]) => (
                      <div className="provider-group" key={label}>
                        <span>{label}</span>
                        <div>
                          {providers!.slice(0, 6).map((provider) => (
                            <a
                              href={availability.link}
                              target="_blank"
                              rel="noreferrer"
                              key={provider.provider_id}
                              title={provider.provider_name}
                            >
                              {provider.logo_path ? (
                                <img
                                  src={image(provider.logo_path, "w185")}
                                  alt={provider.provider_name}
                                />
                              ) : (
                                <b>{provider.provider_name}</b>
                              )}
                            </a>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </section>
            )}
            {credits.data?.cast.length ? (
              <section className="credits" aria-label="Cast and crew">
                <h2>
                  {director ? `Directed by ${director.name}` : "Featuring"}
                </h2>
                <div className="cast-track">
                  {credits.data.cast.slice(0, 6).map((person) => (
                    <article className="cast-member" key={person.id}>
                      {person.profile_path ? (
                        <img
                          src={image(person.profile_path, "w185")}
                          alt=""
                          loading="lazy"
                        />
                      ) : (
                        <div className="cast-placeholder" />
                      )}
                      <p>{person.name}</p>
                      <span>{person.character}</span>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
            {reviews.data?.results.length ? (
              <section className="reviews" aria-label="Audience reviews">
                <h2>Audience notes</h2>
                <div>
                  {reviews.data.results.slice(0, 3).map((review) => (
                    <article key={review.id}>
                      <header>
                        <strong>{review.author}</strong>
                        {review.author_details.rating !== null && (
                          <span>
                            {review.author_details.rating.toFixed(1)} / 10
                          </span>
                        )}
                      </header>
                      <p>{review.content}</p>
                      <small>
                        {new Date(review.created_at).toLocaleDateString("en", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </small>
                    </article>
                  ))}
                </div>
              </section>
            ) : null}
            {recommendations.data?.results.length ? (
              <section
                className="recommendations"
                aria-label="Recommended films"
              >
                <h2>More to discover</h2>
                <div className="recommendation-track">
                  {recommendations.data.results.slice(0, 6).map((item) => (
                    <Poster key={item.id} movie={item} onSelect={onSelect} />
                  ))}
                </div>
              </section>
            ) : null}
          </section>
        </>
      ) : (
        <p className="detail-status status">
          Film details are unavailable. Return to discovery and try another
          title.
        </p>
      )}
    </main>
  );
}

export default function App() {
  const root = useRef<HTMLElement>(null);
  const [query, setQuery] = useState("");
  const [submitted, setSubmitted] = useState("");
  const [activeGenre, setActiveGenre] = useState<number | null>(null);
  const [selectedMovieId, setSelectedMovieId] = useState<number | null>(
    () => Number(location.hash.match(/^#movie\/(\d+)$/)?.[1]) || null,
  );
  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const trending = useQuery({
    queryKey: ["movies", "trending"],
    queryFn: getTrending,
  });
  const popular = useQuery({
    queryKey: ["movies", "popular"],
    queryFn: getPopular,
  });
  const upcoming = useQuery({
    queryKey: ["movies", "upcoming"],
    queryFn: getUpcoming,
  });
  const topRated = useQuery({
    queryKey: ["movies", "top-rated"],
    queryFn: getTopRated,
  });
  const nowPlaying = useQuery({
    queryKey: ["movies", "now-playing"],
    queryFn: getNowPlaying,
  });
  const latest = useQuery({
    queryKey: ["movie", "latest"],
    queryFn: getLatest,
  });
  const results = useQuery({
    queryKey: ["movies", "search", submitted],
    queryFn: () => searchMovies(submitted),
    enabled: submitted.length > 1,
  });
  const genreResults = useQuery({
    queryKey: ["movies", "discover", activeGenre],
    queryFn: () => discoverByGenre(activeGenre!),
    enabled: activeGenre !== null,
  });
  const videos = useQuery({
    queryKey: ["movie", trailerMovie?.id, "videos"],
    queryFn: () => getMovieVideos(trailerMovie!.id),
    enabled: Boolean(trailerMovie),
  });
  const featured = latest.data?.backdrop_path
    ? latest.data
    : trending.data?.results[0];
  const trailer =
    videos.data?.results.find(
      (video) =>
        video.site === "YouTube" && video.type === "Trailer" && video.official,
    ) ??
    videos.data?.results.find(
      (video) => video.site === "YouTube" && video.type === "Trailer",
    );

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add(
      {
        reduce: "(prefers-reduced-motion: reduce)",
        motion: "(prefers-reduced-motion: no-preference)",
      },
      (context) => {
        if (context.conditions?.reduce) return;
        gsap.fromTo(
          ".nav-island",
          { y: -28, autoAlpha: 0 },
          { y: 0, autoAlpha: 1, duration: 0.9, ease: "power3.out" },
        );
        gsap.fromTo(
          ".hero-content > *",
          { y: 34, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 1.05,
            stagger: 0.12,
            ease: "power3.out",
            delay: 0.16,
          },
        );
        gsap.fromTo(
          ".reveal-card",
          { y: 42, autoAlpha: 0 },
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.9,
            stagger: 0.055,
            ease: "power3.out",
            delay: 0.55,
          },
        );
      },
      root,
    );
    return () => mm.revert();
  }, [
    trending.isSuccess,
    popular.isSuccess,
    upcoming.isSuccess,
    topRated.isSuccess,
    nowPlaying.isSuccess,
    submitted,
  ]);

  useEffect(() => {
    const syncRoute = () =>
      setSelectedMovieId(
        Number(location.hash.match(/^#movie\/(\d+)$/)?.[1]) || null,
      );
    addEventListener("hashchange", syncRoute);
    return () => removeEventListener("hashchange", syncRoute);
  }, []);

  function onSearch(event: FormEvent) {
    event.preventDefault();
    setSubmitted(query.trim());
  }
  function openMovie(movie: Movie) {
    location.hash = `movie/${movie.id}`;
  }
  function closeMovie() {
    location.hash = "top";
  }
  const isLoading =
    trending.isLoading ||
    popular.isLoading ||
    upcoming.isLoading ||
    topRated.isLoading ||
    nowPlaying.isLoading;

  if (selectedMovieId)
    return (
      <>
        <DetailPage
          movieId={selectedMovieId}
          onBack={closeMovie}
          onSelect={openMovie}
          onTrailer={setTrailerMovie}
        />
        {trailerMovie && (
          <div
            className="detail-backdrop"
            role="presentation"
            onClick={() => setTrailerMovie(null)}
          >
            <section
              className="trailer-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="trailer-title"
              onClick={(event) => event.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setTrailerMovie(null)}
                aria-label="Close trailer"
              >
                ×
              </button>
              <h2 id="trailer-title">{trailerMovie.title} trailer</h2>
              {videos.isLoading ? (
                <p className="status">Loading trailer…</p>
              ) : trailer ? (
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
                  title={trailer.name}
                  allow="autoplay; encrypted-media; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <p className="status">
                  No official YouTube trailer is available for this film.
                </p>
              )}
            </section>
          </div>
        )}
      </>
    );

  return (
    <main ref={root}>
      <div className="grain" />
      <nav className="nav-island">
        <a className="wordmark" href="#top">
          REEL<span>HOUSE</span>
        </a>
        <div className="nav-links">
          <a href="#discover">Discover</a>
          <a href="#upcoming">Upcoming</a>
          <a href="#about">About</a>
        </div>
        <button className="menu-button" aria-label="Open navigation">
          <b></b>
          <b></b>
        </button>
      </nav>
      <section
        id="top"
        className="hero"
        style={
          featured?.backdrop_path
            ? {
                backgroundImage: `url(${image(featured.backdrop_path, "original")})`,
              }
            : undefined
        }
      >
        <div className="hero-shade" />
        <div className="hero-content">
          <p className="eyebrow">
            A considered film index <em>•</em>{" "}
            {featured
              ? `now showing ${year(featured.release_date)}`
              : "loading cinema"}
          </p>
          <h1>{featured?.title || "The stories worth your attention."}</h1>
          <p className="hero-description">
            {featured?.overview ||
              "A handpicked stream of the world’s most compelling new cinema, updated weekly."}
          </p>
          <div className="hero-actions">
            <a href="#discover" className="cta">
              Explore selection <span>↘</span>
            </a>
            <button
              className="text-action"
              onClick={() => featured && setTrailerMovie(featured)}
              disabled={!featured}
            >
              Watch trailer <i>▶</i>
            </button>
          </div>
        </div>
        <div className="hero-meta">
          <span>01</span>
          <div />
          <p>
            Curated from
            <br />
            the moving image
          </p>
        </div>
      </section>
      <section id="discover" className="content">
        <div className="intro">
          <p className="eyebrow">The current edit</p>
          <h2>
            Cinema for the curious
            <br />
            <i>and the restless.</i>
          </h2>
          <p>
            Browse what is moving culture forward. Data is supplied live by
            TMDB, intelligently cached to keep the experience calm and quick.
          </p>
        </div>
        <form className="search-shell" onSubmit={onSearch}>
          <div className="search-core">
            <label htmlFor="movie-search">Find a film</label>
            <input
              id="movie-search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Title, director, or a feeling…"
            />
            <button type="submit">
              Search <span>↗</span>
            </button>
          </div>
        </form>
        <section className="genre-filter" aria-label="Browse by genre">
          <p>Browse by genre</p>
          <div>
            {Object.entries(genres).map(([id, name]) => (
              <button
                key={id}
                className={activeGenre === Number(id) ? "active" : ""}
                onClick={() =>
                  setActiveGenre(activeGenre === Number(id) ? null : Number(id))
                }
                aria-pressed={activeGenre === Number(id)}
              >
                {name}
              </button>
            ))}
          </div>
        </section>
        {submitted && (
          <section className="search-results">
            <div className="rail-heading">
              <span>00</span>
              <h2>Results for “{submitted}”</h2>
              <button
                onClick={() => {
                  setQuery("");
                  setSubmitted("");
                }}
              >
                Clear <i>×</i>
              </button>
            </div>
            {results.isLoading ? (
              <p className="status">Looking through the archive…</p>
            ) : (
              <div className="result-grid">
                {results.data?.results
                  .slice(0, 8)
                  .map((movie) => (
                    <Poster key={movie.id} movie={movie} onSelect={openMovie} />
                  )) || <p className="status">No matching titles yet.</p>}
              </div>
            )}
          </section>
        )}
        {activeGenre &&
          (genreResults.isLoading ? (
            <p className="status">Finding {genres[activeGenre]} films…</p>
          ) : (
            <Rail
              index="00"
              title={`${genres[activeGenre]} picks`}
              movies={genreResults.data?.results}
              onSelect={openMovie}
            />
          ))}
        {isLoading ? (
          <p className="status">Curating the latest releases…</p>
        ) : (
          <>
            <Rail
              index="01"
              title="In the conversation"
              movies={trending.data?.results}
              onSelect={openMovie}
            />
            <Rail
              index="02"
              title="Now playing"
              movies={nowPlaying.data?.results}
              onSelect={openMovie}
            />
            <Rail
              index="03"
              title="The essential popular"
              movies={popular.data?.results}
              onSelect={openMovie}
            />
            <Rail
              index="04"
              title="Highest rated"
              movies={topRated.data?.results}
              onSelect={openMovie}
            />
            <Rail
              index="05"
              title="Coming into focus"
              movies={upcoming.data?.results}
              onSelect={openMovie}
            />
          </>
        )}
      </section>
      <footer id="about">
        <a className="wordmark" href="#top">
          REEL<span>HOUSE</span>
        </a>
        <p>A living index for the cinema obsessed.</p>
        <small>
          Data & imagery: TMDB. This product uses the TMDB API but is not
          endorsed or certified by TMDB.
        </small>
      </footer>
      {trailerMovie && (
        <div
          className="detail-backdrop"
          role="presentation"
          onClick={() => setTrailerMovie(null)}
        >
          <section
            className="trailer-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="trailer-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setTrailerMovie(null)}
              aria-label="Close trailer"
            >
              ×
            </button>
            <h2 id="trailer-title">{trailerMovie.title} trailer</h2>
            {videos.isLoading ? (
              <p className="status">Loading trailer…</p>
            ) : trailer ? (
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailer.key}?autoplay=1`}
                title={trailer.name}
                allow="autoplay; encrypted-media; picture-in-picture"
                allowFullScreen
              />
            ) : (
              <p className="status">
                No official YouTube trailer is available for this film.
              </p>
            )}
          </section>
        </div>
      )}
    </main>
  );
}
