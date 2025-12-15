import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Header from "../components/Header";
import Filterbar from "../components/Filterbar";
import {
  getWatchingAPI,
  addWatchingAPI,
  updateWatchingAPI,
  removeWatchingAPI,
} from "../services/allAPI";

export default function Watching() {
  const [watching, setWatching] = useState([]);


  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("movie");
  const [minutesWatched, setMinutesWatched] = useState(0);
  const [currentEpisode, setCurrentEpisode] = useState(1);
  const [loading, setLoading] = useState(false);


  const [filterGenre, setFilterGenre] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");

  useEffect(() => {
    fetchWatching();
  }, []);

  const fetchWatching = async () => {
    try {
      const data = await getWatchingAPI();
      setWatching(data);
    } catch (err) {
      console.error("Failed to fetch watching list", err);
      setWatching([]);
    }
  };

  const handleAddWatching = async (e) => {
    e.preventDefault();

    if (!title || !genre || !director || !platform) {
      alert("Please fill all fields");
      return;
    }

    const payload = {
      title,
      genre,
      director,
      platform,
      type,
      minutesWatched: type === "movie" ? minutesWatched : null,
      currentEpisode: type === "tv" ? currentEpisode : null,
    };

    try {
      setLoading(true);
      const saved = await addWatchingAPI(payload);
      setWatching((prev) => [...prev, saved]);

      setTitle("");
      setGenre("");
      setDirector("");
      setPlatform("");
      setMinutesWatched(0);
      setCurrentEpisode(1);
    } catch (err) {
      console.error("Add watching failed", err);
    } finally {
      setLoading(false);
    }
  };

  const updateProgress = async (id, field, value) => {
    try {
      const updated = await updateWatchingAPI(id, { [field]: value });
      setWatching((prev) =>
        prev.map((item) => (item.id === id ? updated : item))
      );
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove from watching list?")) return;
    await removeWatchingAPI(id);
    setWatching((prev) => prev.filter((w) => w.id !== id));
  };

  
  const filteredWatching = watching.filter((item) => {
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
        {/* Header + Filter */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>🎥 Currently Watching</h3>

          <Filterbar
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
            filterPlatform={filterPlatform}
            setFilterPlatform={setFilterPlatform}
          />
        </div>

       
        <form
          onSubmit={handleAddWatching}
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

          <select
            className="form-control mb-2"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>

          {type === "movie" ? (
            <select
              className="form-control mb-3"
              value={minutesWatched}
              onChange={(e) =>
                setMinutesWatched(Number(e.target.value))
              }
            >
              {[0, 30, 60, 90, 120, 150, 180].map((m) => (
                <option key={m} value={m}>
                  {m} minutes
                </option>
              ))}
            </select>
          ) : (
            <select
              className="form-control mb-3"
              value={currentEpisode}
              onChange={(e) =>
                setCurrentEpisode(Number(e.target.value))
              }
            >
              {Array.from({ length: 30 }, (_, i) => i + 1).map(
                (ep) => (
                  <option key={ep} value={ep}>
                    Episode {ep}
                  </option>
                )
              )}
            </select>
          )}

          <button className="btn btn-dark" disabled={loading}>
            {loading ? "Adding..." : "Add to Watching"}
          </button>
        </form>

   
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 20,
          }}
        >
          {filteredWatching.map((item) => (
            <div
              key={item.id}
              className="bg-white p-3 rounded shadow text-center"
            >
              <h5>{item.title}</h5>
              <p className="text-muted">{item.genre}</p>
              <p>{item.director}</p>
              <p>{item.platform}</p>

              {item.type === "movie" ? (
                <select
                  className="form-control mb-2"
                  value={item.minutesWatched || 0}
                  onChange={(e) =>
                    updateProgress(
                      item.id,
                      "minutesWatched",
                      Number(e.target.value)
                    )
                  }
                >
                  {[0, 30, 60, 90, 120, 150, 180].map((m) => (
                    <option key={m} value={m}>
                      {m} min watched
                    </option>
                  ))}
                </select>
              ) : (
                <select
                  className="form-control mb-2"
                  value={item.currentEpisode || 1}
                  onChange={(e) =>
                    updateProgress(
                      item.id,
                      "currentEpisode",
                      Number(e.target.value)
                    )
                  }
                >
                  {Array.from({ length: 20 }, (_, i) => i + 1).map(
                    (ep) => (
                      <option key={ep} value={ep}>
                        Episode {ep}
                      </option>
                    )
                  )}
                </select>
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
