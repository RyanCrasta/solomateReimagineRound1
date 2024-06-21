import React from "react";
import styles from "../styles/Loading.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const Loading = () => {
  useGSAP(() => {
    gsap.to("#loadingCtnID", {
      opacity: 0,
      delay: 3.8,
      // duration: 25,
      zIndex: "-10",
    });

    gsap.fromTo(
      "#fourID",
      {
        x: "-150%",
      },
      {
        x: "0%",
        delay: 0.5,
        duration: 1,
      }
    );

    gsap.fromTo(
      "#fiveID",
      {
        x: "150%",
      },
      {
        x: "0%",
        delay: 0.5,
        duration: 1,
      }
    );

    gsap.fromTo(
      "#celebrationTextID",
      {
        y: "300%",
      },
      {
        y: "0%",
        delay: 0.8,
        duration: 1,
      }
    );
  });

  return (
    <div id="loadingCtnID" className={styles["loadingCtn"]}>
      <div>
        <div className={styles["celebration"]}>
          <div className={styles["number"]}>
            <p id="fourID" className={styles["four"]}>
              4
            </p>
            <p id="fiveID" className={styles["zero"]}>
              0
            </p>
          </div>

          <p id="celebrationTextID" className={styles["celebrationText"]}>
            Years Of Celebration
          </p>
        </div>

        <div className={styles["loaderImg"]}>
          <img src="/natural_ice_cream_cover.jpeg" />
        </div>

        <div className={styles["hungry-3"]}></div>
      </div>
    </div>
  );
};

export default Loading;
