import React, { useContext } from "react";
import { Redirect, Route } from "react-router-dom";
import AppContext from "../../contexts/AppContext";

function PrivateRoute({ component: Component, ...rest }) {
  const globalContext = useContext(AppContext);
  return (
    <Route
      {...rest}
      render={props => {
        return globalContext.isUserLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default PrivateRoute