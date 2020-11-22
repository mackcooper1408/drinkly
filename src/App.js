import DrinksList from "./DrinksList";
import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import DrinkDetails from "./DrinkDetails";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Switch>
          <Route exact path="/drinks">
            <DrinksList />
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
