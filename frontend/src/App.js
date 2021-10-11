import "./App.css"
import Home from "./pages/Home"
import Articles from "./pages/Articles"
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom"
import SignIn from "./pages/SignIn"
import SignUp from "./pages/SignUp"
import { useLoginLS } from "./hooks/usersHooks"
import { useSelector } from "react-redux"
import PanelAdmin from "./pages/PanelAdmin"
import Cart from "./pages/Cart"
import ArticlePage from "./pages/ArticlePage"
import Paypal from "./components/Paypal"
import UserProfile from "./pages/UserProfile"
import Wishlist from "./pages/Wishlist"
import Checkout from "./pages/Checkout"

const App = (props) => {
  useLoginLS()
  const user = useSelector((state) => state.users.user)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/paypal" component={Paypal} />
        <Route path="/articles" component={Articles} />
        <Route path="/article/:id" component={ArticlePage} />
        {!user && <Route path="/signin" component={SignIn} />}
        {!user && <Route path="/signup" component={SignUp} />}
        <Route path="/admin" component={PanelAdmin} />
        <Route path="/profile" component={UserProfile} />
        <Route path="/cart" component={Cart} />
        <Route path="/checkout" component={Checkout} />
        {user && <Route path="/wishlist" component={Wishlist} />}
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
