import React from "react";
import { withRouter, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { AiFillHeart } from "react-icons/ai";
import { IoIosFlash } from "react-icons/io";
import { setSystem } from "../../actions";
import Switch from "../../components/switch";
import styles from "./index.module.css";

const Header = props => (
  <header className={styles.header}>
    <NavLink to={"/"} className={styles.link}>
      <IoIosFlash style={{ margin: "0 -0.1rem 0 -0.5rem" }} />
      Weather
    </NavLink>
    <Switch
      disabled={props.match.path !== "/" || !props.city}
      isOn={props.system}
      handleToggle={props.setSystem}
      options={["°F", "°C"]}
    />
    <NavLink
      to={"/favorites"}
      className={styles.link}
      activeClassName={styles.active}
    >
      <AiFillHeart style={{ margin: "0 0.1rem 0 0" }} />
      Favorites
    </NavLink>
  </header>
);

export default withRouter(
  connect(
    state => ({ ...state }),
    dispatch => ({ setSystem: system => dispatch(setSystem(system)) })
  )(Header)
);
