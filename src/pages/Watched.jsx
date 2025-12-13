import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Filterbar from "../components/Filterbar";
import Header from "../components/Header";
import {
  getWatchedAPI,
  addWatchedAPI,
  removeWatchedAPI,
} from "../services/allAPI";

export default function Watched() {
  const [watched, setWatched] = useState([]);

  // form state
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [platform, setPlatform] = useState("");
  const [dateCompleted, setDateCompleted] = useState("");
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  // filter state
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");

  useEffect(() => {
    fetchWatched();
  }, []);

  const fetchWatched = async () => {
    const data = await getWatchedAPI();
    setWatched(data);
  };

  const handleAddWatched = async (e) => {
    e.preventDefault();

    const saved = await addWatchedAPI({
      title,
      genre,
      director,
      platform,
      dateCompleted,
      rating,
      review,
    });

    setWatched((prev) => [...prev, saved]);

    setTitle("");
    setGenre("");
    setDirector("");
    setPlatform("");
    setDateCompleted("");
    setRating(5);
    setReview("");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove from watched list?")) return;
    await removeWatchedAPI(id);
    setWatched((prev) => prev.filter((w) => w.id !== id));
  };

  // ✅ FILTER LOGIC (FIXED)
  const filteredWatched = watched.filter((item) => {
    const genreMatch =
      filterGenre === "all" ||
      item.genre?.toLowerCase() === filterGenre.toLowerCase();

    const platformMatch =
      filterPlatform === "all" ||
      item.platform?.toLowerCase() === filterPlatform.toLowerCase();

    return genreMatch && platformMatch;
  });

  return (
    <>
      <Header />

      <div
        style={{
          padding: "40px 20px",
          minHeight: "100vh",
          backgroundColor: "#ba5050ff",
        }}
      >
        {/* Title + Filter */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>✅ Watched Movies & Shows</h3>

          <Filterbar
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
            filterPlatform={filterPlatform}
            setFilterPlatform={setFilterPlatform}
          />
        </div>

        {/* Add Form */}
        <form
          onSubmit={handleAddWatched}
          className="bg-white p-4 rounded mb-4 mx-auto"
          style={{ maxWidth: 650 }}
        >
          <input
            className="form-control mb-2"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Director"
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />

          <input
            className="form-control mb-2"
            placeholder="Platform"
            value={platform}
            onChange={(e) => setPlatform(e.target.value)}
          />

          <input
            type="date"
            className="form-control mb-2"
            value={dateCompleted}
            onChange={(e) => setDateCompleted(e.target.value)}
          />

          <select
            className="form-control mb-2"
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} ⭐
              </option>
            ))}
          </select>

          <textarea
            className="form-control mb-3"
            placeholder="Write a short review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
          />

          <button className="btn btn-dark w-100">
            Add to Watched
          </button>
        </form>

        {/* Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {filteredWatched.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded shadow text-center"
            >
              <h5>{item.title}</h5>
              <p className="text-muted">{item.genre}</p>
              <p>{item.director}</p>
              <p>{item.platform}</p>
              <p><strong>Completed:</strong> {item.dateCompleted}</p>
              <p><strong>Rating:</strong> {item.rating} ⭐</p>

              {item.review && (
                <p className="fst-italic">“{item.review}”</p>
              )}

              <button
                onClick={() => handleDelete(item.id)}
                className="btn btn-sm btn-outline-danger"
              >
                <MdDelete />
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
