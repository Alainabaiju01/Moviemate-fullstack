function Filterbar({
  filterGenre,
  setFilterGenre,
  filterPlatform,
  setFilterPlatform,
}) {
  return (
    <div className="d-flex gap-3 mb-3 flex-wrap">
      <select
        className="form-control w-auto"
        value={filterGenre}
        onChange={(e) => setFilterGenre(e.target.value)}
      >
        <option value="all">All Genres</option>
        <option value="action">Action</option>
        <option value="drama">Drama</option>
        <option value="comedy">Comedy</option>
        <option value="romance">Romance</option>
        <option value="sci-fi">Sci-Fi</option>
        <option value="thriller">Thriller</option>
      </select>

      <select
        className="form-control w-auto"
        value={filterPlatform}
        onChange={(e) => setFilterPlatform(e.target.value)}
      >
        <option value="all">All Platforms</option>
        <option value="netflix">Netflix</option>
        <option value="prime">Prime</option>
        <option value="hotstar">Hotstar</option>
        <option value="zee5">Zee5</option>
      </select>
    </div>
  );
}

export default Filterbar;
