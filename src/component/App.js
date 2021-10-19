import React, { useState } from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "../component/router/PrivateRoute"
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import Dashboard from "./dashboard"
import FeedbackForm from "./Feedback/FeedbackForm"
import FeedbackList from "./Feedback/FeedbackList"
import NavigationBar from "./Nav/Navbar"
import AppContext from "../contexts/AppContext"
import AuthService from "../contexts/AuthContext"

export default function App() {
  const [isUserLoggedIn, setLoggedInUserValue] = useState(AuthService.isUserLoggedIn());

  const changeLoggedInUserStatus = () => {
    setLoggedInUserValue(!isUserLoggedIn)
  }

  const userSettings = {
    isUserLoggedIn: isUserLoggedIn,
    changeLoggedInUserStatus
  }

  return (
    <AppContext.Provider value={userSettings}>
      <Router>
        <NavigationBar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <PrivateRoute path="/feedbacks" component={FeedbackList} />
          <PrivateRoute path="/feedback/new" component={FeedbackForm} />
          <Route path="/signup" component={Signup} />
          <Route path="/login" component={Login} />
        </Switch>
      </Router>
    </AppContext.Provider>
  )
}
