import React, { useContext } from 'react';
import { siteContext } from '../context/siteContext';
import SkeletonList from './SkeletonList';
import InfiniteScroll from './InfiniteScroll';

const DisplayGrid: React.FC = () => {
  const { articles, isLoading, apiClosed } = useContext(siteContext);

  if (isLoading) {
    return (
      <main className="display-grid">
        <SkeletonList />
      </main>
    );
  }
  if (apiClosed) {
    return (
      <main className="display-grid">
        There are no articles due to api limit being exceeded for the day.
      </main>
    );
  }

  if (articles.length === 0) {
    return (
      <main className="display-grid">
        There are no articles to be displayed. Please try another search.
      </main>
    );
  }
  return (
    <main className="display-grid">
      <InfiniteScroll />
    </main>
  );
};

export default DisplayGrid;
