import { useState, useEffect, useRef } from "react";
import "./Header.scss";
import { Link, useLocation } from "react-router-dom";
import { FaSun, FaMoon } from "react-icons/fa";

export const Header = () => {
  const [theme, setTheme] = useState("light");
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navRef = useRef(null); // Referenz für die Navbar

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") || "light";
    setTheme(savedTheme);
    document.body.className = savedTheme;
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
    document.body.className = newTheme;
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  // Schließe die Navbar, wenn außerhalb geklickt wird

  return (
    <nav ref={navRef}>
      <div className="menu" id="menu" onClick={toggleMenu}>
        <div>
          <span className={isMenuOpen ? "stripe-1 active" : "stripe-1"}></span>
          <span className={isMenuOpen ? "stripe-2 active" : "stripe-2"}></span>
          <span className={isMenuOpen ? "stripe-3 active" : "stripe-3"}></span>
        </div>
      </div>

      <ul className={isMenuOpen ? "openNav active" : "openNav"}>
        <div className="navRout">
          <Link to="/dashboard" onClick={closeMenu}>
            <div className="btn nav-btn">
              <span
                className={`word ${location.pathname === "/dashboard" ? "active" : ""}`}
                data-text="Dashboard"
              >
                Dashboard
              </span>
            </div>
          </Link>

          <Link to="/transactions" onClick={closeMenu}>
            <div className="btn nav-btn">
              <span
                className={`word ${location.pathname === "/transactions" ? "active" : ""}`}
                data-text="Transaction"
              >
                Transaction
              </span>
            </div>
          </Link>

          <button onClick={toggleTheme} className="theme-toggle-btn">
            {theme === "light" ? <FaMoon /> : <FaSun />}
          </button>
        </div>
      </ul>
    </nav>
  );
};
