
import { useState } from "react";
import "./App.css";

function MovieCard({ movie, onRemove }) {
  return (
    <div className="movie-card">
      <div className="movie-header">
        <h3>{movie.title}</h3>

        <button
          className="remove-button"
          onClick={() => onRemove(movie.id)}
        >
          Remove
        </button>
      </div>

      <p className="stars">
        {"⭐".repeat(movie.rating)}
        {"☆".repeat(5 - movie.rating)}
      </p>

      <p className="rating-text">
        You gave this movie {movie.rating} star
        {movie.rating === 1 ? "" : "s"}.
      </p>

      <p className="review">{movie.review}</p>
    </div>
  );
}

function App() {
  const [movies, setMovies] = useState([]);
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState("5");

  function addMovie(event) {
    event.preventDefault();

    if (title.trim() === "") {
      return;
    }

    const newMovie = {
      id: Date.now(),
      title: title.trim(),
      review: review.trim() || "No review added.",
      rating: Number(rating)
    };

    setMovies([...movies, newMovie]);
    setTitle("");
    setReview("");
    setRating("5");
  }

  function removeMovie(id) {
    setMovies(movies.filter((movie) => movie.id !== id));
  }

  const totalStars = movies.reduce(
    (total, movie) => total + movie.rating,
    0
  );

  return (
    <div className="app">
      <header>
        <h1>🎬 My Movie Watchlist</h1>
        <p>Keep track of your favorite movies.</p>
      </header>

      <div className="summary">
        <div>
          <span>Movies added</span>
          <h2>{movies.length}</h2>
        </div>

        <div>
          <span>Total stars given</span>
          <h2>{totalStars} ⭐</h2>
        </div>
      </div>

      <form className="movie-form" onSubmit={addMovie}>
        <h2>Add a Movie</h2>

        <label htmlFor="movie-title">Movie title</label>
        <input
          id="movie-title"
          type="text"
          placeholder="Enter movie name"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />

        <label htmlFor="movie-review">Your review</label>
        <textarea
          id="movie-review"
          placeholder="Write your review..."
          value={review}
          onChange={(event) => setReview(event.target.value)}
          rows="3"
        />

        <label htmlFor="movie-rating">Rating</label>
        <select
          id="movie-rating"
          value={rating}
          onChange={(event) => setRating(event.target.value)}
        >
          <option value="1">1 star ⭐</option>
          <option value="2">2 stars ⭐⭐</option>
          <option value="3">3 stars ⭐⭐⭐</option>
          <option value="4">4 stars ⭐⭐⭐⭐</option>
          <option value="5">5 stars ⭐⭐⭐⭐⭐</option>
        </select>

        <button className="add-button" type="submit">
          + Add Movie
        </button>
      </form>

      <section className="movie-list">
        <h2>My Movies</h2>

        {movies.length === 0 ? (
          <p className="empty">
            No movies yet. Add your first movie above!
          </p>
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              onRemove={removeMovie}
            />
          ))
        )}
      </section>
    </div>
  );
}

export default App;
