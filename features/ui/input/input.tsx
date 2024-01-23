import React from "react";
import classNames from "classnames";
import Image from "next/image";
import styles from "./input.module.scss";
import mail from "./icons/mail.svg";
import alert from "../../../public/icons/alert-circle.svg";

interface inputProps {
  isDisabled: boolean;
  isIcon: boolean;
  isError: boolean;
  noHint: boolean;
  inputLabel: string;
  hint: string;
  errorMess: string;
  children: React.ReactNode;
}

const Input = ({
  isDisabled,
  isIcon,
  isError,
  noHint,
  inputLabel,
  hint,
  errorMess,
  children,
}: inputProps) => {
  return (
    <label>
      <div className={styles.label}>{inputLabel}</div>
      <div className={styles.inputContainer}>
        {isIcon && <Image src={mail} alt="mail" className={styles.theIcon} />}
        <input
          type="text"
          className={classNames({
            [styles.isDisabled]: isDisabled,
            [styles.iconPad]: isIcon,
            [styles.isError]: isError,
            [styles.errorFocus]: isError,
            [styles.alertPad]: isError,
          })}
          placeholder="Type here"
        />
        {isError && (
          <Image src={alert} alt="alert" className={styles.alertIcon} />
        )}
        {children}
      </div>
      <span className={isError || noHint ? styles.hideHint : styles.hint}>
        {hint}
      </span>
      <span className={isError ? styles.errorMess : styles.hideError}>
        {errorMess}
      </span>
    </label>
  );
};

export default Input;
