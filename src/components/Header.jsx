import { Link } from "react-router-dom";
import { useState } from "react";

function Header() {
  const [open, setOpen] = useState(false);

  return (
    <nav
      style={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 20px",
        backgroundColor: "rgba(239, 228, 17, 0.3)",
        borderRadius: "10px",
        fontSize: "20px",
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <img
          src="./images/logo.png"
          alt="logo"
          style={{ width: "60px", height: "60px", objectFit: "contain" }}
        />
        <h2
          style={{
            color: "#cf0808ff",
            fontFamily: "Georgia, serif",
          }}
        >
          MovieMate
        </h2>
      </div>

      {/* Hamburger (mobile only) */}
      <div
        onClick={() => setOpen(!open)}
        style={{
          fontSize: "28px",
          cursor: "pointer",
          display: "none",
        }}
        className="hamburger"
      >
        ☰
      </div>

      {/* Links */}
      <div
        className="nav-links"
        style={{
          display: "flex",
          gap: "30px",
          fontFamily: "Georgia, serif",
        }}
      >
        <Link style={linkStyle} to="/">Home</Link>
        <Link style={linkStyle} to="/wish">Wishlist</Link>
        <Link style={linkStyle} to="/watching">Watching</Link>
        <Link style={linkStyle} to="/watched">Watched</Link>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div
          style={{
            width: "100%",
            marginTop: "15px",
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            fontFamily: "Georgia, serif",
          }}
          className="mobile-menu"
        >
          <Link style={linkStyle} to="/" onClick={() => setOpen(false)}>Home</Link>
          <Link style={linkStyle} to="/wish" onClick={() => setOpen(false)}>Wishlist</Link>
          <Link style={linkStyle} to="/watching" onClick={() => setOpen(false)}>Watching</Link>
          <Link style={linkStyle} to="/watched" onClick={() => setOpen(false)}>Watched</Link>
        </div>
      )}

      {/* Inline media query */}
      <style>
        {`
          @media (max-width: 768px) {
            .nav-links {
              display: none;
            }
            .hamburger {
              display: block;
            }
          }
        `}
      </style>
    </nav>
  );
}

const linkStyle = {
  color: "#d21818ff",
  fontWeight: "bold",
  textDecoration: "none",
};

export default Header;
