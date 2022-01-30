import "./App.css";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
