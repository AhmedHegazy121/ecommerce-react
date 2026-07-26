import React from "react";

/* =============================================================================
   Product Details Loading
   -----------------------------------------------------------------------------
   Displays a skeleton placeholder while the product details
   are being fetched from the API.
============================================================================= */

function ProductDetailsLoading() {
  // Number of placeholder text lines displayed during loading.
  const skeletonLines = Array.from({ length: 5 });

  return (
    <div className="loading_item">
      <div className="item_details">
        <div className="container">
          {/* ===================== Product Image ===================== */}
          <div className="imgs_item skeleton"></div>

          {/* ================= Product Information ================== */}
          <div className="details_item">
            {skeletonLines.map((_, index) => (
              <h5 key={index} className="loading_textDetailsItem skeleton"></h5>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsLoading;
