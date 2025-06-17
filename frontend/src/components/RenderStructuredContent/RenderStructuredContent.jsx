// RenderStructuredContent.jsx
import React, { useEffect } from "react";
import styles from "./RenderStructuredContent.module.css";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

const RenderStructuredContent = ({ content }) => {
  useEffect(() => {
    Prism.highlightAll();
  }, [content]);

  // Helper function to render markdown-style links
  const renderWithLinks = (text) => {
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    return text.replace(
      linkRegex,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="' +
        styles.link +
        '">$1</a>'
    );
  };

  return (
    <div className={styles.container}>
      {content?.map((block, index) => {
        if (block.h2)
          return (
            <div key={index} className={styles.headingWrapper}>
              <h2 className={styles.heading}>{block.h2}</h2>
              <div className={styles.headingUnderline}></div>
            </div>
          );

        if (block.p)
          return (
            <p
              key={index}
              className={styles.paragraph}
              dangerouslySetInnerHTML={{ __html: renderWithLinks(block.p) }}
            />
          );

        if (block.ul)
          return (
            <div key={index} className={styles.listWrapper}>
              <ul className={styles.list}>
                {block.ul.map((item, i) => (
                  <li
                    key={i}
                    className={styles.listItem}
                    dangerouslySetInnerHTML={{ __html: renderWithLinks(item) }}
                  />
                ))}
              </ul>
            </div>
          );

        if (block.code)
          return (
            <div key={index} className={styles.codeWrapper}>
              <div className={styles.codeHeader}>
                <span className={styles.codeLanguage}>
                  {block.code.language}
                </span>
              </div>
              <pre className={`${styles.codeBlock} line-numbers`}>
                <code className={`language-${block.code.language}`}>
                  {block.code.content}
                </code>
              </pre>
            </div>
          );

        if (block.img)
          return (
            <div key={index} className={styles.imageContainer}>
              <div className={styles.imageWrapper}>
                <img
                  src={block.img.src}
                  alt={block.img.alt}
                  className={styles.image}
                />
              </div>
              <p className={styles.imageCaption}>{block.img.alt}</p>
            </div>
          );

        return null;
      })}
    </div>
  );
};

export default RenderStructuredContent;
