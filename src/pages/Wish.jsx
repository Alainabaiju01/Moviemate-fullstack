import { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import Filterbar from "../components/Filterbar";
import Header from "../components/Header";
import {
  getWishlistAPI,
  addWishlistAPI,
  removeWishlistAPI,
} from "../services/allAPI";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  // form state
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [director, setDirector] = useState("");
  const [platform, setPlatform] = useState("");
  const [type, setType] = useState("movie");

  // filter state
  const [filterGenre, setFilterGenre] = useState("all");
  const [filterPlatform, setFilterPlatform] = useState("all");

  useEffect(() => {
    fetchWishlist();
  }, []);

  const fetchWishlist = async () => {
    try {
      const data = await getWishlistAPI();
      setWishlist(data);
    } catch (err) {
      console.error("Failed to fetch wishlist", err);
      setWishlist([]);
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();

    if (!title || !genre || !director || !platform) {
      alert("Please fill all fields");
      return;
    }

    const saved = await addWishlistAPI({
      title,
      genre,
      director,
      platform,
      type,
    });

    setWishlist((prev) => [...prev, saved]);

    setTitle("");
    setGenre("");
    setDirector("");
    setPlatform("");
    setType("movie");
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Remove from wishlist?")) return;
    await removeWishlistAPI(id);
    setWishlist((prev) =>
      prev.filter((item) => (item.id || item._id) !== id)
    );
  };

  // ✅ FILTER LOGIC (CASE-SAFE & RELIABLE)
  const filteredWishlist = wishlist.filter((item) => {
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
        className="p-4"
        style={{ backgroundColor: "#ba5050ff", minHeight: "100vh" }}
      >
        {/* Header + Filter */}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3>📌 Wishlist</h3>

          <Filterbar
            filterGenre={filterGenre}
            setFilterGenre={setFilterGenre}
            filterPlatform={filterPlatform}
            setFilterPlatform={setFilterPlatform}
          />
        </div>

        {/* Add Form */}
        <form
          onSubmit={handleAdd}
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
            className="form-control mb-3"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="movie">Movie</option>
            <option value="tv">TV Show</option>
          </select>

          <button className="btn btn-dark w-100">
            Add to Wishlist
          </button>
        </form>

        {/* Grid */}
        <div className="row g-4">
          {filteredWishlist.map((item) => {
            const id = item.id || item._id;
            return (
              <div key={id} className="col-md-3">
                <div className="card p-3 text-center shadow-sm h-100">
                  <h5>{item.title}</h5>
                  <p className="mb-1">{item.genre}</p>
                  <p className="mb-2">{item.platform}</p>

                  <button
                    className="btn btn-outline-danger btn-sm"
                    onClick={() => handleDelete(id)}
                  >
                    <MdDelete />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
