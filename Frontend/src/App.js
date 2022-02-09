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
          <Route exact path={["/admin/users/list", "/admin/users/account"]}>
            <AdminLayout>
              {" "}
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
