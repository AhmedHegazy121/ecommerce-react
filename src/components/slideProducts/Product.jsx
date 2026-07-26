import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// Icons
import { IoStarSharp } from "react-icons/io5";
import { IoIosStarHalf } from "react-icons/io";
import { BsCart4 } from "react-icons/bs";
import { CiHeart } from "react-icons/ci";
import { FaShare, FaCheck } from "react-icons/fa";

// Context
import { CartContext } from "../context/CartContext";

/* =============================================================================
   Product Card
   -----------------------------------------------------------------------------
   Displays a single product with its image, price, rating, and actions
   such as adding to the cart or favorites.
============================================================================= */

function Product({ item }) {
  /* --------------------------------------------------------------------------
     Navigation
  -------------------------------------------------------------------------- */
  const navigate = useNavigate();

  /* --------------------------------------------------------------------------
     Cart & Favorites Context
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
  -------------------------------------------------------------------------- */
  const isInCart = cartItems.some((product) => product.id === item.id);
  const isInFav = favorites.some((product) => product.id === item.id);

  /* --------------------------------------------------------------------------
     Add Product to Cart
  -------------------------------------------------------------------------- */
  const handleAddToCart = () => {
    // 1. Blocks duplicate additions and stops accidental double toast alerts
    if (isInCart) return;

    addToCart(item);

    toast.success(
      <div className="toast_wrapper">
        <img src={item.images[0]} alt={item.title} className="toast_img" />

        <div className="toast_content">
          <strong>{item.title}</strong>
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
  -------------------------------------------------------------------------- */
  const handleAddToFav = () => {
    if (isInFav) {
      removeFromFavorites(item.id);
      toast.error(`${item.title} Removed From Favorites`);
      return;
    }

    addToFavorites(item);
    toast.success(`${item.title} Added to Favorites`);
  };

  return (
    <div className={`product ${isInCart ? "in_cart" : ""}`}>
      {/* ======================= Product Details ======================= */}
      <Link to={`/products/${item.id}`}>
        {/* Cart Status */}
        <span className="status_cart">
          <FaCheck /> In Cart
        </span>

        {/* Product Image */}
        <div className="img_product">
          <img src={item.images[0]} alt={item.title} />
        </div>

        {/* Product Name */}
        <p className="name_product">{item.title}</p>

        {/* Product Rating */}
        <div className="stars">
          <IoStarSharp />
          <IoStarSharp />
          <IoStarSharp />
          <IoStarSharp />
          <IoIosStarHalf />
        </div>

        {/* Product Price */}
        <p className="price">
          <span>${item.price}</span>
        </p>
      </Link>

      {/* ======================== Product Actions ====================== */}
      <div className="icons">
        {/* Add to Cart */}
        <span
          className="btn_cart"
          onClick={handleAddToCart}
          // 2. Cursor changes to default arrow once the item is added to the cart
          style={{ cursor: isInCart ? "default" : "pointer" }}
        >
          <BsCart4 />
        </span>

        {/* Add / Remove Favorite */}
        <span
          className={isInFav ? "in_fav" : ""}
          onClick={handleAddToFav}
          // 3. Keeps pointer dynamic since clicking it again toggles the removal state
          style={{ cursor: "pointer" }}
        >
          <CiHeart />
        </span>

        {/* Share Product (Future Feature) */}
        <span>
          <FaShare />
        </span>
      </div>
    </div>
  );
}

export default Product;
