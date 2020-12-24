import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DrinkDetails from "./DrinkDetails";
import Home from "./Home";
import NavBar from "./NavBar";
import CocktailPicker from "./CocktailPicker";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
      </BrowserRouter>
    </div>
  );
}

export default App;
