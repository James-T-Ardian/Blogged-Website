import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route Path = "/signin"><div>signin</div></Route>
        <Route Path = "/blog/:users"><div>users</div></Route>
      </Switch>
    </Router>
  );
}

export default App;
