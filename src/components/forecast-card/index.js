import React from "react";
import dateFormat from "dateformat";
import { toFahrenheit } from "../../helpers";
import styles from "./index.module.css";

const ForecastCard = props => {
  return (
    <section className={styles.card}>
      <div className={styles.date}>
        {dateFormat(new Date(props.EpochDate * 1000), "dd/mm")}
      </div>
      <div className={styles.condition}>
        <img
          src={`//developer.accuweather.com/sites/default/files/${
            props.Day.Icon < 10 ? "0" + props.Day.Icon : props.Day.Icon
          }-s.png`}
          alt={props.Day.ShortPhrase}
        />
        {props.Day.ShortPhrase}
      </div>
      {props.system ? (
        <div className={styles.temp}>
          {+props.Temperature.Minimum.Value.toFixed(0)}°C —{" "}
          {+props.Temperature.Maximum.Value.toFixed(0)}°C
        </div>
      ) : (
        <div className={styles.temp}>
          {toFahrenheit(+props.Temperature.Minimum.Value.toFixed(0))}°F —{" "}
          {toFahrenheit(+props.Temperature.Maximum.Value.toFixed(0))}°F
        </div>
      )}
    </section>
  );
};

export default ForecastCard;
