import React, { useState } from "react";
import { PlusCircle, MessageSquare, ExternalLink } from "lucide-react";
import styles from "./Community.module.css";
import AllPosts from "./AllPosts";
import CreatePost from "../../components/CreatePost/CreatePost";
import { toast } from "react-toastify";

const Community = () => {
  const [addPost, showAddPost] = useState(false);
  const currentUser = JSON.parse(localStorage.getItem("loginState"));

  const handleJoinDiscord = () => {
    window.open(import.meta.env.VITE_DISCORD_SERVER_ID, "_blank");
    toast.success("Opening Discord invite in a new tab!");
  };

  return (
    <div className={styles.communityWrapper}>
      <div className={styles.communityHeader}>
        <h1 className={styles.communityTitle}>Community</h1>
        <div className={styles.buttons}>
          <button
            className={styles.addPostBtn}
            onClick={() => {
              console.log(currentUser);
              !currentUser
                ? toast.error("You need to login first")
                : showAddPost(true);
            }}
            aria-label="Add new post"
          >
            <PlusCircle size={20} />
            <span style={{ fontSize: "14px" }}>Create Post</span>
          </button>
          <button
            className={styles.discordBtn}
            onClick={handleJoinDiscord}
            aria-label="Join our Discord server"
          >
            <MessageSquare size={18} />
            <span>Join Discord</span>
            <ExternalLink size={14} />
          </button>
        </div>
      </div>

      {addPost && <CreatePost showAddPost={showAddPost} />}
      <AllPosts />
    </div>
  );
};

export default Community;
