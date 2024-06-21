import React, { useEffect, useRef, useState } from "react";
import styles from "../styles/PopularFlavours.module.css";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import SceneInit from "../lib/SceneInit";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

const PopularFlavours = () => {
  const [selectedCarousel, setSelectedCarousel] = useState("c1");

  const scrollerRef = useRef(null);
  const scrollerRefTwo = useRef(null);
  const scrollerRefThree = useRef(null);

  useGSAP(() => {
    // gsap.to("#giftBoxCtnID", {
    //   y: "-10%",
    //   duration: 20,
    //   scrollTrigger: {
    //     trigger: "#partnershipGirlID",
    //     scrub: 2,
    //   },
    // });

    gsap.to("#textPathID", {
      startOffset: "100%",
      duration: 4,
    });

    // gsap.to("#partnershipGirlImgID", {
    //   y: "50%",
    //   duration: 2,
    //   scrollTrigger: {
    //     trigger: "#partnershipGirlID",
    //     scrub: 1,
    //   },
    // });

    if (
      !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      )
    ) {
      gsap.to("#justHeightID img", {
        height: "25%",
        width: "50%",
        duration: 1,

        scrollTrigger: {
          trigger: "#justHeightID",
          scrub: 1,
        },
      });
    }

    //  justHeightThreeID
    gsap.to("#justHeightThreeID", {
      position: "sticky",
      scrollTrigger: {
        trigger: "#justHeightID",
        scrub: 1,
      },
    });
  });

  const initialized = useRef(false);

  useEffect(() => {
    let manualScrollY = 0;
    if (!initialized.current) {
      var lastScrollTop = 0;

      initialized.current = true;

      const glftLoader = new GLTFLoader();

      const dLoader = new DRACOLoader();
      dLoader.setDecoderPath(
        "https://www.gstatic.com/draco/versioned/decoders/1.5.7/"
      );
      dLoader.setDecoderConfig({ type: "js" });
      glftLoader.setDRACOLoader(dLoader);

      const test = new SceneInit("myThreeJsCanvas");
      test.initialize();
      test.animate();

      // const boxGeometry = new THREE.BoxGeometry(8, 8, 8);
      // const boxMaterial = new THREE.MeshNormalMaterial();
      // const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
      // test.scene.add(boxMesh);

      let loadedModel;
      glftLoader.load("/models/fruit_bowl.glb", (gltfScene) => {
        loadedModel = gltfScene;

        // gltfScene.scene.rotation.y = Math.PI / 8;
        // gltfScene.scene.rotation.z = 0;
        // gltfScene.scene.scale.set(10, 10, 10);
        test.scene.add(gltfScene.scene);
      });

      function onScroll(e) {
        const scrollY = e.target.scrollTop;
        const rotationSpeed = 0.004;
        loadedModel.scene.rotation.y = scrollY * rotationSpeed;
      }

      const animate = () => {
        if (loadedModel) {
          //Here we could add some code to update the scene, adding some automatic movement
          // loadedModel.scene.rotation.x = -1.2 + (800 * 2.5) / window.innerHeight;

          //Make the eye move
          if (loadedModel.scene) {
            loadedModel.scene.rotation.x = -1.2 + (800 * 2.5) / 1000;
            // loadedModel.scene.rotation.x =
            //   -1.2 + (800 * 2.5) / window.innerHeight;

            //I've played with the constants here until it looked good
            // object.rotation.x = -1.2 + (mouseY * 2.5) / window.innerHeight;
          }

          document
            .querySelector("body")
            .addEventListener("scroll", (e) => onScroll(e));
        }
        // requestAnimationFrame(animate);

        requestAnimationFrame(animate);
      };
      animate();

      let previousY = 0;
      let previousRatio = 0;

      const footer = document.querySelectorAll("#myThreeJsCanvas");

      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          const currentY = entry.boundingClientRect.y;
          const currentRatio = entry.intersectionRatio;

          if (entry.isIntersecting === true) {
            if (currentY < previousY) {
              // document.querySelector("#justHeightThreeID").style.position = "sticky";
            } else if (currentY > previousY) {
              // document.querySelector("#ryanID").style.position = "static";
            }
          }

          previousY = currentY;
          previousRatio = currentRatio;
        });
      });

      footer.forEach((foot) => {
        footerObserver.observe(foot);
      });

      return () =>
        document.querySelector("body").removeEventListener("scroll", onScroll);
    }
  }, []);

  useEffect(() => {
    var lastScrollTop = 0;
    var ogPosition = 630;

    const textPath = document.querySelector("#text-path");

    function updateTextPathOffset(scrolll, offset) {
      var st = scrolll;

      if (st >= lastScrollTop) {
        // down
        if (ogPosition >= 130) {
          textPath.setAttribute("startOffset", ogPosition);
          ogPosition -= 25;
        }
      } else {
        if (ogPosition <= 1200) {
          textPath.setAttribute("startOffset", ogPosition);

          ogPosition += 25;
        }
      }

      lastScrollTop = st <= 0 ? 0 : st;
    }

    function onScroll(e) {
      requestAnimationFrame(function () {
        updateTextPathOffset(e.target.scrollTop, e.target.scrollTop * 0.25);
      });
    }

    const titles = document.querySelectorAll("#giftBoxCtnID");

    document
      .querySelector("body")
      .addEventListener("scroll", (e) => onScroll(e));

    const intersectionFn = () => {
      const observer = new IntersectionObserver((entries) => {
        // Loop over the entries
        entries.forEach((entry) => {
          // If the element is visible
          if (entry.isIntersecting) {
            gsap.fromTo(
              "#fruitText",
              {
                y: "150%",
              },
              {
                y: "0%",
                duration: 1,
              }
            );

            observer.disconnect();
          }
        });
      });

      observer.observe(document.querySelector("#fruitStoryID"));

      const observerOne = new IntersectionObserver((entries) => {
        // Loop over the entries
        entries.forEach((entry) => {
          // If the element is visible
          if (entry.isIntersecting) {
            gsap.fromTo(
              "#milkText",
              {
                y: "150%",
              },
              {
                y: "0%",
                duration: 1,
              }
            );

            observerOne.disconnect();
          }
        });
      });

      observerOne.observe(document.querySelector("#milkStoryID"));

      const observerTwo = new IntersectionObserver((entries) => {
        // Loop over the entries
        entries.forEach((entry) => {
          // If the element is visible
          if (entry.isIntersecting) {
            gsap.fromTo(
              "#sugarText",
              {
                y: "150%",
              },
              {
                y: "0%",
                duration: 1,
              }
            );

            observerTwo.disconnect();
          }
        });
      });

      observerTwo.observe(document.querySelector("#sugarStoryID"));
    };

    intersectionFn();

    return () =>
      document.querySelector("body").removeEventListener("scroll", onScroll);
  }, []);

  const addAnimation = () => {
    [scrollerRef.current].forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".dummyScrollerRyan");

      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);

        duplicatedItem.setAttribute("aria-hidden", true);

        scrollerInner.appendChild(duplicatedItem);
      });
    });

    [scrollerRefTwo.current].forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".dummyScrollerRyanCrasta");

      const scrollerContent = Array.from(scrollerInner.children);

      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);

        duplicatedItem.setAttribute("aria-hidden", true);

        scrollerInner.appendChild(duplicatedItem);
      });
    });

    [scrollerRefThree.current].forEach((scroller) => {
      scroller.setAttribute("data-animated", true);

      const scrollerInner = scroller.querySelector(".dummyScrollerThree");

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

  const handleChange = (e) => {
    setSelectedCarousel(e.currentTarget.value);
  };

  return (
    <div id="merNaam" className={styles["popularFlavoursCtn"]}>
      <h2>Best sellers</h2>

      <div className={styles["realIceCream"]}>
        <div
          className={`${styles["topLeftCurve"]} ${styles["jackfruiticecream"]}`}
        >
          <div className={styles["lastCtn"]}>
            <img
              className={styles["icecreamImg"]}
              src="/jackfruit-Photoroom.png"
            />
            <img
              className={styles["contentInfo"]}
              src="/ingredients-jackfruit.jpg"
            />

            <div className={styles["icecream-details"]}>
              <div>
                <p>Jackfruit</p>
                <p className={styles["servingDetails"]}>
                  Here’s a flavour that will transport you straight to jackfruit
                  heaven. Procured from Andhra Pradesh and the Konkan region,
                  jackfruit lends its distinct taste to this popular flavour
                  from Naturals. This flavour also happens to be our founder,
                  Mr. Raghunandan Kamath’s personal favourite!
                </p>
                <p>Milk, Jackfruit Pulp, Sugar</p>
              </div>
            </div>
          </div>

          <div className={styles["cartImg"]}>
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
          </div>
        </div>

        <div
          className={`${styles["topRightCurve"]} ${styles["coffeeicecream"]}`}
        >
          <div className={styles["lastCtn"]}>
            <img
              className={styles["icecreamImg"]}
              src="/carrot-Photoroom.png"
            />
            <img
              className={styles["contentInfo"]}
              src="/ingredients-gajar-halwa.jpg"
            />

            <div className={styles["icecream-details"]}>
              <div>
                <p>GAJAR HALWA DESSERT</p>
                <p className={styles["servingDetails"]}>
                  Good news for Gajar Halwa enthusiasts! Inspired by the famous
                  North Indian dessert, we’ve created this flavour that will
                  bring a smile on your face! This delicacy is made with winter
                  carrots and is available during the winters. Once you’ve
                  tasted it, you’ll keep coming back for more.
                </p>
                <p>Milk, Carrot, Sugar, Almond, Cashew</p>
              </div>
            </div>
          </div>

          <div className={styles["cartImg"]}>
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
          </div>
        </div>

        <div className={`${styles["topLeftCurve"]} ${styles["mangoicecream"]}`}>
          <div className={styles["lastCtn"]}>
            <img className={styles["icecreamImg"]} src="/mango-Photoroom.png" />
            <img
              className={styles["contentInfo"]}
              src="/ingredients-mango.jpg"
            />

            <div className={styles["icecream-details"]}>
              <div>
                <p>MANGO ICE CREAM</p>
                <p className={styles["servingDetails"]}>
                  We’ve taken the king of fruits and created an ice cream
                  flavour that rules! Our mango ice cream is made from
                  hand-picked Alphonso mangoes sourced from Ratnagiri. This
                  flavour is every mango lover’s fantasy come true.
                </p>
                <p>Milk, Mango pulp, Sugar</p>
              </div>
            </div>
          </div>

          <div className={styles["cartImg"]}>
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
          </div>
        </div>

        <div
          className={`${styles["topRightCurve"]} ${styles["malaiicecream"]}`}
        >
          <div className={styles["lastCtn"]}>
            <img className={styles["icecreamImg"]} src="/malai-Photoroom.png" />
            <img
              className={styles["contentInfo"]}
              src="/ingredients-malai.jpg"
            />

            <div className={styles["icecream-details"]}>
              <div>
                <p>MALAI ICE CREAM</p>
                <p className={styles["servingDetails"]}>
                  This classic and timeless flavour from Naturals will surprise
                  you every time you lay your hands on it. It’s made from just
                  milk and sugar, but the result is magical! Malai ice cream is
                  also a perfect base for making sundaes or other such dishes.
                </p>
                <p>Milk, Sugar</p>
              </div>
            </div>
          </div>

          <div className={styles["cartImg"]}>
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
          </div>
        </div>

        <div
          className={`${styles["bottomLeftCurve"]} ${styles["guavaicecream"]}`}
        >
          <div className={styles["lastCtn"]}>
            <img className={styles["icecreamImg"]} src="/guava-Photoroom.png" />
            <img
              className={styles["contentInfo"]}
              src="/ingredients-spicy-guava.jpg"
            />

            <div className={styles["icecream-details"]}>
              <div>
                <p>SPICY GUAVA</p>
                <p className={styles["servingDetails"]}>
                  This mouth-watering flavour, containing sweet and tangy guava
                  pulp infused with a spicy kick, crafted with fresh ingredients
                  for a refreshing, satisfying experience. Perfect for
                  adventurous taste buds seeking a flavorful escape.
                </p>
                <p>Milk, Sugar, Guava, Salt, Chilli Powder</p>
              </div>
            </div>
          </div>

          <div className={styles["cartImg"]}>
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
          </div>
        </div>

        <div
          className={`${styles["bottomRightCurve"]} ${styles["orangeicecream"]}`}
        >
          <div className={styles["lastCtn"]}>
            <img
              className={styles["icecreamImg"]}
              src="/orange-Photoroom.png"
            />
            <img
              className={styles["contentInfo"]}
              src="/ingredients-orange.jpg"
            />

            <div className={styles["icecream-details"]}>
              <div>
                <p>ORANGE PISTACHIO ICE CREAM</p>
                <p className={styles["servingDetails"]}>
                  Orange Pistachio is inspired by the nostalgic taste of orange
                  barfi which is loved by all. Naturals has launched the Orange
                  Pistachio ice cream, which has an international yet desi
                  twist. Pulpy, zesty orange bites compliment the nutty, roasted
                  pistachios in this unique flavour!
                </p>
                <p>Milk, Sugar, Orange pulp, Pistachio</p>
              </div>
            </div>
          </div>

          <div className={styles["cartImg"]}>
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
          </div>
        </div>

        <div
          className={`${styles["bottomLeftCurve"]} ${styles["coconuticecream"]}`}
        >
          <div className={styles["lastCtn"]}>
            <img
              className={styles["icecreamImg"]}
              src="/coconut-Photoroom.png"
            />
            <img
              className={styles["contentInfo"]}
              src="/ingredients-coconut.jpg"
            />

            <div className={styles["icecream-details"]}>
              <div>
                <p>TENDER COCONUT ICE CREAM</p>
                <p className={styles["servingDetails"]}>
                  Naturals is a pioneer of the ‘Tender Coconut’ flavour in the
                  country. As an original flavour from Naturals, it is a huge
                  favourite among ice cream lovers. It’s made with real malai
                  from tender coconuts that are sourced from Kerala and
                  Karnataka. You just can’t have enough of this delicious
                  flavour!
                </p>
                <p>Milk, Tender coconut pulp, sugar</p>
              </div>
            </div>
          </div>

          <div className={styles["cartImg"]}>
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
          </div>
        </div>

        <div
          className={`${styles["bottomRightCurve"]} ${styles["grapesicecream"]}`}
        >
          <div className={styles["lastCtn"]}>
            <img
              className={styles["icecreamImg"]}
              src="/grapes-Photoroom.png"
            />
            <img
              className={styles["contentInfo"]}
              src="/ingredients-grapes.jpg"
            />

            <div className={styles["icecream-details"]}>
              <div>
                <p>BLACK GRAPES ICE CREAM</p>
                <p className={styles["servingDetails"]}>
                  Expect a taste of heaven in every bite of our original Black
                  Grapes ice cream. Its amazing taste will leave you craving for
                  more!
                </p>
                <p>Milk, Sugar, Black Grapes Pulp</p>
              </div>
            </div>
          </div>

          <div className={styles["cartImg"]}>
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
          </div>
        </div>
      </div>

      <div className={styles["foodDelivery"]}>
        <div className={styles["foodDeliveryCtn"]}>
          <div className={styles["orderNow"]}>Order now</div>

          <div className={styles["foodDeliveryLogoCtn"]}>
            <img src="/Swiggy_logo.svg" />

            <img src="/Natural_IceCream_Logo.png" />

            <img src="/Zomato.svg" />
          </div>
        </div>
      </div>

      <div id="giftBoxCtnID" className={styles["giftBoxCtn"]}>
        <div className={styles["home__data"]}>
          <svg
            aria-hidden="true"
            width="602"
            height="841"
            viewBox="0 0 602 841"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={styles["mainSVG"]}
          >
            <defs>
              <path
                id="giftobox-curve"
                d="M1 841V311C1 139.792 135.315 1 301 1C466.685 1 601 139.792 601 311V841"
              ></path>

              <clipPath id="frame-clip">
                <use xlinkHref="#giftobox-curve" />
              </clipPath>
            </defs>

            <text className={styles["myText"]} fontSize="133">
              <textPath
                id="text-path"
                xlinkHref="#giftobox-curve"
                startOffset="630"
              >
                Taste the original
              </textPath>
            </text>

            <use xlinkHref="#giftobox-curve" className={styles["frame"]} />
          </svg>

          {/* <img
            src="/compress-childIcecream-ezgif.com-optimize.gif"
            className={styles["videoStyle"]}
          /> */}

          <video
            className={styles["videoStyle"]}
            muted
            autoPlay
            playsinline
            loop
          >
            <source src="/4962001-sd_240_426_25fps.webm" type="video/mp4" />
          </video>

          <div className={styles["outerBtn"]}>
            <div className={styles["innerBtn"]}>
              <p>order happiness</p>
              <div className={styles["innerInnerBox"]}></div>
            </div>
            <div className={styles["outerInnerBox"]}></div>
          </div>
        </div>

        <div className={styles["videoTexts"]}>
          <p>
            in a world where time seems to fly by in the blink of an eye, it’s
            important to pause, breathe, and indulge in the simple pleasures
            that bring us joy.
          </p>
          <p>
            Naturals Ice Cream offers just that – a moment of pure bliss amidst
            the chaos of everyday life.
          </p>
        </div>
      </div>

      <div className={styles["postonRelative"]}>
        {/* <h3>Our stores across India</h3> */}

        <div id="partnershipGirlID" className={styles["partnershipGirl"]}>
          {/* <img id="partnershipGirlImgID" src="/public/allnaturals.jpg" /> */}
          <div className={styles["loved"]}>
            <p>loved 🧡</p>
            <p>across 🤍</p>
            <p>india 💚</p>

            <img src="/watermelon_icon.png" />
          </div>

          <div>
            <img src="/outlets/indore.jpg" />
            {/* Indore Madhya Pradesh */}

            <div className={styles["branchDetails"]}>
              <p>Indore, Madhya Pradesh</p>
            </div>
          </div>
          <div>
            <img src="/outlets/haryana-naturals.jpg" />
            {/* Panchkula, Haryana */}
            <div className={styles["branchDetails"]}>
              <p>Panchkula, Haryana</p>
            </div>
          </div>
          <div>
            <img src="/outlets/hyderabad-naturals.jpg" />
            {/* Hyderabad, Telangana */}
            <div className={styles["branchDetails"]}>
              <p>Hyderabad, Telangana</p>
            </div>
          </div>
          <div>
            <img src="/outlets/kolkata-naturals.jpg" />
            {/* Bangur Avenue, Kolkata */}
            <div className={styles["branchDetails"]}>
              <p>Bangur Avenue, Kolkata</p>
            </div>
          </div>
          <div>
            <img src="/outlets/chattisgarh.jpg" />
            {/* Raipur, Chattisgarh */}
            <div className={styles["branchDetails"]}>
              <p>Raipur, Chattisgarh</p>
            </div>
          </div>
          <div>
            <img src="/outlets/goa.jpg" />
            {/*  Anjuna, Goa*/}
            <div className={styles["branchDetails"]}>
              <p>Anjuna, Goa</p>
            </div>
          </div>
          <div>
            <img src="/outlets/gwalior.jpg" />
            {/* Mahalgaon Gwalior */}
            <div className={styles["branchDetails"]}>
              <p>Mahalgaon, Gwalior</p>
            </div>
          </div>
          <div>
            <img src="/outlets/vada.jpg" />
            {/* Ahmedabad, Gujarat */}
            <div className={styles["branchDetails"]}>
              <p>Ahmedabad, Gujarat</p>
            </div>
          </div>
          <div>
            <img src="/outlets/mumbai.jpg" />
            {/* andheri mumbai */}
            <div className={styles["branchDetails"]}>
              <p>Andheri, Mumbai</p>
            </div>
          </div>
          <div>
            <img src="/outlets/chandigarh.jpg" />
            {/* Sector 7C Chandigarh */}
            <div className={styles["branchDetails"]}>
              <p>Sector 7C, Chandigarh</p>
            </div>
          </div>
          <div className={styles["kerala"]}>
            <img src="/outlets/karela.jpg" />
            {/* Thiruvananthapuram’s kerala */}
            <div className={styles["branchDetails"]}>
              <p>Thiruvananthapuram, kerala</p>
            </div>
          </div>
          <div>
            <img src="/outlets/noida.jpeg" />
            {/* Noida Uttar Pradesh */}
            <div className={styles["branchDetails"]}>
              <p>Noida, Uttar Pradesh</p>
            </div>
          </div>

          <div>
            <img src="/outlets/Bengaluru.jpg" />
            {/* andheri mumbai */}
            <div className={styles["branchDetails"]}>
              <p>Electronic City, Bengaluru</p>
            </div>
          </div>
          <div>
            <img src="/outlets/rajasthan.JPG" />
            {/* Sector 7C Chandigarh */}
            <div className={styles["branchDetails"]}>
              <p>Jaipur, Rajasthan</p>
            </div>
          </div>
          <div>
            <img src="/outlets/delhi.jpg" />
            <div className={styles["branchDetails"]}>
              <p>New Delhi, Delhi</p>
            </div>
          </div>
        </div>
      </div>

      <div className={styles["threeDCtn"]}>
        <div id="myThreeJsCanvas" className={styles["threeDCTN"]}>
          <h3>Key Ingredients</h3>

          <div id="fruitStoryID" className={styles["fruitStory"]}>
            <div>
              <h1 id="fruitText">Fruits 🥭</h1>
            </div>
            <p>
              Fruit is in the DNA of Naturals ice cream. It’s what makes our ice
              creams unique and original. We go to great lengths to source fresh
              fruits only from their most popular locations. Fruits that are
              freshly plucked from farms which eventually end up into freshly
              served scoops of delicious Naturals ice cream.
            </p>
          </div>

          <div id="milkStoryID" className={styles["milkStory"]}>
            <div>
              <h1 id="milkText">milk 🐮</h1>
            </div>
            <p>
              Milk is a key ingredient in ice cream. And the milk that goes into
              Naturals ice cream comes from the same vendor that we started
              doing business with, around three decades ago. This makes our ice
              creams rich, creamy and most importantly, consistent
            </p>
          </div>

          <div id="sugarStoryID" className={styles["sugarStory"]}>
            <div className={styles["sugarTextCtn"]}>
              <div id="sugarText">
                <h1>Sugar</h1>
                <img src="/sugar.png" />
              </div>
            </div>
            <p>
              We use pharma sugar, which is so fine and pure that it’s certified
              to be used even in medicines. Because we make sure only the best
              makes its way into our scoops
            </p>
          </div>
        </div>
      </div>

      <div className={styles["bannerIframsection"]}>
        <div className={styles["iframeCtn"]}>
          <h3>Story of Naturals icecream</h3>

          <iframe
            width="60%"
            height="445"
            frameBorder="0"
            src="https://www.youtube.com/embed/NBeNtpyRSm8?si=tWwKdIvZNKqi6sLR"
          ></iframe>
        </div>

        <div id="bannerIframsectionID" className={styles["carouselCard"]}>
          <h3>Innovations with ice cream</h3>

          <div className={styles["wrapper"]}>
            <div className={styles["container"]}>
              <input
                className={styles["cardInput"]}
                type="radio"
                name="slide"
                value="c1"
                id="c1"
                checked={selectedCarousel.toString() === "c1"}
                onChange={handleChange}
              />
              <label htmlFor="c1" className={styles["card"]}></label>
              <input
                className={styles["cardInput"]}
                type="radio"
                name="slide"
                id="c2"
                onChange={handleChange}
                value="c2"
                checked={selectedCarousel.toString() === "c2"}
              />
              <label htmlFor="c2" className={styles["card"]}></label>
              <input
                className={styles["cardInput"]}
                type="radio"
                name="slide"
                id="c3"
                checked={selectedCarousel.toString() === "c3"}
                value="c3"
                onChange={handleChange}
              />
              <label htmlFor="c3" className={styles["card"]}></label>
              <input
                className={styles["cardInput"]}
                type="radio"
                name="slide"
                id="c4"
                checked={selectedCarousel.toString() === "c4"}
                onChange={handleChange}
                value="c4"
              />
              <label htmlFor="c4" className={styles["card"]}></label>
            </div>
          </div>
        </div>
      </div>

      <div id="justHeightID" className={styles["justHeight"]}>
        <img src="/compress-friends-having-fun-their-reunion-Photoroom.png" />

        <div className={styles["marqueeFooter"]}>
          <div ref={scrollerRef} className={styles["scroller"]}>
            <div
              className={`${styles["footerMarquee"]} ${styles["scroller__inner"]} dummyScrollerRyan`}
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
              className={`${styles["footerMarquee"]} ${styles["scroller__inner"]} dummyScrollerRyanCrasta`}
            >
              <div>taste the original</div>
              <div className={styles["lastElement"]}>taste the original</div>
            </div>
          </div>

          <div ref={scrollerRefThree} className={styles["scroller"]}>
            <div
              className={`${styles["footerMarquee"]} ${styles["scroller__inner"]} dummyScrollerThree`}
            >
              <div>since 1984</div>
              <div className={styles["lastElement"]}>since 1984</div>
            </div>
          </div>
        </div>
      </div>

      <div
        toggle={true}
        id="justHeightThreeID"
        className={styles["justHeightThree"]}
      >
        {/* <img src="https://plus.unsplash.com/premium_photo-1683120952553-af3ec9cd60c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" /> */}

        <h3>Ask and you shall receive</h3>

        <div className={styles["formCtn"]}>
          <div>
            <label id="addressLabel" className={styles["labelStyling"]}>
              Subject of address
            </label>
            <input
              type="text"
              onFocus={() => {
                gsap.to("#inputDownBorderID", {
                  width: "100%",
                  duration: 0.5,
                });

                gsap.to("#addressLabel", {
                  fontSize: "1rem",
                  duration: 0.5,
                });
              }}
              onBlur={() => {
                gsap.to("#inputDownBorderID", {
                  width: "0%",
                  duration: 0.5,
                });

                gsap.to("#addressLabel", {
                  fontSize: "1.25rem",
                  duration: 0.5,
                });
              }}
            />

            <div
              id="inputDownBorderID"
              className={styles["inputDownBorder"]}
            ></div>
          </div>

          <div className={styles["detailsCustomer"]}>
            <div>
              <label id="yourname" className={styles["labelStyling"]}>
                Name
              </label>
              <input
                type="text"
                onFocus={() => {
                  gsap.to("#yournameBorderID", {
                    width: "100%",
                    duration: 0.5,
                  });

                  gsap.to("#yourname", {
                    fontSize: "1rem",
                    duration: 0.5,
                  });
                }}
                onBlur={() => {
                  gsap.to("#yournameBorderID", {
                    width: "0%",
                    duration: 0.5,
                  });

                  gsap.to("#yourname", {
                    fontSize: "1.25rem",
                    duration: 0.5,
                  });
                }}
              />

              <div
                id="yournameBorderID"
                className={styles["inputDownBorder"]}
              ></div>
            </div>

            <div>
              <label id="yourphone" className={styles["labelStyling"]}>
                Mobile number
              </label>
              <input
                type="text"
                onFocus={() => {
                  gsap.to("#yourphoneBorderID", {
                    width: "100%",
                    duration: 0.5,
                  });

                  gsap.to("#yourphone", {
                    fontSize: "1rem",
                    duration: 0.5,
                  });
                }}
                onBlur={() => {
                  gsap.to("#yourphoneBorderID", {
                    width: "0%",
                    duration: 0.5,
                  });

                  gsap.to("#yourphone", {
                    fontSize: "1.25rem",
                    duration: 0.5,
                  });
                }}
              />

              <div
                id="yourphoneBorderID"
                className={styles["inputDownBorder"]}
              ></div>
            </div>

            <div>
              <label id="youremail" className={styles["labelStyling"]}>
                Email
              </label>
              <input
                type="email"
                onFocus={() => {
                  gsap.to("#youremailBorderID", {
                    width: "100%",
                    duration: 0.5,
                  });

                  gsap.to("#youremail", {
                    fontSize: "1rem",
                    duration: 0.5,
                  });
                }}
                onBlur={() => {
                  gsap.to("#youremailBorderID", {
                    width: "0%",
                    duration: 0.5,
                  });

                  gsap.to("#youremail", {
                    fontSize: "1.25rem",
                    duration: 0.5,
                  });
                }}
              />

              <div
                id="youremailBorderID"
                className={styles["inputDownBorder"]}
              ></div>
            </div>
          </div>

          <div>
            <label id="messageLabel" className={styles["labelStyling"]}>
              Message
            </label>
            <input
              type="text"
              onFocus={() => {
                gsap.to("#messageLabelID", {
                  width: "100%",
                  duration: 0.5,
                });

                gsap.to("#messageLabel", {
                  fontSize: "1rem",
                  duration: 0.5,
                });
              }}
              onBlur={() => {
                gsap.to("#messageLabelID", {
                  width: "0%",
                  duration: 0.5,
                });

                gsap.to("#messageLabel", {
                  fontSize: "1.25rem",
                  duration: 0.5,
                });
              }}
            />

            <div
              id="messageLabelID"
              className={styles["inputDownBorder"]}
            ></div>
          </div>

          <button>Send</button>
        </div>

        <div className={styles["footer"]}>
          <div className={styles["footerItem"]}>
            <p
              onMouseEnter={() => {
                gsap.to("#footerBorderAboutID", {
                  scale: 1,
                  duration: 0.5,
                });
              }}
              onMouseLeave={() => {
                gsap.to("#footerBorderAboutID", {
                  scale: 0,
                  duration: 0.5,
                });
              }}
            >
              About Naturals
            </p>
            <div
              id="footerBorderAboutID"
              className={styles["footerBorder"]}
            ></div>
          </div>

          <div className={styles["footerItem"]}>
            <p
              onMouseEnter={() => {
                gsap.to("#footerBordershopID", {
                  scale: 1,
                  duration: 0.5,
                });
              }}
              onMouseLeave={() => {
                gsap.to("#footerBordershopID", {
                  scale: 0,
                  duration: 0.5,
                });
              }}
            >
              Shop
            </p>
            <div
              id="footerBordershopID"
              className={styles["footerBorder"]}
            ></div>
          </div>

          <div className={styles["socialMedia"]}>
            <div>
              <p
                onMouseEnter={() => {
                  gsap.to("#footerBorderYTID", {
                    scale: 1,
                    duration: 0.5,
                  });
                }}
                onMouseLeave={() => {
                  gsap.to("#footerBorderYTID", {
                    scale: 0,
                    duration: 0.5,
                  });
                }}
              >
                YouTube
              </p>
              <div
                id="footerBorderYTID"
                className={styles["footerBorder"]}
              ></div>
            </div>

            <div>
              <p
                onMouseEnter={() => {
                  gsap.to("#footerBorderFBID", {
                    scale: 1,
                    duration: 0.5,
                  });
                }}
                onMouseLeave={() => {
                  gsap.to("#footerBorderFBID", {
                    scale: 0,
                    duration: 0.5,
                  });
                }}
              >
                Facebook
              </p>
              <div
                id="footerBorderFBID"
                className={styles["footerBorder"]}
              ></div>
            </div>

            <div>
              <p
                onMouseEnter={() => {
                  gsap.to("#footerBorderID", {
                    scale: 1,
                    duration: 0.5,
                  });
                }}
                onMouseLeave={() => {
                  gsap.to("#footerBorderID", {
                    scale: 0,
                    duration: 0.5,
                  });
                }}
              >
                Instagram
              </p>
              <div id="footerBorderID" className={styles["footerBorder"]}></div>
            </div>
          </div>

          <div className={styles["aboutMe"]}>
            Made by{" "}
            <a href="https://www.linkedin.com/in/ryan-crasta/" target="_blank">
              Ryan Crasta
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopularFlavours;
