import './App.css';
import Home from './pages/Home'
import Articles from './pages/Articles'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';

const App = (props) => {

  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' component={Home}/>
        <Route path='/articles' component={Articles} />
        {<Route path='/signin' component={SignIn} />}
        {<Route path='/signup' component={SignUp} />}
        <Redirect to='/'/>
      </Switch>
    </BrowserRouter>
  )
}

export default App
