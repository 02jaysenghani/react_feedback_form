import React from "react";
import { useSelector } from "react-redux";
import { Redirect, Route } from "react-router-dom";

function PrivateRoute({ component: Component, ...rest }) {
  const isLoggedIn = useSelector(state => state.authData.loggedIn)
  
  return (
    <Route
      {...rest}
      render={props => {
        return isLoggedIn ? <Component {...props} /> : <Redirect to="/login" />
      }}
    ></Route>
  )
}

export default PrivateRoute