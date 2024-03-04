import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Helmet } from "react-helmet-async";
import "../../styles/super-admin-blog.css";

const SuperAdminBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [editableFields, setEditableFields] = useState([]);

  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch all blogs when the component mounts
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch("http://192.168.7.141:5000/blog");

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const blogsData = await response.json();

      // Initialize editableFields state with the fetched blogs
      setEditableFields(blogsData.map((blog) => ({ ...blog })));

      setBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs", error);
      setError("Error fetching blogs. Please try again later.");
    }
  };

  const handleInputChange = (e, index, field) => {
    const value = e.target.value;
    setEditableFields((prevFields) => {
      const updatedFields = [...prevFields];
      updatedFields[index][field] = value;
      return updatedFields;
    });
  };

  const handleFormSubmit = async (e, blog_id, index) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://192.168.7.141:5000/blog/${blog_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editableFields[index]),
      });

      if (response.ok) {
        toast.success("Blog updated successfully!");
      } else {
        console.error("Failed to update blog details");
      }
    } catch (error) {
      console.error("Error updating blog details", error);
    }
  };

  return (
    <div className="super-admin-blog">
      <Helmet>
        <title>Edit Blogs</title>
      </Helmet>
      <h1>Edit Blogs</h1>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <div>
          {blogs.map((blog, index) => (
            <form key={blog.blog_id} onSubmit={(e) => handleFormSubmit(e, blog.blog_id, index)}>
              <label>
                Blog Heading:
                <input
                  type="text"
                  name="blog_heading"
                  value={editableFields[index].blog_heading}
                  onChange={(e) => handleInputChange(e, index, "blog_heading")}
                />
              </label>
              <br />
              <label>
                Blog Description:
                <textarea
                 className="text-area"
                  type="text"
                  name="blog_description"
                  value={editableFields[index].blog_description}
                  onChange={(e) => handleInputChange(e, index, "blog_description")}
                />
              </label>
              <br />
              <label>
                Blog Date:
                <input
                  type="text"
                  name="blog_date"
                  value={editableFields[index].blog_date}
                  onChange={(e) => handleInputChange(e, index, "blog_date")}
                />
              </label>
              <br />
              <label>
                Blog Image URL:
                <input
                  type="text"
                  name="blog_img"
                  value={editableFields[index].blog_img}
                  onChange={(e) => handleInputChange(e, index, "blog_img")}
                />
              </label>
              <br />
              <button type="submit">Save Changes</button>
            </form>
          ))}
        </div>
      )}
    </div>
  );
};

export default SuperAdminBlog;
