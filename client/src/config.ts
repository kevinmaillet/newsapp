const development = {
  url: 'http://localhost:4000',
};

const production = {
  url: 'https://api.newsapp.today',
};

export const config =
  process.env.NODE_ENV === 'development' ? development : production;
