import React, { useEffect, useRef } from "react";
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
  label?: string;
  size?: CheckSize;
  color?: CheckColor;
  children: React.ReactNode;
  className?: string;
  onClick?: (event: React.MouseEvent<HTMLElement, MouseEvent>) => void;
  onChange?: () => void;
  checked: boolean;
  indeterminate: boolean;
}

const Checkbox = ({
  label,
  size = CheckSize.md,
  color = CheckColor.default,
  onChange,
  checked,
  indeterminate,
}: Props) => {
  const ref = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (ref.current) {
      ref.current.indeterminate = indeterminate;
    }
  }, [indeterminate]);

  return (
    <div className={styles.box}>
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={onChange}
        className={styles.check}
      ></input>
      <span
        className={classNames(styles.icon, styles[size], styles[color])}
      ></span>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default Checkbox;
