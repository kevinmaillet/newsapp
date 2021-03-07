const development = 'http://localhost:4000';

const production = 'https://api.newsapp.today';

export const config =
  process.env.NODE_ENV === 'development' ? development : production;
