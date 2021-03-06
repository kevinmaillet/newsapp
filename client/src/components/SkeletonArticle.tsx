import React from 'react';

const SkeletonArticle: React.FC = () => {
  return (
    <div className="article skeleton-article">
      <div className="skeleton-article__image" />
      <div className="skeleton-article__subtitle" />
      <div className="skeleton-article__title" />
    </div>
  );
};

export default SkeletonArticle;
