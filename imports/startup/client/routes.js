import React from 'react'
import { Router, Route, Switch } from 'react-router'
import createBrowserHistory from 'history/createBrowserHistory'

// route components
import Login from '../../ui/Login'
import App from '../../ui/App'
import Promote from '../../ui/Promote'

const browserHistory = createBrowserHistory()

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Switch>
      <Route exact path='/login' component={Login} />
      <Route exact path='/' component={App} />
      <Route exact path='/promote/:userId' component={Promote} />
    </Switch>
  </Router>
)