import React, { createContext, useContext, useEffect, useState } from "react";

/* =============================================================================
   Theme Context
   -----------------------------------------------------------------------------
   Provides the current application theme and exposes a function
   to toggle between light and dark modes.
============================================================================= */

const ThemeContext = createContext();

/* =============================================================================
   Theme Provider
============================================================================= */

export function ThemeProvider({ children }) {
  /* --------------------------------------------------------------------------
     Theme State
     --------------------------------------------------------------------------
     Initialize the theme using the following priority:
     1. Saved user preference (localStorage)
     2. System color scheme preference
     3. Light theme (fallback)
  -------------------------------------------------------------------------- */
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme) {
      return savedTheme;
    }

    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;

    return prefersDark ? "dark" : "light";
  });

  /* --------------------------------------------------------------------------
     Persist Theme
     --------------------------------------------------------------------------
     Update the document attribute and save the selected theme
     whenever it changes.
  -------------------------------------------------------------------------- */
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  /* --------------------------------------------------------------------------
     Toggle Theme
  -------------------------------------------------------------------------- */
  const toggleTheme = () => {
    setTheme((currentTheme) => (currentTheme === "light" ? "dark" : "light"));
  };

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

/* =============================================================================
   Custom Hook
   -----------------------------------------------------------------------------
   Provides easy access to the Theme Context.
============================================================================= */

export function useTheme() {
  return useContext(ThemeContext);
}
