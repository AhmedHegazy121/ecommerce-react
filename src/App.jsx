import React from "react";
import { Route, Routes, useLocation } from "react-router-dom"; // Added useLocation
import { AnimatePresence } from "framer-motion";
import { Toaster } from "react-hot-toast";

// Providers
import { ThemeProvider } from "./ThemeToggle";

// Layout Components
import TopHeader from "./components/header/TopHeader";
import BtmHeader from "./components/header/BtmHeader";
import ScrollToTop from "./components/ScrollToTop";

// Pages
import Home from "./pages/home/Home";
import Cart from "./pages/cart/Cart";
import FavoritesPage from "./pages/favorites/FavoritesPage";
import SearchResults from "./pages/search/SearchResults";
import ProductDetails from "./pages/productDetails/ProductDetails";
import CategoryPage from "./pages/categoryPage/CategoryPage";
import About from "./pages/about/About";
import Blog from "./pages/blog/Blog";
import Contact from "./pages/contact/Contact";
import SignIn from "./pages/authentication/SignIn";
import Register from "./pages/authentication/Register";

function App() {
  const location = useLocation();
  return (
    <ThemeProvider>
      {/* Global Toast - Updated to use your theme variables */}
      <Toaster
        position="bottom-right"
        toastOptions={{
          duration: 3000,
          style: {
            background: "var(--white_color)",
            color: "var(--color_heading)",
            border: "1px solid var(--border_color)",
            padding: "16px",
            borderRadius: "12px",
            fontSize: "14px",
          },
        }}
      />

      <header className="main-header">
        <TopHeader />
        <BtmHeader />
      </header>

      {/* Main content wrapper */}
      <main className="content-wrapper">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/products/:id" element={<ProductDetails />} />
            <Route path="/category/:category" element={<CategoryPage />} />
          </Routes>
        </AnimatePresence>
      </main>

      {/* You can add a Footer component here later */}
    </ThemeProvider>
  );
}

export default App;
