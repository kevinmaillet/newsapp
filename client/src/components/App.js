import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import Search from "./Search";
import GA from "./GA";



const App = () => {
  return (
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
  );
};

export default App;
