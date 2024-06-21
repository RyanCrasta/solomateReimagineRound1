import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/SectionTwo.module.css";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay } from "swiper/modules";

const SectionTwo = () => {
  const [scrollDown, setScrollDown] = useState(true);

  useGSAP(() => {
    gsap.to("#twoPplIceCreamID, #hoddieguyicecreamID", {
      y: "-200px",
      duration: 2,
      scrollTrigger: {
        scroller: "body",
        // markers: true,
        trigger: "#secSectionSecHeadingCtnID",
        scrub: 5,
      },
    });

    gsap.to("#cloudsOneID", {
      x: "-150vw",
      duration: 15,
      repeat: -1,
    });

    gsap.to("#cloudsTwoID", {
      x: "-190vw",
      duration: 15,
      repeat: -1,
    });

    gsap.to("#cloudsThreeID", {
      x: "-165vw",
      duration: 20,
      repeat: -1,
    });

    // gsap.to("#girlEatingIceCreamOverlayID", {
    //   scale: 1.2,

    //   scrollTrigger: {
    //     trigger: "#lastPara",
    //     scrub: 5,
    //   },
    // });
  });

  useEffect(() => {
    var lastScrollTop = 0;

    gsap.registerPlugin(ScrollTrigger);

    function pageThreeIntersectFn() {
      const observer = new IntersectionObserver((entries) => {
        // Loop over the entries
        entries.forEach((entry) => {
          // If the element is visible
          if (entry.isIntersecting) {
            gsap.fromTo(
              "#sectionTwoMainTextID p",
              {
                y: "100%",
              },
              {
                y: "0%",
                duration: 1,
                stagger: 0.3,
              }
            );

            observer.disconnect();
          }
        });
      });

      observer.observe(document.querySelector("#sectionTwoMainTextID"));

      const observerOne = new IntersectionObserver((entries) => {
        // Loop over the entries
        entries.forEach((entry) => {
          // If the element is visible
          if (entry.isIntersecting) {
            gsap.to("#realImgID", {
              borderTop: "0px solid #b00e2f",
              borderLeft: "0px solid #b00e2f",
              borderRight: "0px solid #b00e2f",
              duration: 2,
            });
            observerOne.disconnect();
          }
        });
      });

      observerOne.observe(document.querySelector("#lastPara"));
      let previousY = 0;

      const observerTwo = new IntersectionObserver((entries) => {
        // Loop over the entries
        entries.forEach((entry) => {
          const currentY = entry.boundingClientRect.y;

          // If the element is visible
          if (entry.isIntersecting) {
            if (currentY < previousY) {
              gsap.to("#girlEatingIceCreamOverlayID", {
                scale: 1.2,
                duration: 1,
              });
            } else {
              gsap.to("#girlEatingIceCreamOverlayID", {
                scale: 1,
                duration: 1,
              });
            }
          } else {
            if (currentY < previousY) {
              gsap.to("#girlEatingIceCreamOverlayID", {
                scale: 1.2,
                duration: 1,
              });
            } else {
              gsap.to("#girlEatingIceCreamOverlayID", {
                scale: 1,
                duration: 1,
              });
            }
          }

          previousY = currentY;
        });
      });

      observerTwo.observe(document.querySelector("#lastPara"));
    }

    pageThreeIntersectFn();

    const scrollDirection = (scrollTop) => {
      var st = scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
      if (st >= lastScrollTop) {
        // downscroll code
        setScrollDown(true);
      } else if (st < lastScrollTop) {
        setScrollDown(false);

        // upscroll code
      } // else was horizontal scroll
      lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
    };

    function onScroll(e) {
      requestAnimationFrame(function () {
        scrollDirection(e.target.scrollTop);
      });
    }

    document
      .querySelector("body")
      .addEventListener("scroll", (e) => onScroll(e));

    return () =>
      document.querySelector("body").removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div id="sectionTwoCtnID" className={styles["sectionTwoCtn"]}>
      <img
        id="twoPplIceCreamID"
        className={styles["twoPplIceCream"]}
        src="/compress-couple-eating-icecream.jpg"
      />

      <img
        id="hoddieguyicecreamID"
        className={styles["hoddieGuyIceCream"]}
        src="/compress-friends-enjoying-ice-cream-together.jpg"
      />

      <img
        id="cloudsOneID"
        className={styles["cloudsOne"]}
        src="/cloud1.webp"
      />

      <img
        id="cloudsThreeID"
        className={styles["cloudsThree"]}
        src="/cloud1.webp"
      />

      <img
        id="cloudsTwoID"
        className={styles["cloudsTwo"]}
        src="/cloud2.webp"
      />

      <div id="sectionTwoMainTextID" className={styles["sectionTwoMainText"]}>
        <div>
          <p>
            at <span className={styles["naturalColor"]}>Naturals</span> Ice
            Cream we ensure
          </p>
        </div>
        <div>
          <p>that each scoop is as pure </p>
        </div>

        <div id="lastPara">
          <p>and delicious as the fruit itself.</p>
        </div>
      </div>

      <div className={styles["imgCtn"]}>
        <div
          id="girlEatingIceCreamOverlayID"
          className={styles["girlEatingIceCreamOverlay"]}
        >
          <div id="realImgID" className={styles["realImg"]}></div>
        </div>
      </div>

      <div
        id="secSectionSecHeadingCtnID"
        className={styles["secSectionSecHeadingCtn"]}
      >
        <p className={styles["secSectionSecHeading"]}>
          From Humble Beginnings to Ice Cream Excellence: 40 years of scooping
          up love.
        </p>

        <p className={styles["secSectionFirstPara"]}>
          Naturals ice cream is loved across the country. A cup of Naturals ice
          cream is usually devoured in no time at all. This is in stark contrast
          to the process that we follow to make our ice cream.
        </p>

        <p className={styles["secSectionSecPara"]}>
          It’s slow and unhurried. The original taste of our ice creams is
          precisely due to the small batches in which they are made and the time
          we allow them to be created in. While we have continued to grow, we
          still make our ice creams with a lot of love, care and TIME. And
          originality of course!
        </p>

        <div className={styles["aboutUsCtn"]}>
          <div className={styles["aboutUsBtn"]}>
            <svg
              width="142"
              height="142"
              viewBox="0 0 142 142"
              fill="none"
              stroke="#fff"
              xmlns="http://www.w3.org/2000/svg"
              className={styles["circleCurvySvg"]}
            >
              <path
                className={`${styles["turn"]} ${styles["fastTurn"]}`}
                d="M80.5401 3.92485L83.3167 5.48241C86.3051 7.15875 89.666 8.0593 93.0922 8.10174L96.2756 8.14117C103.069 8.22532 109.33 11.8397 112.8 17.6813L114.425 20.4185C116.175 23.3644 118.636 25.8248 121.582 27.5746L124.319 29.2005C130.16 32.6703 133.775 38.9305 133.859 45.7244L133.898 48.9078C133.941 52.334 134.841 55.6949 136.518 58.6833L138.075 61.4599C141.399 67.3857 141.399 74.6144 138.075 80.5401L136.518 83.3168C134.841 86.3051 133.941 89.666 133.898 93.0922L133.859 96.2756C133.775 103.069 130.16 109.33 124.319 112.8L121.582 114.425C118.636 116.175 116.175 118.636 114.425 121.582L112.8 124.319C109.33 130.16 103.069 133.775 96.2756 133.859L93.0922 133.898C89.666 133.941 86.3051 134.841 83.3167 136.518L80.5401 138.075C74.6144 141.399 67.3856 141.399 61.4599 138.075L58.6833 136.518C55.6949 134.841 52.334 133.941 48.9078 133.898L45.7244 133.859C38.9305 133.775 32.6703 130.16 29.2005 124.319L27.5746 121.582C25.8248 118.636 23.3644 116.175 20.4185 114.425L17.6813 112.8C11.8397 109.33 8.22531 103.069 8.14116 96.2756L8.10173 93.0922C8.05929 89.666 7.15874 86.3051 5.48241 83.3168L3.92484 80.5401C0.600782 74.6144 0.60078 67.3857 3.92484 61.4599L5.4824 58.6833C7.15874 55.6949 8.05929 52.334 8.10173 48.9078L8.14116 45.7244C8.22531 38.9305 11.8397 32.6703 17.6813 29.2005L20.4185 27.5746C23.3644 25.8248 25.8248 23.3644 27.5746 20.4185L29.2004 17.6813C32.6703 11.8397 38.9305 8.22532 45.7244 8.14117L48.9078 8.10174C52.334 8.0593 55.6949 7.15875 58.6833 5.48241L61.4599 3.92485C67.3856 0.600792 74.6144 0.600789 80.5401 3.92485Z"
              ></path>
              <path
                className={`${styles["turn"]} ${styles["slowTurn"]}`}
                d="M97.5755 8.67953L99.8544 10.9027C102.307 13.2953 105.32 15.0351 108.619 15.9628L111.684 16.8248C118.224 18.6645 123.336 23.776 125.175 30.3166L126.037 33.3813C126.965 36.6798 128.705 39.6931 131.097 42.1457L133.321 44.4247C138.065 49.2881 139.936 56.2705 138.259 62.8547L137.473 65.9399C136.627 69.2603 136.627 72.7397 137.473 76.0601L138.259 79.1453C139.936 85.7295 138.065 92.7119 133.321 97.5754L131.097 99.8543C128.705 102.307 126.965 105.32 126.037 108.619L125.175 111.683C123.336 118.224 118.224 123.336 111.684 125.175L108.619 126.037C105.32 126.965 102.307 128.705 99.8544 131.097L97.5755 133.32C92.712 138.065 85.7296 139.936 79.1455 138.259L76.0603 137.473C72.7399 136.627 69.2604 136.627 65.94 137.473L62.8548 138.259C56.2707 139.936 49.2883 138.065 44.4248 133.32L42.1459 131.097C39.6932 128.705 36.6799 126.965 33.3815 126.037L30.3167 125.175C23.7761 123.335 18.6646 118.224 16.825 111.683L15.963 108.619C15.0352 105.32 13.2955 102.307 10.9028 99.8543L8.67968 97.5754C3.93518 92.7119 2.06425 85.7295 3.74135 79.1453L4.5272 76.0601C5.37297 72.7397 5.37297 69.2603 4.5272 65.9399L3.74136 62.8547C2.06425 56.2706 3.93518 49.2881 8.67967 44.4246L10.9028 42.1457C13.2955 39.6931 15.0352 36.6798 15.963 33.3813L16.825 30.3166C18.6646 23.776 23.7761 18.6645 30.3167 16.8248L33.3815 15.9628C36.6799 15.0351 39.6932 13.2953 42.1459 10.9027L44.4248 8.67954C49.2883 3.93505 56.2707 2.06411 62.8548 3.74121L65.94 4.52706C69.2604 5.37283 72.7399 5.37283 76.0603 4.52706L79.1454 3.74121C85.7296 2.06411 92.712 3.93504 97.5755 8.67953Z"
              ></path>
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="32"
              height="32"
              fill="rgba(255,255,255,1)"
              className={styles["rightArrow"]}
            >
              <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
            </svg>
          </div>

          <div>About us</div>
        </div>
      </div>

      <div className={styles["imgStyle"]}>
        <Swiper
          spaceBetween={3}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
            reverseDirection: scrollDown ? false : true,
          }}
          loop={true}
          preventInteractionOnTransition={true}
          allowTouchMove={false}
          modules={[Autoplay]}
          breakpoints={{
            450: {
              slidesPerView: 4,
            },
            200: {
              slidesPerView: 2,
            },
          }}
          className="mySwiper"
        >
          <SwiperSlide>
            <img src="/compress-beautiful-mature-woman-spending-time-around-city.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/compress-ethnic-youngster-eating-ice-cream-checkered-shirt.jpg" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/compress-portrait-little-cheerful-girl-summer-hat-with-ice-cream-her-hands.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/compress-medium-shot-smiley-woman-holding-ice-creams.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/compress-beautiful-mature-woman-spending-time-around-city.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/compress-ethnic-youngster-eating-ice-cream-checkered-shirt.jpg" />
          </SwiperSlide>

          <SwiperSlide>
            <img src="/compress-portrait-little-cheerful-girl-summer-hat-with-ice-cream-her-hands.jpg" />
          </SwiperSlide>
          <SwiperSlide>
            <img src="/compress-medium-shot-smiley-woman-holding-ice-creams.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
};

export default SectionTwo;
