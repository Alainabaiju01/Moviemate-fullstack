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
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
       <div className="text-center d-flex flex-column p-3">
  <h1
    style={{ fontSize: "50px" }}
    className="text-white  m-3"
  >
    Your personal movie & series tracker!
  </h1>

  {[
    { text: "Your Wishlist", path: "/wish" },
    { text: "Currently Watching", path: "/watching" },
    { text: "Watched", path: "/watched" },
  ].map((btn) => (
    <Link
      key={btn.path}
      to={btn.path}
      className="btn btn-light m-3"
      style={{
        width: "320px",          // ✅ SAME WIDTH
        padding: "15px 0",
        fontSize: "20px",
        borderRadius: "12px",
        fontFamily: "Georgia, serif",
        alignSelf: "center",
      }}
    >
      {btn.text}
    </Link>
  ))}
</div>

      </div>
    </>
  );
}

export default Home;
