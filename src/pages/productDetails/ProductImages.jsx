import React, { useEffect, useState } from "react";

/* =============================================================================
   Product Images
   -----------------------------------------------------------------------------
   Displays the main product image along with a gallery of thumbnails.
   Clicking a thumbnail updates the preview image.
============================================================================= */

function ProductImages({ product }) {
  /* --------------------------------------------------------------------------
     Selected Image
     --------------------------------------------------------------------------
     Stores the image currently displayed as the main preview.
  -------------------------------------------------------------------------- */
  const [selectedImage, setSelectedImage] = useState(product.images[0]);

  /* --------------------------------------------------------------------------
     Reset Preview
     --------------------------------------------------------------------------
     Whenever a different product is loaded, reset the preview
     to the first available image.
  -------------------------------------------------------------------------- */
  useEffect(() => {
    setSelectedImage(product.images[0]);
  }, [product]);

  return (
    <div className="imgs_item">
      {/* ======================= Main Image ======================== */}
      <div className="big_img">
        <img src={selectedImage} alt={product.title} />
      </div>

      {/* ===================== Thumbnail Gallery =================== */}
      <div className="sm_img">
        {product.images.map((image, index) => (
          <div className="img_div_sm" key={index}>
            <img
              src={image}
              alt={`${product.title} ${index + 1}`}
              onClick={() => setSelectedImage(image)}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductImages;
