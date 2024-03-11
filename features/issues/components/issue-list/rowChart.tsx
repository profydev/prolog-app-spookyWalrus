import React from "react";
import styles from "./issue-row.module.scss";

// const sizes: string[] = Array.from({ length: 14 }).map((_, i) => {
//   const randHi = Math.floor(Math.random() * 25) + 50; // Generate a new random number for each bar
//   return `0 0 16 ${randHi}`;
// });

// console.log("array : ", sizes);
// function doo() {
//   const randHi = Math.floor(Math.random() * 14); // Generate a new random number for each bar
//   console.log("dim: ", sizes[d]);
//   const dim = sizes[Math.floor(Math.random() * 14)];
// }

export default function rowChart() {
  return (
    <div className={styles.chartContainer}>
      <div className={styles.chart}>
        {Array.from({ length: 14 }).map((_, i) => {
          const randHi = Math.floor(Math.random() * 14) + 50; // Generate a new random number for each bar
          const dim = `0 0 16 ${randHi}`;
          return (
            <div className={styles.chartBar} key={i}>
              <svg
                width="100%"
                height="100%"
                viewBox={dim}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* <rect x="0" y="0" width="100%" height="100%" /> */}
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
