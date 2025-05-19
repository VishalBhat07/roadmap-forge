const RenderStructuredContent = ({ content }) => {
  return (
    <div>
      {content?.map((block, index) => {
        if (block.h2) return <h2 key={index}>{block.h2}</h2>;
        if (block.p) return <p key={index}>{block.p}</p>;
        if (block.ul)
          return (
            <ul key={index}>
              {block.ul.map((item, i) => (
                <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
              ))}
            </ul>
          );
        if (block.code)
          return (
            <pre key={index}>
              <code className={`language-${block.code.language}`}>
                {block.code.content}
              </code>
            </pre>
          );
        return null;
      })}
    </div>
  );
};

export default RenderStructuredContent;
