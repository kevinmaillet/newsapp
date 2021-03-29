import React, { createContext, useState } from 'react';

interface Source {
  name: string;
  url: string;
}

export interface Article {
  url: string;
  image: string;
  title: string;
  description: string;
  publishedAt: Date;
  source: Source;
}

interface initialSiteProps {
  articles: Article[];
  setArticles: (articles: Article[]) => void;
  apiClosed: boolean;
  setapiClosed: (apiClosed: boolean) => void;
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
}

const initialSite = {
  articles: [],
  setArticles: () => null,
  apiClosed: false,
  setapiClosed: () => null,
  isLoading: false,
  setLoading: () => null,
};

export const siteContext = createContext<initialSiteProps>(initialSite);

export const SiteProvider = ({ children }: { children: any }) => {
  const [articles, setArticles] = useState<Article[] | []>(
    initialSite.articles
  );
  const [apiClosed, setapiClosed] = useState(false);
  const [isLoading, setLoading] = useState(false);

  return (
    <siteContext.Provider
      value={{
        ...initialSite,
        articles,
        setArticles,
        apiClosed,
        setapiClosed,
        isLoading,
        setLoading,
      }}
    >
      {children}
    </siteContext.Provider>
  );
};
