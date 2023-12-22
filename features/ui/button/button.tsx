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
}

export enum ButtonState {
  default = "default",
  hover = "hover",
  focus = "focus",
  disabled = "disabled",
}

export enum CircleIcon {
  circleIcon = "circleIcon",
  circleOne = "circleOne",
  circleTwo = "circleTwo",
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
  color = ButtonColor.primary,
  icon,
  showText,
  showCircle1,
  showCircle2,
}: Props) => {
  return (
    <button
      className={classNames(
        styles.button,
        styles[state],
        styles[size],
        styles[color],
      )}
    >
      {showCircle1 && <span className={styles.circleOne}>{icon}</span>}
      {showText && <span className={styles.childText}>{text}</span>}
      {showCircle2 && <span className={styles.circleTwo}>{icon}</span>}
      {children}
    </button>
  );
};

export default Button;
