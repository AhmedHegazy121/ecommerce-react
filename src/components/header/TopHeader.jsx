import React, { useContext } from "react";
import { Link } from "react-router-dom";

// Icons
import { CiHeart } from "react-icons/ci";
import { GiShoppingCart } from "react-icons/gi";
import { BsSun, BsMoonStars } from "react-icons/bs";

// Assets
import Logo from "../../img/icon.png";

// Components
import SearchBox from "./SearchBox.jsx";

// Context & Hooks
import { CartContext } from "../context/CartContext";
import { useTheme } from "../../ThemeToggle.jsx";

// Styles
import "./header.css";

/* =============================================================================
   Top Header
   -----------------------------------------------------------------------------
   Displays the application logo, search bar, user shortcuts,
   shopping cart, favorites, and theme toggle.
============================================================================= */

function TopHeader() {
  /* --------------------------------------------------------------------------
     Theme Management
     --------------------------------------------------------------------------
     Retrieves the current theme and the function used to switch
     between light and dark modes.
  -------------------------------------------------------------------------- */
  const { theme, toggleTheme } = useTheme();

  /* --------------------------------------------------------------------------
     Shopping Context
     --------------------------------------------------------------------------
     Accesses the current cart items and favorite products in order
     to display their counters in the header.
  -------------------------------------------------------------------------- */
  const { cartItems, favorites } = useContext(CartContext);

  return (
    <div className="top-header">
      <div className="container">
        {/* 1. Logo (Direct child) */}
        <div className="search_logo">
          <Link className="logo" to="/">
            <img src={Logo} alt="Application Logo" />
          </Link>

          {/* 2. Search Box (Direct child) */}
          <SearchBox />
        </div>

        {/* 3. Icons Group (Direct child) */}
        <div className="header_icons">
          <Link to="/favorites" className="icon_wrapper" aria-label="Favorites">
            <CiHeart />
            {favorites.length > 0 && (
              <span className="count">{favorites.length}</span>
            )}
          </Link>

          <Link to="/cart" className="icon_wrapper" aria-label="Cart">
            <GiShoppingCart />
            {cartItems.length > 0 && (
              <span className="count">{cartItems.length}</span>
            )}
          </Link>

          <button className="theme-icon-btn" onClick={toggleTheme}>
            {theme === "light" ? <BsMoonStars /> : <BsSun />}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TopHeader;
