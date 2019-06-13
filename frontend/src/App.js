import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import { Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect
} from "react-router-dom";

import Lists from './components/Lists'
import Alerts from './components/Alerts'
import Login from './components/Login'
import Register from './components/Register'
import List from './components/List'
import NewList from './components/NewList'
import Nav from './components/Nav'
import PrivateRoute from './components/PrivateRoute'
import ListSettings from './components/ListSettings'

import { Provider } from 'react-redux';
import { store } from './store'
import { loadUser } from "./actions/auth";

// Alert Options
const alertOptions = {
  timeout: 3000,
  position: "top center"
};

class App extends Component {
  componentWillMount() {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <AlertProvider template={AlertTemplate} {...alertOptions}>
          <Router>
            <Fragment>
              <Nav />
              <div className="container">
                <Alerts />
                <Switch>
                  <PrivateRoute exact path="/" component={Lists} />
                  <Route exact path="/login" component={Login} />
                  <Route exact path="/register" component={Register} />
                  <PrivateRoute path="/list/:id" component={List} />
                  <PrivateRoute path="/list_settings/:id" component={ListSettings} />
                  <PrivateRoute path="/new_list" component={NewList} />
                </Switch>
              </div>
            </Fragment>
          </Router>
        </AlertProvider>
      </Provider>
    );
  }
}

export default App;