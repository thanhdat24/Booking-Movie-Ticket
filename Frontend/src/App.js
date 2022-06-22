import "./App.css";
import { useMemo, lazy, Suspense } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UsersManagement from "./pages/UsersManagement";

import AdminLayout from "./layouts/AdminLayout";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import shape from "./theme/shape";
import palette from "./theme/palette";
import typography from "./theme/typography";
import shadows, { customShadows } from "./theme/shadows";
import componentsOverride from "./theme/overrides";

import Loading from "./components/Loading/index";
import TriggerLoadingLazy from "./components/TriggerLoadingLazy/index";

import ModalTrailer from "./components/ModalTrailer/ModalTrailer";
import MainLayout from "./layouts/MainLayout/index";

// page
const Homepage = lazy(() => import("./pages/Homepage"));
const MovieDetail = lazy(() => import("./pages/MovieDetail"));
const UserAccount = lazy(() => import("./pages/UsersManagement/UserAccount"));
const BookTickets = lazy(() => import("./pages/Bookticket"));
const TicketManagement = lazy(() => import("./pages/TicketManagement"));
const ReviewManagement = lazy(() => import("./pages/ReviewManagement"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const UserEdit = lazy(() => import("./pages/UsersManagement/UserEdit"));
const CreateTheater = lazy(() =>
  import("./pages/TheaterManagement/CreateTheater")
);
const TheaterEdit = lazy(() => import("./pages/TheaterManagement/TheaterEdit"));
const CreateShowtimes = lazy(() =>
  import("./pages/ShowtimesManagement/CreateShowtimes")
);
const ShowtimeEdit = lazy(() =>
  import("./pages/ShowtimesManagement/ShowtimeEdit")
);
const MoviesManagement = lazy(() => import("./pages/MoviesManagement"));
const TheaterManagement = lazy(() => import("./pages/TheaterManagement"));
const ShowtimesManagement = lazy(() => import("./pages/ShowtimesManagement"));
const MovieEdit = lazy(() => import("./pages/MoviesManagement/MovieEdit"));
const CreateMovie = lazy(() => import("./pages/MoviesManagement/CreateMovie"));
const UserProfile = lazy(() => import("./pages/UserProfile"));

// guards
const AdminRoute = lazy(() => import("./guards/AdminRoute"));
const CheckoutRoute = lazy(() => import("./guards/CheckoutRoute"));
const UserProfileRoute = lazy(() => import("./guards/UserProfileRoute"));

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
        <Loading />
        <ModalTrailer />
        <Suspense fallback={<TriggerLoadingLazy />}>
          <Switch>
            <Route exact path={["/", "/movie/:idMovie", "/profile"]}>
              <MainLayout>
                <Route exact path="/" component={Homepage} />
                <Route exact path="/movie/:idMovie" component={MovieDetail} />
                <UserProfileRoute
                  exact
                  path="/profile"
                  component={UserProfile}
                />
              </MainLayout>
            </Route>

            <CheckoutRoute
              exact
              path="/booking-tickets/:idShowtime"
              component={BookTickets}
            />

            <Route exact path={["/admin/dashboard"]}>
              <AdminLayout>
                <AdminRoute
                  exact
                  path="/admin/dashboard"
                  component={Dashboard}
                />
              </AdminLayout>
            </Route>

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
                  component={UserAccount}
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
                "/admin/movies/edit/:idMovie",
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
                  path="/admin/movies/edit/:idMovie"
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
            <Route exact path={["/admin/ticket/list"]}>
              <AdminLayout>
                <AdminRoute
                  exact
                  path="/admin/ticket/list"
                  component={TicketManagement}
                />
              </AdminLayout>
            </Route>
            <Route exact path={["/admin/review/list"]}>
              <AdminLayout>
                <AdminRoute
                  exact
                  path="/admin/review/list"
                  component={ReviewManagement}
                />
              </AdminLayout>
            </Route>
            <Route exact path={["/login", "/register"]}>
              <Route exact path="/login" component={Login} />
              <Route exact path="/register" component={Register} />
            </Route>
          </Switch>
        </Suspense>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
