import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

// Icons
import { CiHeart } from "react-icons/ci";
import { FaShare } from "react-icons/fa";
import { IoStarSharp } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { TiShoppingCart } from "react-icons/ti";

// Context
import { CartContext } from "../../components/context/CartContext";

/* =============================================================================
   Product Information
   -----------------------------------------------------------------------------
   Displays detailed information about the selected product, including
   pricing, availability, description, and shopping actions.
============================================================================= */

function ProductInfo({ product }) {
  /* --------------------------------------------------------------------------
     Navigation
     --------------------------------------------------------------------------
     Used to redirect the user to the cart from the success toast.
  -------------------------------------------------------------------------- */
  const navigate = useNavigate();

  /* --------------------------------------------------------------------------
     Cart & Favorites Context
     --------------------------------------------------------------------------
     Provides access to the shopping cart and favorites along with
     helper functions for updating both lists.
  -------------------------------------------------------------------------- */
  const {
    cartItems,
    addToCart,
    favorites,
    addToFavorites,
    removeFromFavorites,
  } = useContext(CartContext);

  /* --------------------------------------------------------------------------
     Product Status
     --------------------------------------------------------------------------
     Determine whether the current product already exists
     in the cart or favorites.
  -------------------------------------------------------------------------- */
  const isInCart = cartItems.some((item) => item.id === product.id);
  const isInFav = favorites.some((item) => item.id === product.id);

  /* --------------------------------------------------------------------------
     Add to Cart
     --------------------------------------------------------------------------
     Adds the current product to the shopping cart and displays
     a success notification with quick access to the cart page.
  -------------------------------------------------------------------------- */
  const handleAddToCart = () => {
    addToCart(product);

    toast.success(
      <div className="toast_wrapper">
        <img
          src={product.images[0]}
          alt={product.title}
          className="toast_img"
        />

        <div className="toast_content">
          <strong>{product.title}</strong>

          <p>Added to Cart</p>

          <button className="btn" onClick={() => navigate("/cart")}>
            View Cart
          </button>
        </div>
      </div>,
      {
        duration: 3500,
      },
    );
  };

  /* --------------------------------------------------------------------------
     Toggle Favorite
     --------------------------------------------------------------------------
     Adds or removes the current product from the favorites list.
  -------------------------------------------------------------------------- */
  const handleAddToFav = () => {
    if (isInFav) {
      removeFromFavorites(product.id);
      toast.error(`${product.title} Removed From Favorites`);
      return;
    }

    addToFavorites(product);
    toast.success(`${product.title} Added To Favorites`);
  };

  return (
    <div className="details_item">
      {/* ======================= Product Title ======================= */}
      <h1 className="name">{product.title}</h1>

      {/* ====================== Product Rating ======================= */}
      <div className="stars">
        <IoStarSharp />
        <IoStarSharp />
        <IoStarSharp />
        <IoStarSharp />
        <IoIosStarHalf />
      </div>

      {/* ======================= Product Price ======================= */}
      <p className="price">${product.price}</p>

      {/* ===================== Product Details ======================= */}
      <h5>
        Availability:
        <span> {product.availabilityStatus}</span>
      </h5>

      <h5>
        Brand:
        <span> {product.brand}</span>
      </h5>

      <p className="desc">{product.description}</p>

      {/* Stock Status */}
      <h5 className="stock">
        <span>Hurry Up! Only {product.stock} products left in stock.</span>
      </h5>

      {/* ====================== Add to Cart ========================== */}
      <button
        className={`btn ${isInCart ? "in_cart" : ""}`}
        onClick={handleAddToCart}
      >
        {isInCart ? "Item in Cart" : "Add to Cart"}

        <TiShoppingCart />
      </button>

      {/* ==================== Additional Actions ===================== */}
      <div className="icons">
        {/* Favorite */}
        <span className={isInFav ? "in_fav" : ""} onClick={handleAddToFav}>
          <CiHeart />
        </span>

        {/* Share (Future Feature) */}
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default ProductInfo;
