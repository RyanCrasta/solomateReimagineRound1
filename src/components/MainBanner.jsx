import React, { useEffect, useRef } from "react";
import styles from "../styles/MainBanner.module.css";

// import girlwithicecreamBanner from "../../public/girlwithicecreamBanner.jpg";

// import girlwithicecreamBanner from "https://images.unsplash.com/photo-1672393158642-f7739caf22ff?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const MainBanner = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
  }, []);

  useGSAP(() => {
    // gsap.to("#girlWithIceCreamID img", {
    //   scale: 1,
    //   duration: 1,
    //   scrollTrigger: {
    //     trigger: "#mainBannerSecondHalfCtnID",
    //     scrub: 5,
    //     end: "-=5px",
    //   },
    // });

    // gsap.from("#girlWithIceCreamID", {
    //   width: "100%",
    //   height: "50%",
    //   duration: 1,
    //   top: "0",
    //   scrollTrigger: {
    //     trigger: "#mainBannerSecondHalfCtnID",
    //     scrub: 5,
    //     end: "-=5px",
    //     // scroller: "body",
    //   },
    // });

    // gsap.to("#girlWithIceCreamID img", {
    //   y: "200px",
    //   duration: 0.1,
    //   scrollTrigger: {
    //     trigger: "#sectionTwoCtnID",
    //     end: "-=5px",
    //     scrub: 5,
    //   },
    // });

    gsap.fromTo(
      ".headingText",
      {
        y: "150%",
        transform: "rotate(10deg)",
      },
      {
        y: "0",
        duration: 1,
        transform: "rotate(0deg)",

        delay: 4,
      }
    );

    gsap.fromTo(
      "#flavourCTA",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 2,
        delay: 5,
      }
    );
  });

  const closeMenu = () => {
    gsap.to("#menuCardID", {
      scale: 0,
      borderBottomLeftRadius: "60rem",
      duration: 0.5,
      delay: 1,
    });

    gsap.fromTo(
      "#menuMenuID",
      {
        opacity: 1,
      },
      {
        opacity: 0,
      }
    );

    gsap.fromTo(
      "#menuCardNavID div p",

      {
        y: "0%",
      },
      {
        y: "140%",
        duration: 1,
      }
    );

    gsap.to("#overlayBlurID", {
      display: "none",
      backdropFilter: "blur(0px)",
    });
  };

  const openMenu = () => {
    gsap.fromTo(
      "#menuCardID",
      {
        scale: 0,
        borderBottomLeftRadius: "60rem",
        duration: 0.5,
      },
      {
        borderBottomLeftRadius: "5rem",
        scale: 1,
        duration: 0.5,
      }
    );

    gsap.fromTo(
      "#menuCardNavID div p",
      {
        y: "140%",
      },
      {
        y: "0%",
        duration: 0.5,
        delay: 0.2,
      }
    );

    gsap.fromTo(
      "#menuMenuID",
      {
        opacity: 0,
      },
      {
        opacity: 1,
        duration: 1,
        delay: 0.2,
      }
    );

    gsap.to("#overlayBlurID", {
      display: "block",
      backdropFilter: "blur(6px)",
    });
  };

  useEffect(() => {
    var lastScrollTop = 0;

    document.querySelector("body").addEventListener(
      "scroll",
      (event) => {
        var st = event.target.scrollTop; // Credits: "https://github.com/qeremy/so/blob/master/so.dom.js#L426"
        if (st >= lastScrollTop) {
          // downscroll code
        } else if (st < lastScrollTop) {
          // upscroll code
          if (st === 0) {
            gsap.to("#girlWithIceCreamID", {
              width: "100%",
              height: "50%",
              // duration: 1,
              top: "0",
              scrollTrigger: {
                scrub: 5,
                end: "-=5px",
                // trigger: "#mainBannerSecondHalfCtnID",
              },
            });
          }
        } // else was horizontal scroll
        lastScrollTop = st <= 0 ? 0 : st; // For Mobile or negative scrolling
      },
      false
    );

    // return () => (window.onscroll = null);
  }, []);

  const scrollerRef = useRef(null);
  const scrollerRefTwo = useRef(null);
  const scrollerRefThree = useRef(null);

  const addAnimation = () => {
    [scrollerRef.current].forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".dummyScrollerHeaderOne");

      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);

        duplicatedItem.setAttribute("aria-hidden", true);

        scrollerInner.appendChild(duplicatedItem);
      });
    });

    [scrollerRefTwo.current].forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".dummyScrollerHeaderTwo");

      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);

        duplicatedItem.setAttribute("aria-hidden", true);

        scrollerInner.appendChild(duplicatedItem);
      });
    });

    [scrollerRefThree.current].forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".dummyScrollerHeaderThree");

      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);

        duplicatedItem.setAttribute("aria-hidden", true);

        scrollerInner.appendChild(duplicatedItem);
      });
    });
  };

  useEffect(() => {
    addAnimation();
  }, []);

  return (
    <div className={styles["oneCtnClass"]}>
      <div id="overlayBlurID" className={styles["overlayBlur"]}></div>

      <nav className={styles["outerNav"]}>
        <div id="menuCardID" className={styles["menuCard"]}>
          <div
            id="menuMenuID"
            className={styles["menuMenu"]}
            onClick={() => closeMenu()}
          >
            <div>
              <p>Menu</p>

              <svg
                className={styles["crossMenu"]}
                width="23"
                height="23"
                fill="#fff"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  x="0.825195"
                  y="21.7529"
                  width="30"
                  height="1"
                  transform="rotate(-45 0.825195 21.7529)"
                ></rect>
                <rect
                  width="30"
                  height="1"
                  transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 22.7451 21.7529)"
                ></rect>
              </svg>
            </div>
          </div>

          <div id="menuCardNavID" className={styles["menuCardNav"]}>
            <div>
              <p>Home</p>
            </div>
            <div>
              <p>About us</p>
            </div>
            <div>
              <p>Catalog</p>
            </div>
            <div>
              <p>Selling points</p>
            </div>
            <div>
              <p>FAQ</p>
            </div>
            <div>
              <p>Contact</p>
            </div>
          </div>
        </div>

        <div>
          <img src="/Naturals-logo-40years-removebg-preview.png" />
        </div>

        <div className={styles["navRight"]}>
          <div className={styles["cartNav"]}>
            <svg
              id="cartSVG"
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.25 6.24994V3.74994C6.25001 3.3111 6.36553 2.88 6.58496 2.49996C6.80439 2.11992 7.11998 1.80433 7.50003 1.58492C7.88007 1.36551 8.31118 1.25 8.75002 1.25C9.18885 1.25 9.61996 1.36552 10 1.58494C10.38 1.36552 10.8111 1.25 11.25 1.25C11.6888 1.25 12.1199 1.36551 12.5 1.58492C12.88 1.80433 13.1956 2.11992 13.415 2.49996C13.6345 2.88 13.75 3.3111 13.75 3.74994V6.24994H14.375C14.8723 6.24994 15.3492 6.44748 15.7008 6.79911C16.0525 7.15074 16.25 7.62766 16.25 8.12494V16.2499C16.25 16.913 15.9866 17.5489 15.5178 18.0177C15.0489 18.4865 14.413 18.7499 13.75 18.7499H6.25C5.58696 18.7499 4.95107 18.4865 4.48223 18.0177C4.01339 17.5489 3.75 16.913 3.75 16.2499V8.12494C3.75 7.62766 3.94754 7.15074 4.29917 6.79911C4.65081 6.44748 5.12772 6.24994 5.625 6.24994H6.25ZM7.5 3.74994V6.24994H10V3.74994C10 3.41842 9.8683 3.10047 9.63388 2.86605C9.39946 2.63163 9.08152 2.49994 8.75 2.49994C8.41848 2.49994 8.10054 2.63163 7.86612 2.86605C7.6317 3.10047 7.5 3.41842 7.5 3.74994ZM13.75 17.4999C14.0815 17.4999 14.3995 17.3682 14.6339 17.1338C14.8683 16.8994 15 16.5815 15 16.2499V8.12494C15 7.95918 14.9342 7.80021 14.8169 7.683C14.6997 7.56578 14.5408 7.49994 14.375 7.49994H12.5V16.2499C12.5 16.5815 12.6317 16.8994 12.8661 17.1338C13.1005 17.3682 13.4185 17.4999 13.75 17.4999ZM11.25 7.49994H5.625C5.45924 7.49994 5.30027 7.56578 5.18306 7.683C5.06585 7.80021 5 7.95918 5 8.12494V16.2499C5 16.5815 5.1317 16.8994 5.36612 17.1338C5.60054 17.3682 5.91848 17.4999 6.25 17.4999H11.585C11.365 17.1201 11.2494 16.6889 11.25 16.2499V7.49994ZM11.25 3.74994V6.24994H12.5V3.74994C12.5001 3.55908 12.4566 3.37073 12.3727 3.19932C12.2887 3.02792 12.1667 2.878 12.0158 2.76107C11.865 2.64414 11.6894 2.5633 11.5025 2.52476C11.3156 2.48621 11.1223 2.49097 10.9375 2.53869C11.1375 2.89744 11.25 3.31119 11.25 3.74994Z"
                fill="white"
              />
            </svg>
            <div>
              <p>Cart</p>
            </div>
          </div>
          <div className={styles["flavoursNav"]}>
            <p>Flavours</p>
          </div>
          <div onClick={openMenu} className={styles["hamburger"]}>
            <p>Menu</p>

            <svg
              className={styles["menuSVG"]}
              width="30"
              height="11"
              fill="#13a538"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="0" width="30" height="1"></rect>
              <rect x="0" width="30" height="1"></rect>
              <rect x="0" y="5" width="30" height="1"></rect>
              <rect x="0" y="5" width="30" height="1"></rect>
              <rect x="0" y="10" width="30" height="1"></rect>
              <rect x="0" y="10" width="30" height="1"></rect>
            </svg>
          </div>
        </div>
      </nav>

      <div id="mainBannerFirstHalfID" className={styles["mainBannerFirstHalf"]}>
        <main>
          <div className={styles["mainBannerRow"]}>
            <div
              className={`${styles["firstRowChild"]} ${styles["paddingTopLarge"]}`}
            >
              <h1 className="headingText">
                <span>N</span>
                <span>A</span>
                <span>T</span>
                <span>U</span>
                <span>R</span>
                <span className={styles["upsideDownA"]}>Ɐ</span>
                <span>L</span>
                <span>S</span>
              </h1>
            </div>
          </div>

          <div
            className={`${styles["mainBannerRow"]} ${styles["mainBannerRowTwo"]}`}
          >
            <div
              className={`${styles["firstRowChild"]} ${styles["middleRowChild"]}`}
            >
              <h1 className="headingText">ICE</h1>
            </div>

            <div id="flavourCTA" className={styles["flavourBtnCtn"]}>
              <div className={styles["svgBannerCtn"]}>
                <svg
                  width="142"
                  height="142"
                  viewBox="0 0 142 142"
                  fill="none"
                  stroke="#13A538"
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
                  fill="#13A538"
                  className={styles["rightArrow"]}
                >
                  <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z"></path>
                </svg>
              </div>

              <div>flavours</div>
            </div>
          </div>

          <div
            className={`${styles["mainBannerRow"]} ${styles["lastBannerRow"]}`}
          >
            <h1 className="headingText">CREAM</h1>
          </div>
        </main>
      </div>

      <div id="fullWidthImgID" className={styles["fullWidthImg"]}>
        <div id="girlWithIceCreamID" className={styles["girlWithIceCream"]}>
          <img src="/girlWatermelonIcecream-transparent.png" />
        </div>
      </div>

      <div
        id="mainBannerSecondHalfCtnID"
        className={styles["mainBannerSecondHalfCtn"]}
      >
        <div className={styles["marqueeFooter"]}>
          <div ref={scrollerRef} className={styles["scroller"]}>
            <div
              className={`${styles["footerMarquee"]} ${styles["scroller__inner"]} dummyScrollerHeaderOne`}
            >
              <div>crafted with care</div>
              <div className={styles["lastElement"]}>crafted with care</div>
            </div>
          </div>

          <div
            data-direction="right"
            ref={scrollerRefTwo}
            className={styles["scroller"]}
          >
            <div
              className={`${styles["footerMarquee"]} ${styles["scroller__inner"]} dummyScrollerHeaderTwo`}
            >
              <div>taste the original</div>
              <div className={styles["lastElement"]}>taste the original</div>
            </div>
          </div>

          <div ref={scrollerRefThree} className={styles["scroller"]}>
            <div
              className={`${styles["footerMarquee"]} ${styles["scroller__inner"]} dummyScrollerHeaderThree`}
            >
              <div>since 1984</div>
              <div className={styles["lastElement"]}>since 1984</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainBanner;
