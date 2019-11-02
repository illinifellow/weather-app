import React from "react";
import classnames from "classnames";
import styles from "./index.module.css";

const Switch = ({ disabled, options, isOn, handleToggle }) => {
  return (
    <label
      className={classnames(styles.switchLabel, {
        [styles.switchLabelOn]: isOn,
        [styles.switchLabelDisabled]: disabled
      })}
    >
      <span className={styles.switchOption}>{options[0]}</span>
      <input
        disabled={disabled}
        checked={isOn}
        onChange={handleToggle}
        className={styles.switch}
        type="checkbox"
      />
      <span className={styles.switchButton} />
      <span className={styles.switchOption}>{options[1]}</span>
    </label>
  );
};

export default Switch;
