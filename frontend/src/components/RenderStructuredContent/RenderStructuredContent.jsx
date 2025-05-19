// RenderStructuredContent.jsx
import React, { useEffect } from "react";
import styles from "./RenderStructuredContent.module.css";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css"; // You can customize this or import another theme

const RenderStructuredContent = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  return (
    <div className={styles.container}>
      {content?.map((block, index) => {
        if (block.h2)
          return (
            <h2 key={index} className={styles.heading}>
              {block.h2}
            </h2>
          );
        if (block.p)
          return (
            <p key={index} className={styles.paragraph}>
              {block.p}
            </p>
          );
        if (block.ul)
          return (
            <ul key={index} className={styles.list}>
              {block.ul.map((item, i) => (
                <li
                  key={i}
                  className={styles.listItem}
                  dangerouslySetInnerHTML={{ __html: item }}
                />
              ))}
            </ul>
          );
        if (block.code)
          return (
            <pre key={index} className={styles.codeBlock}>
              <code className={`language-${block.code.language}`}>
                {block.code.content}
              </code>
            </pre>
          );
        if (block.img)
          return (
            <div key={index} className={styles.imageContainer}>
              <img
                src={block.img.src}
                alt={block.img.alt}
                className={styles.image}
              />
              <p className={styles.imageCaption}>{block.img.alt}</p>
            </div>
          );
        return null;
      })}
    </div>
  );
};

export default RenderStructuredContent;
