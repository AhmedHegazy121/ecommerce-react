import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

/* =============================================================================
   Scroll To Top
   -----------------------------------------------------------------------------
   Automatically scrolls the window to the top whenever the route changes.
============================================================================= */

function ScrollToTop() {
  /* --------------------------------------------------------------------------
     Current Route
  -------------------------------------------------------------------------- */
  const { pathname } = useLocation();

  /* --------------------------------------------------------------------------
     Scroll Restoration
     --------------------------------------------------------------------------
     Reset the scroll position after every navigation.
  -------------------------------------------------------------------------- */
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pathname]);

  // This component renders no UI.
  return null;
}

export default ScrollToTop;
