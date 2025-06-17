import React, { useState } from "react";
import styles from "./Roadmaps.module.css";
import roadmaps from "./roadmaps";
import Card from "./Card";

const Roadmaps = () => {
  const [search, setSearch] = useState("");

  const filtered = roadmaps.filter((roadmap) =>
    roadmap.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.pageTitle}>Explore Developer Roadmaps</h1>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchInput}
        placeholder="🔍 Search by title or skill..."
        aria-label="Search roadmaps"
      />

      <div className={styles.grid}>
        {filtered.length > 0 ? (
          filtered.map((roadmap) => <Card key={roadmap.id} {...roadmap} />)
        ) : (
          <div className={styles.noResults}>🚫 No roadmaps found!</div>
        )}
      </div>
    </div>
  );
};

export default Roadmaps;
