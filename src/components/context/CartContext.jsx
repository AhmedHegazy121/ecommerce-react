import React, { createContext, useEffect, useState } from "react";

/* =============================================================================
   Cart Context
   -----------------------------------------------------------------------------
   Manages:
   - Shopping cart
   - Favorites
   - Local storage persistence
============================================================================= */

export const CartContext = createContext();

function CartProvider({ children }) {
  /* --------------------------------------------------------------------------
     Favorites State
  -------------------------------------------------------------------------- */

  const [favorites, setFavorites] = useState(() => {
    const savedFavorites = localStorage.getItem("favoritesItems");
    return savedFavorites ? JSON.parse(savedFavorites) : [];
  });

  /* --------------------------------------------------------------------------
     Cart State
  -------------------------------------------------------------------------- */

  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("cartItems");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /* --------------------------------------------------------------------------
     Favorites Actions
  -------------------------------------------------------------------------- */

  const addToFavorites = (item) => {
    setFavorites((currentFavorites) => {
      if (currentFavorites.some((fav) => fav.id === item.id)) {
        return currentFavorites;
      }

      return [...currentFavorites, item];
    });
  };

  const removeFromFavorites = (id) => {
    setFavorites((currentFavorites) =>
      currentFavorites.filter((item) => item.id !== id),
    );
  };

  /* --------------------------------------------------------------------------
     Cart Actions
  -------------------------------------------------------------------------- */

  const addToCart = (item) => {
    setCartItems((currentItems) => [
      ...currentItems,
      {
        ...item,
        quantity: 1,
      },
    ]);
  };

  const increaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id) => {
    setCartItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item,
      ),
    );
  };

  const removeFromCart = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item.id !== id),
    );
  };

  /* --------------------------------------------------------------------------
     Persist Data
  -------------------------------------------------------------------------- */

  useEffect(() => {
    localStorage.setItem("favoritesItems", JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        favorites,

        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,

        addToFavorites,
        removeFromFavorites,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;
