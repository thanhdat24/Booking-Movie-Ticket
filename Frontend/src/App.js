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
import componentsOverride from "./theme/overrides";
import MoviesManagement from "./pages/MoviesManagement";
import TheaterManagement from "./pages/TheaterManagement";
import ShowtimesManagement from "./pages/ShowtimesManagement";

import MovieEdit from "./pages/MoviesManagement/MovieEdit";
import CreateMovie from "./pages/MoviesManagement/CreateMovie";

import UserEdit from "./pages/UsersManagement/UserEdit";
import UserProfile from "./pages/UsersManagement/UserProfile";
import CreateTheater from "./pages/TheaterManagement/CreateTheater";
import TheaterEdit from "./pages/TheaterManagement/TheaterEdit";
import CreateShowtimes from "./pages/ShowtimesManagement/CreateShowtimes";
import ShowtimeEdit from "./pages/ShowtimesManagement/ShowtimeEdit";
import ModalTrailer from "./components/ModalTrailer/ModalTrailer";

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
        <ModalTrailer />
        <Switch>
          <Route
            exact
            path={[
              "/admin/users/list",
              "/admin/users/account",
              "/admin/users/edit/:userId",
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
              <AdminRoute
                exact
                path="/admin/users/edit/:userId"
                component={UserEdit}
              />
            </AdminLayout>
          </Route>
          <Route
            exact
            path={[
              "/admin/movies/list",
              "/admin/movies/create",
              "/admin/movies/edit/:movieId",
            ]}
          >
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
              />{" "}
              <AdminRoute
                exact
                path="/admin/movies/edit/:movieId"
                component={MovieEdit}
              />
            </AdminLayout>
          </Route>
          <Route
            exact
            path={[
              "/admin/theater/list",
              "/admin/theater/create",
              "/admin/theater/edit/:theaterId",
            ]}
          >
            <AdminLayout>
              <AdminRoute
                exact
                path="/admin/theater/list"
                component={TheaterManagement}
              />
              <AdminRoute
                exact
                path="/admin/theater/create"
                component={CreateTheater}
              />
              <AdminRoute
                exact
                path="/admin/theater/edit/:theaterId"
                component={TheaterEdit}
              />
            </AdminLayout>
          </Route>
          <Route
            exact
            path={[
              "/admin/showtimes/list",
              "/admin/showtimes/create",
              "/admin/showtimes/edit/:showtimeId",
            ]}
          >
            <AdminLayout>
              <AdminRoute
                exact
                path="/admin/showtimes/list"
                component={ShowtimesManagement}
              />
              <AdminRoute
                exact
                path="/admin/showtimes/create"
                component={CreateShowtimes}
              />
              <AdminRoute
                exact
                path="/admin/showtimes/edit/:showtimeId"
                component={ShowtimeEdit}
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
