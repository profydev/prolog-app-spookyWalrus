import React from "react";
import styles from "./issue-row.module.scss";

export default function rowChart() {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chart}>
        {Array.from({ length: 14 }).map((_, i) => {
          const randHi = Math.floor(Math.random() * 25) + 50; // Generate a new random number for each bar
          return (
            <div className={styles.chartBar} key={i}>
              <svg
                width="16"
                height={`${randHi}%`}
                viewBox="0 0 16 66"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >

                <path
                  d="M0 6C0 2.68629 2.68629 0 6 0H10C13.3137 0 16 2.68629 16 6V66H0V6Z"
                  fill="#D6BBFB"
                />
              </svg>
            </div>
          );
        })}
      </div>
    </div>
  );
}
