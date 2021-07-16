import React, { VFC } from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import { Home } from "~/components/Home";

import "~/styles/index.css";


const Index: VFC = () => {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

ReactDOM.render(<Index />, document.getElementById("index"));
