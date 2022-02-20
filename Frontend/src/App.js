import "./App.css";
import { useMemo } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UsersManagement from "./pages/UsersManagement";
import UserProfile from "./pages/UserProfile";

import AdminRoute from "./guards/AdminRoute";
import AdminLayout from "./layouts/AdminLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import shape from "./theme/shape";
import palette from "./theme/palette";
import typography from "./theme/typography";
import shadows, { customShadows } from "./theme/shadows";
import componentsOverride from "./theme/overrides";
import UserEdit from "./pages/UserEdit";
import MoviesManagement from "./pages/MoviesManagement";
import CreateMovie from "./pages/CreateMovie";
import TheaterManagement from "./pages/TheaterManagement";

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
  theme.components = componentsOverride(theme);

  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Switch>
          <Route
            exact
            path={[
              "/admin/users/list",
              "/admin/users/account",
              "/admin/users/edit",
            ]}
          >
            <AdminLayout>
              <AdminRoute
                exact
                path="/admin/users/list"
                component={UsersManagement}
              />
              <AdminRoute
                exact
                path="/admin/users/account"
                component={UserProfile}
              />
              <AdminRoute exact path="/admin/users/edit" component={UserEdit} />
            </AdminLayout>
          </Route>
          <Route exact path={["/admin/movies/list", "/admin/movies/create"]}>
            <AdminLayout>
              <AdminRoute
                exact
                path="/admin/movies/list"
                component={MoviesManagement}
              />
              <AdminRoute
                exact
                path="/admin/movies/create"
                component={CreateMovie}
              />
            </AdminLayout>
          </Route>
          <Route exact path={["/admin/theater/list"]}>
            <AdminLayout>
              <AdminRoute
                exact
                path="/admin/theater/list"
                component={TheaterManagement}
              />
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
