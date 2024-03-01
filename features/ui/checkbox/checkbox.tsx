import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames";
import styles from "./checkbox.module.scss";

export enum CheckSize {
  sm = "sm",
  md = "md",
}

export enum CheckColor {
  default = "default",
  hover = "hover",
  focus = "focus",
  disabled = "disabled",
}

interface Props {
  // label?: string;
  size?: CheckSize;
  color?: CheckColor;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange?: (checked: boolean) => void;
  checked: boolean;
  indeterminate: boolean;
}

const Checkbox = ({
  // label,
  size = CheckSize.sm,
  color = CheckColor.default,
  onChange,
  checked,
  indeterminate,
}: Props) => {
  const [isChecked, setIsChecked] = useState<boolean | "indeterminate">(
    indeterminate ? "indeterminate" : checked,
  );
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (inputRef.current) {
      if (isChecked === indeterminate) {
        inputRef.current.indeterminate = true;
      } else {
        inputRef.current.indeterminate = false;
      }
    }
  }, [isChecked]);

  const gotClicked = () => {
    if (isChecked === false) {
      setIsChecked(true);
      if (onChange) onChange(true);
    } else if (isChecked === true) {
      setIsChecked("indeterminate");
      if (onChange) onChange(false);
    } else if (isChecked === "indeterminate") {
      setIsChecked(false);
      if (onChange) onChange(false);
    }
  };

  return (
    <div>
      <input
        type="checkbox"
        ref={inputRef}
        checked={isChecked === true}
        onClick={gotClicked}
        onChange={() => {}}
        className={styles.box}
      ></input>
      <label
        className={classNames(
          styles.icon,
          styles[size],
          styles[color],
          isChecked === "indeterminate" && styles.indeterminate,
        )}
        onClick={gotClicked}
      ></label>
      {/* <span
        className={classNames(styles.icon, styles[size], styles[color])}
      ></span>
      <span className={styles.label}>{label}</span> */}
    </div>
  );
};

export default Checkbox;
