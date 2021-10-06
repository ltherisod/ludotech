import "./App.css"
import { useEffect } from "react"
import { connect } from "react-redux"
import Home from "./pages/Home"
import Articles from "./pages/Articles"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import usersActions from "./redux/actions/usersActions"
import { useLoginLS } from "./hooks/usersHooks"

const App = (props) => {
  useLoginLS()
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/articles" component={Articles} />
        {!props.token && <Route path="/signin" component={SignIn} />}
        {!props.token && <Route path="/signup" component={SignUp} />}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

const mapStateToProps = (state) => {
  return {
    token: state.users.user.token,
    user: state.users.user,
  }
}

const mapDispatchToProps = {
  logInLS: usersActions.logInLS,
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
