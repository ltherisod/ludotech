import "./App.css"
import Home from "./pages/Home"
import Articles from "./pages/Articles"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { useLoginLS } from "./hooks/usersHooks"
import { useSelector } from "react-redux"

const App = (props) => {
  useLoginLS()
  const user = useSelector((state) => state.users.user)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/articles" component={Articles} />
        {!user && <Route path="/signin" component={SignIn} />}
        {!user && <Route path="/signup" component={SignUp} />}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
