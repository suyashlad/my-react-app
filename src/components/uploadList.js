import React from "react";

const UploadList = ({ articles }) => {
  return (
    <div>
      <h3>Uploaded Articles</h3>
      <ul>
        {articles.map((article, index) => (
          <li key={index}>{article}</li>
        ))}
      </ul>
    </div>
  );
};

export default UploadList;
