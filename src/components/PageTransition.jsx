import React from "react";
import { motion } from "framer-motion";

/* =============================================================================
   Page Transition
   -----------------------------------------------------------------------------
   Wraps page content with a fade-and-slide animation to create smooth
   transitions between routes.
============================================================================= */

function PageTransition({ children }) {
  return (
    <motion.div
      /* Initial state before the component enters */
      initial={{
        opacity: 0,
        y: 20,
      }}
      /* Animation when the component is mounted */
      animate={{
        opacity: 1,
        y: 0,
      }}
      /* Animation when the component is unmounted */
      exit={{
        opacity: 0,
        y: -20,
      }}
      /* Animation timing */
      transition={{
        duration: 0.3,
      }}
    >
      {children}
    </motion.div>
  );
}

export default PageTransition;
