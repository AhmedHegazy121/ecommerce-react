import React, { useEffect, useState, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { getCategories } from "../../api/Product";
import { IoMdMenu, IoMdArrowDropdown, IoMdClose } from "react-icons/io";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus, FaRegUser } from "react-icons/fa";
import { TbLogout } from "react-icons/tb";

const navLinks = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Blog", link: "/blog" },
  { title: "Contact", link: "/contact" },
];

function BtmHeader() {
  const location = useLocation();
  const [categories, setCategories] = useState([]);
  const [isCatOpen, setIsCatOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null); // Mock user

  const mobileMenuRef = useRef(null);
  const categoryRef = useRef(null);

  // Automatically close both menus on location/route change
  useEffect(() => {
    setIsCatOpen(false);
    setIsMenuOpen(false);
  }, [location]);

  //Listen for clicks outside the category list to close it
  useEffect(() => {
    function handleOutsideClick(event) {
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setIsCatOpen(false);
      }
    }

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    async function loadCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadCategories();
  }, []);

  return (
    <div className="btm_header">
      <div className="container">
        {/* Hamburger Button (Visible ONLY on Mobile) */}
        <button className="mobile_menu_btn" onClick={() => setIsMenuOpen(true)}>
          <IoMdMenu />
        </button>

        {/* NAVIGATION DRAWER */}
        <div
          ref={mobileMenuRef}
          className={`nav_wrapper ${isMenuOpen ? "mobile_active" : ""}`}
        >
          <div className="drawer_header">
            <h3>Menu</h3>
            <button className="close_btn" onClick={() => setIsMenuOpen(false)}>
              <IoMdClose />
            </button>
          </div>

          <ul className="nav_links">
            {navLinks.map((item) => (
              <li
                key={item.link}
                className={location.pathname === item.link ? "active" : ""}
              >
                <Link to={item.link}>{item.title}</Link>
              </li>
            ))}
          </ul>

          {/* SINGLE CATEGORY DROPDOWN */}
          {/* 4. Attached categoryRef wrapper here */}
          <div className="category_nav" ref={categoryRef}>
            <div
              className="category_btn"
              onClick={() => setIsCatOpen(!isCatOpen)}
            >
              <IoMdMenu /> <p>Category</p> <IoMdArrowDropdown />
            </div>
            <div className={`category_nav_list ${isCatOpen ? "active" : ""}`}>
              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  to={`category/${cat.slug}`}
                  // 5. Closes category lists and menus simultaneously when clicked
                  onClick={() => {
                    setIsCatOpen(false);
                    setIsMenuOpen(false);
                  }}
                >
                  {cat.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* AUTH ACTIONS */}
        <div className="sign_regs">
          {user ? (
            <>
              <Link to="/profile">
                <FaRegUser />
              </Link>
              <button className="logout_btn">
                <TbLogout />
              </button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <PiSignInBold />
              </Link>
              <Link to="/register">
                <FaUserPlus />
              </Link>
            </>
          )}
        </div>
      </div>
      {/* Overlay to close menu when clicking outside */}
      {isMenuOpen && (
        <div
          className="menu_overlay"
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}
    </div>
  );
}

export default BtmHeader;
