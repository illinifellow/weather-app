import React from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { setFavCity } from "../../actions";
import FavCard from "../../components/fav-card";
import styles from "./index.module.css";

const Favorites = props => {
  if (JSON.parse(localStorage.getItem("f")).length < 1)
    return (
      <main className={styles.favorites}>
        <div className={styles.favoritesNoTitle}>
          <h1>you've got no favorites</h1>
          <NavLink to="/">Go find one!</NavLink>
        </div>
      </main>
    );

  return (
    <main className={styles.favorites}>
      <div className={styles.favoritesGrid}>
        {JSON.parse(localStorage.getItem("f")).map(item => (
          <FavCard
            key={item.Key}
            {...item}
            system={props.system}
            onClick={() => props.setFavCity(item)}
          />
        ))}
      </div>
    </main>
  );
};

export default withRouter(
  connect(
    state => ({ ...state }),
    dispatch => ({ setFavCity: city => dispatch(setFavCity(city)) })
  )(Favorites)
);
