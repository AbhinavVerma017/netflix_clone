import React, { useEffect, useState } from 'react';
import axios from './axios.js';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

const base_Url = 'https://image.tmdb.org/t/p/original/';

function Row({ title, fetchUrl, isLargeRow = false }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState('');

  useEffect(() => {
    async function fetchData() {
      const request = await axios.get(fetchUrl);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchUrl]);

  const opts = {
    height: '390',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    if (trailerUrl) {
      setTrailerUrl('');
      return;
    }

    const movieName =
      movie?.title ||
      movie?.name ||
      movie?.original_title ||
      movie?.original_name ||
      '';

    // Try searching with "official trailer" in query
    movieTrailer(`${movieName} official trailer`, { id: true })
      .then((videoId) => {
        if (videoId) {
          setTrailerUrl(videoId);
        } else {
          // fallback to just movie name
          movieTrailer(movieName, { id: true }).then((fallbackId) => {
            if (fallbackId) setTrailerUrl(fallbackId);
            else alert('Trailer not found');
          });
        }
      })
      .catch((err) => {
        console.error('Trailer not found:', err);
      });
  };

  return (
    <div className="row">
      <h2>{title}</h2>

      <div className="row_posters">
        {movies.map((movie) =>
          ((isLargeRow && movie.poster_path) || (!isLargeRow && movie.backdrop_path)) ? (
            <img
              key={movie.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow ? 'row_posterLarge' : ''}`}
              src={`${base_Url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`}
              alt={movie?.title || movie?.name}
            />
          ) : null
        )}
      </div>

      {trailerUrl && (
        <div className="row__trailerContainer">
          <button className="row__closeButton" onClick={() => setTrailerUrl('')}>
            ✖ Close
          </button>
          <YouTube videoId={trailerUrl} opts={opts} />
        </div>
      )}
    </div>
  );
}

export default Row;
