import React from 'react';
import ReactGA from 'react-ga';
import { useHistory } from 'react-router-dom';

const GA: React.FC = ({ children }) => {
  const history = useHistory();

  // Initialize google analytics page view tracking
  history.listen((location) => {
    ReactGA.initialize('UA-179663178-1');
    ReactGA.set({ page: location.pathname }); // Update the user's current page
    ReactGA.pageview(location.pathname); // Record a pageview for the given page
  });

  return <>{children}</>;
};

export default GA;
