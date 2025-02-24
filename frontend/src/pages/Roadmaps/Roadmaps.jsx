import React, { useState } from "react";
import styles from "./Roadmaps.module.css";
import roadmaps from "./roadmaps.js";
import Card from "./Card.jsx";

const Roadmaps = () => {
  const [search, setSearch] = useState("");

  const searchQuery = search.toLowerCase();

  const filteredSearch = roadmaps.filter((roadmap) => {
    return roadmap.title.toLowerCase().startsWith(searchQuery);
  });

  return (
    <>
      <div className={styles.searchbar}>
        <input
          type="text"
          name="search"
          value={search}
          className={styles.text}
          onChange={(e) => {
            console.log(search);
            setSearch(e.target.value);
          }}
          placeholder="Search roadmaps..."
        />
      </div>
      <div className={styles.container}>
        {filteredSearch.length > 0 ? (
          filteredSearch.map((roadmap) => (
            <Card
              id={roadmap.id}
              key={roadmap.id}
              title={roadmap.title}
              description={roadmap.description}
              difficulty={roadmap.difficulty}
              duration={roadmap.duration}
            />
          ))
        ) : (
          <p>No roadmaps found !!</p>
        )}
      </div>
    </>
  );
};

export default Roadmaps;
