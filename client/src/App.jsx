import './App.css';
import React from "react";
import Home from "./routes/Home";
import Classes from "./routes/Classes";
import Resources from "./routes/Resources";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import { CompatRouter } from "react-router-dom-v5-compat";
import {UniversitiesContextProvider} from "./context/UniversitiesContext"

const App = () => {
  return( 
    <UniversitiesContextProvider>
      <div className = "container">
        <Router>
          <Switch>
            <Route exact path = "/" component= {Home}/>
            <Route exact path = "/universities/:id/resources" component = {Resources}/>
            <Route exact path = "/universities/:id" component = {Home}/> 
          </Switch>
        </Router>
      </div>
    </UniversitiesContextProvider>
  )
}

export default App;
