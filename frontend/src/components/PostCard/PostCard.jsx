import React from "react";
import styles from "./PostCard.module.css";
import {
  ThumbsUp,
  ThumbsDown,
  Eye,
  MessageSquare,
  Pin,
  Clock,
} from "lucide-react";

const PostCard = ({ post }) => {
  const {
    title,
    content,
    author,
    category,
    tags,
    createdAt,
    status,
    upvotes,
    downvotes,
    viewCount,
    commentCount,
    attachments,
    pinned,
    lastActivity,
  } = post;

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });

  return (
    <div className={`${styles.card} ${pinned ? styles.pinned : ""}`}>
      {pinned && (
        <div className={styles.pinnedBadge}>
          <Pin size={16} />
          <span>Pinned</span>
        </div>
      )}

      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <div className={styles.meta}>
          <div className={styles.authorAvatar}>
            {author?.username ? author.username[0].toUpperCase() : "U"}
          </div>
          <div className={styles.metaInfo}>
            <span className={styles.author}>
              by <strong>{author?.username}</strong>
            </span>
            <div className={styles.categoryAndDate}>
              <span className={styles.category}>{category}</span>
              <span className={styles.date}>
                <Clock size={14} />
                {formatDate(createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.contentContainer}>
        <p className={styles.content}>{content}</p>
      </div>

      {tags?.length > 0 && (
        <div className={styles.tags}>
          {tags.map((tag, i) => (
            <span key={i} className={styles.tag}>
              #{tag}
            </span>
          ))}
        </div>
      )}

      {attachments?.length > 0 && (
        <div className={styles.attachments}>
          <h4 className={styles.attachmentsTitle}>Attachments</h4>
          <ul className={styles.attachmentsList}>
            {attachments.map((att, i) => (
              <li key={i} className={styles.attachmentItem}>
                <a
                  href={att.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className={styles.attachmentLink}
                >
                  {att.name} ({(att.size / 1024).toFixed(2)} KB)
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.stats}>
        <div className={styles.statItem}>
          <ThumbsUp size={16} />
          <span>{upvotes}</span>
        </div>
        <div className={styles.statItem}>
          <ThumbsDown size={16} />
          <span>{downvotes}</span>
        </div>
        <div className={styles.statItem}>
          <Eye size={16} />
          <span>{viewCount}</span>
        </div>
        <div className={styles.statItem}>
          <MessageSquare size={16} />
          <span>{commentCount}</span>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.lastActivity}>
          <Clock size={14} />
          <span>Last activity: {formatDate(lastActivity)}</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
