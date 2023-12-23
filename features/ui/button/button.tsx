import React from "react";
import classNames from "classnames";
import styles from "./button.module.scss";

export enum ButtonSize {
  sm = "sm",
  md = "md",
  lg = "lg",
  xlg = "xlg",
}

export enum ButtonColor {
  primary = "primary",
  secondary = "secondary",
  gray = "gray",
  empty = "empty",
  emptyGray = "emptyGray",
  error = "error",
  emptyError = "emptyError",
  default = "default",
}

export enum ButtonState {
  default = "default",
  hover = "hover",
  focus = "focus",
  disabled = "disabled",
}

interface Props {
  state?: ButtonState;
  size?: ButtonSize;
  color?: ButtonColor;
  icon?: React.ReactNode;
  text?: string;
  children: React.ReactNode;
  showText?: boolean;
  showCircle1?: boolean;
  showCircle2?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button = ({
  children,
  text,
  state = ButtonState.default,
  size = ButtonSize.md,
  color = ButtonColor.default,
  icon,
  showText,
  showCircle1,
  showCircle2,
  onClick,
}: Props) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[state],
        styles[size],
        styles[color],
      )}
      onClick={onClick}
    >
      {showCircle1 && <span className={styles.circleOne}>{icon}</span>}
      {showText && <span className={styles.childText}>{text}</span>}
      {showCircle2 && <span className={styles.circleTwo}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
