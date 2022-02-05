import "./App.css";
import { useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UsersManagement from "./pages/UsersManagement";
import AdminRoute from "./guards/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import shape from "./theme/shape";
import palette from "./theme/palette";
import typography from "./theme/typography";
import shadows, { customShadows } from "./theme/shadows";

function App() {
  const themeOptions = useMemo(
    () => ({
      palette,
      shape,
      typography,
      shadows,
      customShadows,
    }),
    []
  );

  const theme = createTheme(themeOptions);
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route exact path={["/admin/users/list"]}>
            <AdminLayout>
              {" "}
              <AdminRoute
                exact
                path="/admin/users/list"
                component={UsersManagement}
              />
              {/* <AdminRoute
              exact
              path="/admin/movies"
              component={MoviesManagement}
            />
  
            <AdminRoute
              exact
              path="/admin/showtimes"
              component={CreateShowtime}
            /> */}
            </AdminLayout>
          </Route>
          <Route exact path={["/login", "/register"]}>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Route>
        </Switch>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
