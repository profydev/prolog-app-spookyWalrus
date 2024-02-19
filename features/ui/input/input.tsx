import React, { ReactNode } from "react";
import classNames from "classnames";
import Image from "next/image";
import styles from "./input.module.scss";
// import mail from "./icons/mail.svg";
import alert from "../../../public/icons/alert-circle.svg";
import type { Issue } from "@api/issues.types";

// import { IconType } from "react-icons";

interface inputProps {
  isDisabled: boolean;
  isIcon: boolean;
  isError: boolean;
  noHint: boolean;
  inputLabel: string;
  hint: string;
  errorMess: string;
  // children: React.ReactNode;
  // children: string|ReactNode;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => Issue[] | void;
  icon: string | ReactNode;
}

const Input = ({
  isDisabled,
  isIcon,
  isError,
  noHint,
  inputLabel,
  hint,
  errorMess,
  // children,
  onChange,
  icon,
}: inputProps) => {
  return (
    <label>
      <div className={styles.label}>{inputLabel}</div>
      <div className={styles.inputContainer}>
        {isIcon && (
          //  <div className={styles.iconDiv}>
          //  {isIcon && <Image src={icon} alt="icon" width="14px" className={styles.theIcon} />} */}
          // Conditionally render the icon based on the prop */}
          <span className={styles.theIcon}>
            {typeof icon === "string" ? (
              <Image
                src={icon}
                alt="icon"
                height={20}
                width={20}
                className={styles.theIcon}
              />
            ) : (
              icon
            )}
          </span>
        )}
        {/* </div> */}
        <input
          type="text"
          className={classNames(styles.theInput, {
            [styles.isDisabled]: isDisabled,
            [styles.iconPad]: isIcon,
            [styles.isError]: isError,
            [styles.errorFocus]: isError,
            [styles.alertPad]: isError,
          })}
          placeholder="Project Name"
          onChange={onChange}
        />
        {isError && (
          <Image src={alert} alt="alert" className={styles.alertIcon} />
        )}
        {/* {children} */}
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
