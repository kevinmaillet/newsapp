import { Article as ArticleType } from '../context/siteContext';


export const removeDuplicatesandSort = (articles: ArticleType[]) => {
  // Remove articles with the same image or same title and sort by newest to oldest
  return articles.reduce((unique: ArticleType[], o) => {
    if (o) {
      if (
        !unique.some((obj) => obj.image === o.image || obj.title === o.title)
      ) {
        unique.push(o);
      }
    }
    return unique;
  }, []);

};
