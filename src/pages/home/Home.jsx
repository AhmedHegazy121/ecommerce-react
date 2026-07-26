import React, { useEffect, useState } from "react";
import HeroSilder from "../../components/HeroSilder";
import PageTransition from "../../components/PageTransition";
import SlideProduct from "../../components/slideProducts/SlideProduct";
import SlideProductLoading from "../../components/slideProducts/SlideProductLoading";
import { getProductsByCategory } from "../../api/Product";
import "./home.css";

const categories = [
  "smartphones",
  "mobile-accessories",
  "tablets",
  "laptops",
  "vehicle",
  "motorcycle",
  "mens-watches",
  "sports-accessories",
  "womens-jewellery",
  "womens-watches",
  "beauty",
  "skin-care",
  "furniture",
  "kitchen-accessories",
];

function Home() {
  const [products, setProducts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        const results = await Promise.all(
          categories.map(async (category) => {
            const data = await getProductsByCategory(category);
            return { [category]: data.products };
          }),
        );
        setProducts(Object.assign({}, ...results));
      } catch (error) {
        console.error("Failed to load home products:", error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  return (
    <PageTransition>
      <div className="home_page">
        {/* Hero Section */}
        <section className="hero_section">
          <HeroSilder />
        </section>

        {/* Products Sections */}
        <div className="home_content">
          {loading
            ? categories.map((category) => (
                <SlideProductLoading key={category} />
              ))
            : categories.map(
                (category) =>
                  products[category] && (
                    <SlideProduct
                      key={category}
                      title={category.replace("-", " ")}
                      data={products[category]}
                    />
                  ),
              )}
        </div>
      </div>
    </PageTransition>
  );
}

export default Home;
