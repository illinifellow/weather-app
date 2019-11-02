import React from "react";
import classnames from "classnames";
import styles from "./index.module.css";

const Input = props => (
  <label
    className={classnames(
      styles.field,
      { [styles.fieldSingle]: props.single },
      props.className
    )}
  >
    <div className={styles.row}>
      <input
        type={props.type}
        value={props.value}
        placeholder={props.placeholder}
        autoFocus={props.autoFocus}
        onChange={e => props.onChange(e.target.value)}
        className={classnames(styles.fieldValue, props.className)}
      />
      {props.prefixIcon && (
        <div className={styles.fieldLabelPrefixIcon}>{props.prefixIcon}</div>
      )}
      {props.value && props.onAction && props.actionIcon && (
        <div className={styles.fieldLabelActionIcon} onClick={props.onAction}>
          {props.actionIcon}
        </div>
      )}
      {props.options && props.options.length > 0 && (
        <div className={styles.fieldOptions}>
          {props.options
            .slice(0, props.optionsLimit || props.options.length)
            .map((option, index) => {
              return (
                <div
                  tabIndex={index}
                  key={index}
                  className={styles.fieldOptionsItem}
                  onClick={() => props.onSelect(option[props.settingKey])}
                >
                  {option[props.displayKey]}
                </div>
              );
            })}
        </div>
      )}
    </div>
  </label>
);

export default Input;
