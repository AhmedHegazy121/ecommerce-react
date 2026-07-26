import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

// Components
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProducts/Product";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";

// API
import { searchProducts } from "../../api/Product";

/* =============================================================================
   Search Results Page
   -----------------------------------------------------------------------------
   Displays products matching the search query from the URL.
============================================================================= */

function SearchResults() {
  /* --------------------------------------------------------------------------
     Read search query from URL
  -------------------------------------------------------------------------- */
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");

  /* --------------------------------------------------------------------------
     Component State
  -------------------------------------------------------------------------- */
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  /* --------------------------------------------------------------------------
     Fetch Search Results
  -------------------------------------------------------------------------- */
  useEffect(() => {
    const loadResults = async () => {
      if (!query) {
        setResults([]);
        setLoading(false);
        return;
      }

      try {
        setLoading(true);

        const products = await searchProducts(query);

        setResults(products);
      } catch (error) {
        console.error("Failed to search products:", error);
        setResults([]);
      } finally {
        setLoading(false);
      }
    };

    loadResults();
  }, [query]);

  return (
    <PageTransition key={query}>
      <div className="category_products">
        {loading ? (
          <SlideProductLoading />
        ) : (
          <div className="container">
            {/* ===================== Page Header ===================== */}
            <div className="top_slide">
              <h2>Results for: {query}</h2>
            </div>

            {/* ===================== Products ===================== */}
            <div className="products">
              {results.length > 0 ? (
                results.map((product) => (
                  <Product key={product.id} item={product} />
                ))
              ) : (
                <p>No products found.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </PageTransition>
  );
}

export default SearchResults;
