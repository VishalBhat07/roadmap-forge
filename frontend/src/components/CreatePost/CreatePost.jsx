import React, { useState } from "react";
import styles from "./CreatePost.module.css";

const CreatePost = ({ showAddPost }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    category: "",
    tags: "",
  });
  const backendURL = import.meta.env.VITE_BACKENDURL;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const currentUser = JSON.parse(localStorage.getItem("loginState"));
    const author = {
      userId: currentUser.user._id,
      username: currentUser.user.username,
    };

    const payload = {
      ...formData,
      tags: formData.tags.split(",").map((tag) => tag.trim()),
      createdAt: Date.now(),
      updatedAt: Date.now(),
      lastActivity: Date.now(),
      author: author,
    };

    try {
      const res = await fetch(backendURL + "/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      if (res.ok) {
        alert("Post created successfully!");
      } else {
        alert("Failed to create post");
      }

      showAddPost(false);
    } catch (err) {
      console.error("Error submitting post:", err);
      alert("Error while creating post");
    }
  };

  return (
    <div className={styles.formContainer}>
      <button className={styles.closeBtn} onClick={() => showAddPost(false)}>
        ✖
      </button>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label>
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Content:
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows="4"
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </label>
        <label>
          Tags (comma-separated):
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </label>
        <button type="submit" className={styles.submitBtn}>
          Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
