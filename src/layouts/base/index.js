import React, { Component, Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setCityByLocation } from "../../actions";
import Header from "../../components/_header";

class BaseLayout extends Component {
  componentDidMount() {
    if ("geolocation" in navigator) this.props.setCityByLocation();
  }
  render() {
    return (
      <Fragment>
        <Header />
        {this.props.children}
      </Fragment>
    );
  }
}

export default withRouter(
  connect(
    state => ({ ...state }),
    dispatch => ({ setCityByLocation: () => dispatch(setCityByLocation()) })
  )(BaseLayout)
);
