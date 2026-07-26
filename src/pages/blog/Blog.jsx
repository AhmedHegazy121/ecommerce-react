import React from "react";
import "./Blog.css";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "Modern Tech Trends",
      date: "July 2024",
      img: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=500",
    },
    {
      id: 2,
      title: "Choosing Furniture",
      date: "June 2024",
      img: "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=500",
    },
    {
      id: 3,
      title: "Skincare 101",
      date: "May 2024",
      img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=500",
    },
  ];

  return (
    <div className="blog-container">
      <h1 className="blog-title">Our Blog</h1>
      <div className="blog-grid">
        {posts.map((post) => (
          <article key={post.id} className="blog-item">
            <div className="blog-img-wrapper">
              <img src={post.img} alt={post.title} />
            </div>
            <div className="blog-info">
              <span className="blog-date">{post.date}</span>
              <h3>{post.title}</h3>
              <p>
                Discover the latest insights from our collection and industry
                experts...
              </p>
              <button className="blog-btn">Read Article</button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Blog;
