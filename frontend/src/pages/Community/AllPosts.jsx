import React, { useEffect, useState } from "react";
import { Loader, MessageSquare } from "lucide-react";
import fetchAllPosts from "../../util/fetchAllPosts";
import PostCard from "../../components/PostCard/PostCard";
import styles from "./AllPosts.module.css";

const AllPosts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetchAllPosts();
      if (res) setPosts(res);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className={styles.allPostsWrapper}>
      {loading ? (
        <div className={styles.loadingContainer}>
          <Loader className={styles.loadingIcon} size={32} />
          <p>Loading posts...</p>
        </div>
      ) : posts.length === 0 ? (
        <div className={styles.emptyState}>
          <MessageSquare size={48} />
          <h2>No posts available</h2>
          <p>Be the first to start a conversation!</p>
        </div>
      ) : (
        <>
          <div className={styles.postsHeader}>
            <h2>All Posts</h2>
            <span className={styles.postCount}>{posts.length} posts</span>
          </div>
          <div className={styles.postsGrid}>
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default AllPosts;
