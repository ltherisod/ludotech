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
import Purchases from "./pages/Purchases"
import Notifications from "./components/Notifications"

import AOS from 'aos';
import 'aos/dist/aos.css';

const App = (props) => {
  AOS.init();
  useLoginLS()
  const user = useSelector((state) => state.users.user)
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home} />
        {user && <Route path="/paypal" component={Paypal} />}
        <Route path="/articles" component={Articles} />
        <Route path="/article/:id" component={ArticlePage} />
        {!user && <Route path="/signin" component={SignIn} />}
        {!user && <Route path="/signup" component={SignUp} />}
        {user?.isAdmin && <Route path="/admin" component={PanelAdmin} />}
        {user && <Route path="/profile" component={UserProfile} />}
        {user && <Route path="/cart" component={Cart} />}
        {user && <Route path="/checkout" component={Checkout} />}
        {user && <Route path="/wishlist" component={Wishlist} />}
        {user && <Route path="/mypurchases" component={Purchases} />}
        <Route path="/notifications" component={Notifications} />
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  )
}

export default App
