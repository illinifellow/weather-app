import React, { Component } from "react";
import { hydrate, render } from "react-dom";
import { hot } from "react-hot-loader/root";
import {
  BrowserRouter as Router,
  Route as RouterRoute,
  Switch
} from "react-router-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider, connect } from "react-redux";
import thunk from "redux-thunk";
import BaseLayout from "./layouts/base";
import Home from "./containers/home";
import Favorites from "./containers/favorites";
import NotFound from "./containers/not-found";
import reducers from "./reducers";
import * as serviceWorker from "./service-worker";
import "./index.css";

!localStorage.getItem("f") && localStorage.setItem("f", JSON.stringify([]));
!localStorage.getItem("s") && localStorage.setItem("s", true);

const Route = ({ component: Component, layout: Layout, ...rest }) => (
  <RouterRoute
    {...rest}
    render={matchProps => (
      <Layout {...matchProps}>
        <Component {...matchProps} />
      </Layout>
    )}
  />
);

class App extends Component {
  render() {
    process.env.NODE_ENV === "development" && console.log(this.props);
    return (
      <Router>
        <Switch>
          <Route path="/" exact layout={BaseLayout} component={Home} />
          <Route
            path="/favorites"
            exact
            layout={BaseLayout}
            component={Favorites}
          />
          <Route path="/*" layout={BaseLayout} component={NotFound} />
        </Switch>
      </Router>
    );
  }
}

const AppContainer = connect(
  state => ({ ...state }),
  dispatch => ({})
)(hot(App));

const store = createStore(reducers, applyMiddleware(thunk));

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    rootElement
  );
} else {
  render(
    <Provider store={store}>
      <AppContainer />
    </Provider>,
    rootElement
  );
}

serviceWorker.unregister();
