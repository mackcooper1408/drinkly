import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import DrinkDetails from "./DrinkDetails";
import Home from "./Home";
import NavBar from "./NavBar";
import CocktailPicker from "./CocktailPicker";

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
