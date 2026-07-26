import React from "react";
import "./About.css";
import { ShieldCheck, Truck, Clock } from "lucide-react";
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

const About = () => {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1>Welcome to Our Store</h1>
        <p>
          Providing the best products across {categories.length} diverse
          categories.
        </p>
      </header>

      <section className="features-grid">
        <div className="feature-card">
          <ShieldCheck size={40} className="icon" />
          <h3>Secure Shopping</h3>
          <p>Your data security is our top priority with encrypted payments.</p>
        </div>
        <div className="feature-card">
          <Truck size={40} className="icon" />
          <h3>Fast Shipping</h3>
          <p>Global delivery to your doorstep within record time.</p>
        </div>
        <div className="feature-card">
          <Clock size={40} className="icon" />
          <h3>24/7 Support</h3>
          <p>Our dedicated team is always here to help you shop better.</p>
        </div>
      </section>

      <section className="categories-section">
        <h2>What We Offer</h2>
        <div className="category-list">
          {categories.map((cat) => (
            <span key={cat} className="category-pill">
              {cat.replace("-", " ")}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
