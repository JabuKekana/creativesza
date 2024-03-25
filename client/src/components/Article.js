import React, { useState, useEffect } from 'react';
import '../styles/article.css';

export const Article = () => {
  const [blog, setBlog] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
  const fetchBlog = async () => {
    try {
      const response = await fetch("http://localhost:5000/blog");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blogsData = await response.json();

      // Use the first blog in the array
      const firstBlog = blogsData[0];
      setBlog(firstBlog);
    } catch (error) {
      setError("Article Will be available soon.");
    }
  };

  fetchBlog();
}, []);


  const { blog_heading, blog_description, blog_date, blog_img } = blog;

  return (
    <div className="article-section" id="blog">
      <div className="article">
        <div className="img-article-container" style={{ backgroundImage: `url(${blog_img})` }}>
        </div>
        <div className="article-content">
          <h1>{blog_heading}</h1>
          <p className="description">{blog_description}</p>
          <p className="author">{blog_date}</p>
        </div>
      </div>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};
