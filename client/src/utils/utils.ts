import { Article as ArticleType } from '../context/siteContext';

export const removeDuplicates = (articles: ArticleType[]) => {
  // Remove articles with the same image or same title and return first 20
  const removed = articles.reduce((unique: ArticleType[], o) => {
    if (o) {
      if (
        !unique.some((obj) => obj.image === o.image || obj.title === o.title)
      ) {
        unique.push(o);
      }
    }
    return unique;
  }, []);

  return removed;
};
