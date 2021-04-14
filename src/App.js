import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import CocktailPicker from "containers/CocktailPicker";
import DrinkDetails from "containers/DrinkDetails";
import Home from "containers/Home";
import NavBar from "components/NavBar";

import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
      <NavBar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/drinks">
            <CocktailPicker />
          </Route>
          <Route exact path="/drinks/:id">
            <DrinkDetails />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
