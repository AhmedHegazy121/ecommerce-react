import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// Components
import PageTransition from "../../components/PageTransition";
import Product from "../../components/slideProducts/Product";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";

// API
import { getProductsByCategory } from "../../api/Product";

// Styles
import "./categoryPage.css";

/* =============================================================================
   Category Page
   -----------------------------------------------------------------------------
   Displays all products that belong to the selected category.
============================================================================= */

function CategoryPage() {
  const { category } = useParams();

  const [categoryProducts, setCategoryProducts] = useState({
    products: [],
    total: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCategoryProducts = async () => {
      try {
        setLoading(true);

        const data = await getProductsByCategory(category);

        setCategoryProducts(data);
      } catch (error) {
        console.error("Failed to load category products:", error);

        setCategoryProducts({
          products: [],
          total: 0,
        });
      } finally {
        setLoading(false);
      }
    };

    loadCategoryProducts();
  }, [category]);

  if (loading) {
    return (
      <PageTransition>
        <SlideProductLoading />
      </PageTransition>
    );
  }

  return (
    <PageTransition key={category}>
      <div className="category_products">
        <div className="container">
          <div className="top_slide">
            <h2>{category.replaceAll("-", " ")}</h2>

            <p>{categoryProducts.total} products available.</p>
          </div>

          <div className="products">
            {categoryProducts.products.length > 0 ? (
              categoryProducts.products.map((product) => (
                <Product key={product.id} item={product} />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </div>
      </div>
    </PageTransition>
  );
}

export default CategoryPage;
