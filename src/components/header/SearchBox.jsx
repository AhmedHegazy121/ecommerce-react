import React, { useEffect, useState, useRef } from "react";
import { FiSearch } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
// API
import { searchProducts } from "../../api/Product";

/* ============================================================================= 
Search Box 
----------------------------------------------------------------------------- 
Provides product search with live suggestions. 
============================================================================= */
function SearchBox() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);

  // Visual Anchor: Create a reference container for the entire search component
  const searchRef = useRef(null);

  /* -------------------------------------------------------------------------- */
  /* Handle Search Submit */
  /* -------------------------------------------------------------------------- */
  const handleSubmit = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/search?query=${encodeURIComponent(query)}`);
    setSuggestions([]);
    setSearchTerm("");
  };

  /* -------------------------------------------------------------------------- */
  /* Load Suggestions */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    if (!searchTerm.trim()) {
      setSuggestions([]);
      return;
    }
    const debounce = setTimeout(async () => {
      try {
        const products = await searchProducts(searchTerm);
        setSuggestions(products.slice(0, 5));
      } catch (error) {
        console.error("Failed to load search suggestions:", error);
        setSuggestions([]);
      }
    }, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm]);

  /* -------------------------------------------------------------------------- */
  /* Close List on Outside Click */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click happened outside the component container
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSuggestions([]);
      }
    };

    // Attach global click event listener
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up event listener on unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  /* -------------------------------------------------------------------------- */
  /* Clear Suggestions On Route Change */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    setSuggestions([]);
  }, [location.pathname]);

  return (
    // Visual Anchor: Attached the ref to the outer wrapper
    <div className="searchBox_container" ref={searchRef}>
      <form className="search_box" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for products..."
          autoComplete="off"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button type="submit">
          <FiSearch />
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="suggestions">
          {suggestions.map((product) => (
            <li key={product.id}>
              <Link
                to={`/products/${product.id}`}
                onClick={() => {
                  setSuggestions([]);
                  setSearchTerm("");
                }}
              >
                <img src={product.images[0]} alt={product.title} />
                <span>{product.title}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBox;
