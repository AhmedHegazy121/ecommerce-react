import React from "react";

/* =============================================================================
   Slide Product Loading
   -----------------------------------------------------------------------------
   Displays a skeleton loading state while product data is being fetched.
   Placeholder cards mimic the final layout to reduce layout shifts.
============================================================================= */

function SlideProductLoading() {
  // Number of skeleton cards displayed while loading.
  const skeletonCards = Array.from({ length: 6 });

  return (
    <div className="loadingSlideProduct">
      <div className="slide_products slide">
        <div className="container">
          {/* ======================== Section Header ======================== */}
          <div className="top_slide">
            <h2 className="skeleton"></h2>
            <p className="skeleton"></p>
          </div>

          {/* ===================== Product Placeholders ===================== */}
          <div className="productsLoading">
            {skeletonCards.map((_, index) => (
              <div className="product" key={index}>
                <div className="img_product skeleton"></div>

                <div className="content skeleton"></div>

                <div className="content skeleton"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SlideProductLoading;
