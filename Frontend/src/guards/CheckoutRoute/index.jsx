import React from "react";
import { Redirect, Route } from "react-router-dom";
import { useSelector } from "react-redux";

function CheckoutRoute(props) {
  // props: { exact, path="/datve/:maLichChieu", component={BookTickets}}
  const { currentUser } = useSelector((state) => state.AuthReducer);
  const { component: BookTickets, ...routeProps } = props;
  return (
    <Route
      {...routeProps}
      render={(propsInRoute) => {
        if (currentUser) {
          return <BookTickets {...propsInRoute} />;
        }
        return (
          <Redirect
            to={{
              pathname: "/login",
              state: propsInRoute.location.state,
            }}
          />
        );
      }}
    />
  );
}
export default CheckoutRoute;
