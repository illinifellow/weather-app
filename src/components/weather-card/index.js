import React from "react";
import classnames from "classnames";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { GiPlayButton } from "react-icons/gi";
import { WiHumidity, WiBarometer } from "react-icons/wi";
import { FaWind } from "react-icons/fa";
import { IoMdArrowDropup, IoMdArrowDropdown } from "react-icons/io";
import styles from "./index.module.css";

const City = props => (
  <div className={styles.city}>
    <img
      alt={props.LocalizedName}
      src={props.image || "//via.placeholder.com/48"}
      className={styles.cityImage}
    />
    <div className={styles.cityName}>
      <h1>{props.LocalizedName}</h1>
      <div>{props.Country.LocalizedName}</div>
    </div>
    {props.isFav ? (
      <AiFillHeart className={styles.cityFavOn} onClick={props.onClick} />
    ) : (
      <AiOutlineHeart className={styles.cityFavOff} onClick={props.onClick} />
    )}
  </div>
);

const Card = props => {
  if (!props.Link) return null;
  return (
    <section className={classnames(styles.card, [styles[props.type]])}>
      {props.city && <City {...props.city} onClick={props.onClick} />}
      <div className={styles.content}>
        <div className={styles.contentCondition}>
          <h2 className={styles.contentConditionTemp}>
            {props.system
              ? +props.Temperature.Metric.Value.toFixed(0)
              : +props.Temperature.Imperial.Value.toFixed(0)}
            °
          </h2>
          <div className={styles.contentConditionFeelTemp}>
            Feels like:{" "}
            {props.system
              ? +props.RealFeelTemperature.Metric.Value.toFixed(0)
              : +props.RealFeelTemperature.Imperial.Value.toFixed(0)}
            °
            {props.system
              ? props.RealFeelTemperature.Metric.Unit
              : props.RealFeelTemperature.Imperial.Unit}
          </div>
        </div>
        <div className={styles.contentTitle}>
          <img
            src={`//developer.accuweather.com/sites/default/files/${
              props.WeatherIcon < 10
                ? "0" + props.WeatherIcon
                : props.WeatherIcon
            }-s.png`}
            alt=""
          />
          {props.WeatherText}
        </div>
        <div className={styles.contentDetails}>
          <div title="Humidity">
            <WiHumidity style={{ fontSize: "2rem" }} />
            {props.RelativeHumidity}%
          </div>
          <div title="Wind">
            <FaWind style={{ fontSize: "1.2rem" }} />
            {props.system ? (
              <span>
                {+props.Wind.Speed.Metric.Value.toFixed(0)}{" "}
                {props.Wind.Speed.Metric.Unit}
              </span>
            ) : (
              <span>
                {+props.Wind.Speed.Imperial.Value.toFixed(0)}{" "}
                {props.Wind.Speed.Imperial.Unit}
              </span>
            )}{" "}
            <sup>
              <GiPlayButton
                style={{
                  transform: `rotate(${props.Wind.Direction.Degrees - 90}deg)`
                }}
              />
              {props.Wind.Direction.English}
            </sup>
          </div>
          <div title="Pressure">
            <WiBarometer style={{ fontSize: "2rem" }} />
            {props.system ? (
              <span>
                {+props.Pressure.Metric.Value.toFixed(0)}{" "}
                {props.Pressure.Metric.Unit}
              </span>
            ) : (
              <span>
                {+props.Pressure.Imperial.Value.toFixed(0)}{" "}
                {props.Pressure.Imperial.Unit}
              </span>
            )}
            <span>
              {props.PressureTendency.Code === "F" && <IoMdArrowDropup />}
              {props.PressureTendency.Code === "R" && <IoMdArrowDropdown />}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
