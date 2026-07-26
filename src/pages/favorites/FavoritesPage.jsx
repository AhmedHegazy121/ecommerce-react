import React, { useContext } from "react";

// Components
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProducts/Product";

// Context
import { CartContext } from "../../components/context/CartContext";

// Styles
import "./favorites.css";

/* =============================================================================
   Favorites Page
   -----------------------------------------------------------------------------
   Displays all products that the user has added to their favorites list.
============================================================================= */

function FavoritesPage() {
  /* --------------------------------------------------------------------------
     Favorites Context
     --------------------------------------------------------------------------
     Retrieve the list of favorite products from the global cart context.
  -------------------------------------------------------------------------- */
  const { favorites } = useContext(CartContext);

  return (
    <PageTransition>
      <div className="category_products favoritesPage">
        <div className="container">
          {/* ===================== Page Header ===================== */}
          <div className="top_slide">
            <h2>Your Favorites</h2>
          </div>

          {/* ==================== Favorites List ==================== */}
          {favorites.length === 0 ? (
            <p>No favorite products yet.</p>
          ) : (
            <div className="products">
              {favorites.map((product) => (
                <Product key={product.id} item={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </PageTransition>
  );
}

export default FavoritesPage;
