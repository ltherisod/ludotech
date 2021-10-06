import "./App.css"
import Home from "./pages/Home"
import Articles from "./pages/Articles"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
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

export default App
