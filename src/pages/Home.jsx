import { Link } from "react-router-dom";

function Home() {
  return (
    <>
      {/* Header / Logo */}
      <nav
        style={{
          display: "flex",
          position: "sticky",
          top: 0,
          zIndex: 1000,
          justifyContent: "flex-start",
          alignItems: "center",
          padding: "15px 20px",
          backgroundColor: "rgba(239, 228, 17, 0.3)",
          borderRadius: "10px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <img
            src="./images/logo.png"
            alt="logo"
            style={{
              width: "60px",
              height: "60px",
              objectFit: "contain",
            }}
          />
          <h2
            style={{
              color: "#cf0808ff",
              fontFamily: "Georgia, serif",
              margin: 0,
            }}
          >
            MovieMate
          </h2>
        </div>
      </nav>

      {/* Hero Section */}
      <div
        style={{
          backgroundImage:
            "url('https://img.freepik.com/free-photo/assortment-cinema-elements-red-background-with-copy-space_23-2148457848.jpg?semt=ais_hybrid&w=740&q=80')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="text-center d-flex flex-column p-3">
          <Link
            to="/wish"
            className="btn btn-light m-3"
            style={{
              padding: "15px 40px",
              fontSize: "20px",
              borderRadius: "12px",
              fontFamily: "Georgia, serif",
            }}
          >
            Your Wishlist
          </Link>

          <Link
            to="/watching"
            className="btn btn-light m-3"
            style={{
              padding: "15px 40px",
              fontSize: "20px",
              borderRadius: "12px",
              fontFamily: "Georgia, serif",
            }}
          >
            Currently Watching
          </Link>

          <Link
            to="/watched"
            className="btn btn-light m-3"
            style={{
              padding: "15px 40px",
              fontSize: "20px",
              borderRadius: "12px",
              fontFamily: "Georgia, serif",
            }}
          >
            Watched
          </Link>
        </div>
      </div>
    </>
  );
}

export default Home;
