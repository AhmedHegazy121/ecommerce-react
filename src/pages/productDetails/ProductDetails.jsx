import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import PageTransition from "../../components/PageTransition";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import ProductDetailsLoading from "./ProductDetailsLoading";
import ProductImages from "./ProductImages";
import ProductInfo from "./ProductInfo";

// API
import { getProduct, getProductsByCategory } from "../../api/Product";

// Styles
import "./productDetails.css";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);

  const [loading, setLoading] = useState(true);

  const [relatedProducts, setRelatedProducts] = useState([]);

  const [loadingRelatedProducts, setLoadingRelatedProducts] = useState(false);

  // =========================
  // Load Product
  // =========================

  useEffect(() => {
    async function loadProduct() {
      try {
        setLoading(true);

        const data = await getProduct(id);

        setProduct(data);
      } catch (error) {
        console.error("Failed to load product:", error);

        setProduct(null);
      } finally {
        setLoading(false);
      }
    }

    loadProduct();
  }, [id]);

  // =========================
  // Load Related Products
  // =========================

  useEffect(() => {
    async function loadRelatedProducts() {
      if (!product?.category) {
        setRelatedProducts([]);

        setLoadingRelatedProducts(false);

        return;
      }

      try {
        setLoadingRelatedProducts(true);

        const data = await getProductsByCategory(product.category);

        const filteredProducts = data.products.filter(
          (item) => item.id !== product.id,
        );

        setRelatedProducts(filteredProducts);
      } catch (error) {
        console.error("Failed to load related products:", error);

        setRelatedProducts([]);
      } finally {
        setLoadingRelatedProducts(false);
      }
    }

    loadRelatedProducts();
  }, [product?.category]);

  // =========================
  // Product Not Found
  // =========================

  if (!loading && !product) {
    return (
      <PageTransition>
        <p>Product not found.</p>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div>
        {/* ================= Product Details ================= */}

        {loading ? (
          <ProductDetailsLoading />
        ) : (
          <div className="item_details">
            <div className="container">
              {/* KEEPING YOUR COMPONENTS */}

              <ProductImages product={product} />

              <ProductInfo product={product} />
            </div>
          </div>
        )}

        {/* ================= Related Products ================= */}

        {product?.category &&
          (loadingRelatedProducts ? (
            <SlideProductLoading />
          ) : (
            relatedProducts.length > 0 && (
              <SlideProduct
                title={product.category.replace("-", " ")}
                data={relatedProducts}
              />
            )
          ))}
      </div>
    </PageTransition>
  );
}

export default ProductDetails;
