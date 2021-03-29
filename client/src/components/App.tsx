import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SiteProvider } from '../context/siteContext';
import Layout from './Layout';
import Home from './Home';
import Search from './Search';
import GA from './GA';

const App: React.FC = () => {
  return (
    <SiteProvider>
      <Router>
        <GA>
          <Layout>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route exact path="/:id" component={Search} />
            </Switch>
          </Layout>
        </GA>
      </Router>
    </SiteProvider>
  );
};

export default App;
