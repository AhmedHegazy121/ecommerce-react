import React, { useContext } from "react";

// Icons
import { FaTrashAlt } from "react-icons/fa";

// Components
import PageTransition from "../../components/PageTransition";

// Context
import { CartContext } from "../../components/context/CartContext";

// Styles
import "./cart.css";

/* =============================================================================
   Shopping Cart
   -----------------------------------------------------------------------------
   Displays all products added to the cart, allows quantity updates,
   item removal, and shows the order summary.
============================================================================= */

function Cart() {
  /* --------------------------------------------------------------------------
     Cart Context
     --------------------------------------------------------------------------
     Provides cart data along with helper functions for updating
     quantities and removing products.
  -------------------------------------------------------------------------- */
  const { cartItems, increaseQuantity, decreaseQuantity, removeFromCart } =
    useContext(CartContext);

  /* --------------------------------------------------------------------------
     Order Total
     --------------------------------------------------------------------------
     Calculate the total price of all products in the cart.
  -------------------------------------------------------------------------- */
  const total = cartItems
    .reduce((totalPrice, item) => totalPrice + item.price * item.quantity, 0)
    .toFixed(2);

  return (
    <PageTransition>
      <div className="checkout">
        <div className="orderSummary">
          {/* ===================== Page Header ===================== */}
          <h1>Order Summary</h1>

          {/* ===================== Cart Items ====================== */}
          <div className="items">
            {cartItems.length === 0 ? (
              <p>Your cart is empty.</p>
            ) : (
              cartItems.map((item) => (
                <div className="item_cart" key={item.id}>
                  <div className="image_name">
                    {/* Product Image */}
                    <div className="img_item">
                      <img src={item.images[0]} alt={item.title} />
                    </div>

                    {/* Product Details */}
                    <div className="content">
                      <h4>{item.title}</h4>

                      <p className="price_item">${item.price}</p>

                      {/* Quantity Controls */}
                      <div className="quantity_control">
                        <button onClick={() => decreaseQuantity(item.id)}>
                          -
                        </button>

                        <span className="quantity">{item.quantity}</span>

                        <button onClick={() => increaseQuantity(item.id)}>
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Item */}
                  <button
                    className="delete_item"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrashAlt />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* ==================== Order Summary ==================== */}
          <div className="bottom_summary">
            <div className="shop_table">
              <p>Total:</p>

              <span className="total_checkout">${total}</span>
            </div>

            <div className="button_div">
              <button type="button">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default Cart;
