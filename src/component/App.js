import React from "react"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"
import PrivateRoute from "../component/router/PrivateRoute"
import Login from "./Auth/Login"
import Signup from "./Auth/Signup"
import Dashboard from "./dashboard"
import Home from "./home"
import FeedbackForm from "./Feedback/FeedbackForm"
import FeedbackList from "./Feedback/FeedbackList"
import NavigationBar from "./Nav/Navbar"

export default function App() {

  return (
    <Router>
      <NavigationBar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/feedbacks" component={FeedbackList} />
        <PrivateRoute path="/feedback/new" component={FeedbackForm} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  )
}
