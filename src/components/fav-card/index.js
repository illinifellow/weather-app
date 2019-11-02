import React from "react";
import { Link } from "react-router-dom";
import { MdClose } from "react-icons/md";
import styles from "./index.module.css";

const FavCard = props => (
  <div className={styles.card}>
    <Link
      to={`/?city=${props.LocalizedName.split(" ").join("+")}`}
      className={styles.link}
    >
      <img
        alt={props.Country.LocalizedName}
        src={props.image || "//via.placeholder.com/80"}
        className={styles.image}
      />
      <div className={styles.name}>
        <h1>{props.LocalizedName}</h1>
        <div>{props.Country.LocalizedName}</div>
      </div>
    </Link>
    <MdClose className={styles.remove} onClick={props.onClick} />
  </div>
);

export default FavCard;
