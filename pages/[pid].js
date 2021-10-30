import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";
import anime from "animejs";
import Description from "../components/Description";
import VanillaTilt from "vanilla-tilt";
import Menu from "../components/Menu";
import Contact from "../components/Contact";
import Bgm from "../components/Bgm";
import Debut from "../components/Debut";
import default_styles from "../styles/[pid].module.scss";
import mobile_styles from "../styles/[pid].mobile.module.scss";
import { ViewListIcon, DocumentTextIcon } from "@heroicons/react/outline";

function Pid() {
  const router = useRouter();
  const { pid } = router.query;
  const availablePid = ["main", "description", "debut", "contact"];
  const [styles, setStyles] = useState(default_styles);
  const isMobile = "mobile" in styles;

  useEffect(() => {
    checkMobile();
    if (
      navigator.userAgent.includes("SamsungBrowser") &&
      document.getElementById("main_content") != null
    ) {
      document.getElementById("main_content").style.height = "88%";
      document.getElementById("dday_parent").style.transform =
        "translate(-50%, -70%)";
    }
  });

  useEffect(() => {
    defaultChange(false);
  }, [styles]);

  useEffect(() => {
    if (isMobile) {
      defaultChange(false);
      onResize();
    } else {
      defaultChange(true);
    }
  }, [pid]);

  const defaultChange = (rightAniBool) => {
    if (availablePid.includes(pid)) {
      //항상 적용되는 부분
      document.getElementById("circle").addEventListener("load", svgLoad);
      if (pid == "description") {
        document.getElementById("description_content").style.opacity = 1;
        document.getElementById("description_content").style.height = "";
        document.getElementById("description_content").style.position = "";
      } else {
        document.getElementById("description_content").style.opacity = 0;
        document.getElementById("description_content").style.height = 0;
        document.getElementById("description_content").style.position =
          "relative";
      }
    }
    switch (pid) {
      case "main":
        // ddayCountAnim();
        clickProccess = false;
        ddayAnim(true);
        if (isMobile) {
          document.getElementById("rightPanel").style.height = 0;
        }
        break;

      case "description":
      case "contact":
      case "debut":
        ddayAnim(false);
        if (!isMobile) {
          if (rightAniBool) {
            rightAnimation().then(() => {
              clickProccess = false;
            });
          } else {
            clickProccess = false;
          }
          document.getElementById("rightPanel").style.height = "";
        } else {
          clickProccess = false;
          document.getElementById("rightPanel").style.height = "100%";
        }
        break;

      default:
        break;
    }
  };

  const onMouseMove = (e) => {
    getMousePosition(e);
  };

  const getMousePosition = (e, additionalX = 0, additionalY = 0) => {
    const windowWH = [window.innerWidth, window.innerHeight];
    const clientWH = [e.clientX + additionalX, e.clientY + additionalY];
    const center = [windowWH[0] / 2, windowWH[1] / 2];
    let weight = [
      Math.round(clientWH[0] - center[0]) / center[0],
      Math.round(clientWH[1] - center[1]) / center[1],
    ];
    mouseInteractive(weight);
  };

  const mouseInteractive = (wei) => {
    // if (!isMobile) {
    const windowlow =
      window.innerWidth <= window.innerHeight
        ? window.innerWidth
        : window.innerHeight;
    moveElementByName("vtuber_avatar1", wei, windowlow * 0.04);
    // moveElementByName("vtuber_avatar2", wei, windowlow * 0.04);
    moveElementByName("dday_text", wei, windowlow * 0.04);
    moveElementByName("circle", wei, windowlow * 0.025);
    let impact = windowlow * 0.01;
    const menu = document.getElementById("menu");
    menu.style.marginLeft = `${wei[0] * impact}px`;
    menu.children[0].style.marginTop = `${wei[1] * impact}px`;
    // }
  };

  const moveElementByName = (eName, wei, impact) => {
    const e = document.getElementById(eName);
    e.style.left = `${wei[0] * impact}px`;
    e.style.top = `${wei[1] * impact}px`;
  };

  const resetMoveElementByName = (eName) => {
    const e = document.getElementById(eName);
    e.style.left = "";
    e.style.top = "";
  };

  let svgLoaded = false;
  const svgLoad = () => {
    svgLoaded = true;
    circleGradientAnimation();
    onResize();
    window.addEventListener("resize", onResize);
    if (!isMobile) {
      const e = document.getElementById("profile");
      VanillaTilt.init(e, {
        max: 5,
        reverse: true,
        "full-page-listening": true,
        speed: 10,
        reset: false,
      });
      document.addEventListener("mousemove", onMouseMove);
    }
  };

  let styles_type = 0;
  const onResize = () => {
    checkMobile();
    const circle = document.getElementById("circle");
    const vtuber = document.getElementById("vtuber");
    vtuber.style.top = `${circle.offsetTop}px`;
    vtuber.style.width = `${circle.offsetWidth}px`;
    vtuber.style.height = `${circle.offsetHeight}px`;
  };

  const checkMobile = () => {
    if (window.innerHeight >= window.innerWidth && styles_type == 0) {
      if (document.getElementById("profile") != null) {
        if (svgLoaded) {
          document.removeEventListener("mousemove", onMouseMove);
          resetMoveElementByName("vtuber_avatar1");
          // resetMoveElementByName("vtuber_avatar2");
          resetMoveElementByName("dday_text");
          resetMoveElementByName("circle");
          const menu = document.getElementById("menu");
          menu.style.marginLeft = "";
          menu.children[0].style.marginTop = "";
          const e = document.getElementById("profile");
          e.vanillaTilt.destroy();
        }
        document.getElementById("profile").style.marginLeft = "";
        document.getElementById("rightPanel").style.width = "";
      }
      setStyles(mobile_styles);
      styles_type = 1;
    } else if (window.innerHeight < window.innerWidth && styles_type == 1) {
      if (svgLoaded) {
        document.addEventListener("mousemove", onMouseMove);
        const e = document.getElementById("profile");
        VanillaTilt.init(e, {
          max: 5,
          reverse: true,
          "full-page-listening": true,
          speed: 10,
          reset: false,
        });
      }
      if (document.getElementById("profile") != null && pid != "main") {
        document.getElementById("profile").style.marginLeft = "-25vw";
        document.getElementById("rightPanel").style.width = "30vw";
        document.getElementById("rightPanel").style.height = "";
        document.getElementById("rightPanel").style.opacity = "1";
      }
      styles_type = 0;
      setStyles(default_styles);
    }
  };

  const circleGradientAnimation = () => {
    const gradientObj = { x1: 10.501, y1: 11.063, x2: 1087.499, y2: 1088.06 };
    let gradient = document
      .getElementById("circle")
      .getSVGDocument()
      .getElementById("linear-gradient");
    anime({
      targets: gradientObj,
      keyframes: [
        { x1: 10.501, y1: 11.063, x2: 1087.499, y2: 1088.06 },
        { x1: 1087.499, y1: 11.063, x2: 10.501, y2: 1088.06 },
        { x1: 1087.499, y1: 1088.06, x2: 10.501, y2: 11.063 },
        { x1: 10.501, y1: 1088.06, x2: 1087.499, y2: 11.063 },
        { x1: 10.501, y1: 11.063, x2: 1087.499, y2: 1088.06 },
      ],
      duration: 3000,
      easing: "easeInQuad",
      loop: true,
      update: function () {
        for (const [key, value] of Object.entries(gradientObj)) {
          gradient.setAttribute(key, value);
        }
      },
    });
  };

  const mobileMenuAnim = () => {
    const e = document.getElementById("mobile_menu");
    const mobileMenuObj = {
      // maskSize: 0,
      opacity: 0,
    };
    e.style.zIndex = 100;
    anime({
      targets: mobileMenuObj,
      // maskSize: 200,
      opacity: 1,
      duration: 1000,
      update: () => {
        // e.style.maskSize = `${mobileMenuObj["maskSize"]}vh`;
        e.style.opacity = mobileMenuObj["opacity"];
      },
    });
  };

  const mobileMenuCloseAnim = () => {
    const e = document.getElementById("mobile_menu");
    const mobileMenuObj = {
      maskSize: 200,
      opacity: 1,
    };
    anime({
      targets: mobileMenuObj,
      maskSize: 0,
      opacity: 0,
      duration: 1000,
      update: () => {
        e.style.maskSize = `${mobileMenuObj["maskSize"]}vh`;
        e.style.opacity = mobileMenuObj["opacity"];
      },
    }).finished.then(() => {
      e.style.zIndex = -1;
    });
  };

  const ddayCountAnim = () => {
    // const dday = { dday: 80 };
    const e = document.getElementById("dday");
    const nd = new Date().getDate();
    const cot = 30 - nd;
    if (cot != 0) {
      e.textContent = cot;
    } else {
      e.textContent = "DAY";
      e.style.fontSize = "21vw";
    }
    // anime({
    //   targets: dday,
    //   dday: 8 - nd,
    //   round: 1,
    //   duration: 3000,
    //   easing: "easeOutQuart",
    //   update: function () {
    //     if (dday["dday"] != 0) {
    //       e.textContent = dday["dday"];
    //     } else {
    //       e.textContent = "DAY";
    //       e.style.fontSize = "21vw";
    //     }
    //   },
    // });
  };

  const ddayAnim = (v) => {
    const e = document.getElementById("dday_text");
    if (e.style.opacity != 0 || v) {
      const ddayObj = { opacity: v ? 0 : 1 };
      if (v) {
        e.closest("div").style.zIndex = 2;
      }
      anime({
        targets: ddayObj,
        opacity: v ? 1 : 0,
        duration: 500,
        easing: "easeOutQuart",
        update: () => {
          e.style.opacity = ddayObj["opacity"];
        },
      }).finished.then(() => {
        if (!v) {
          e.closest("div").style.zIndex = -1;
        }
      });
    } else if (e.style.opacity == "") {
      e.closest("div").style.zIndex = -1;
      e.style.opacity = 0;
    }
  };

  const returnAnimation = async () => {
    const rightPanelObj = { opacity: 1, width: 30 };
    const lastAnime = anime({
      targets: rightPanelObj,
      opacity: 0,
      width: 0,
      delay: 100,
      duration: 500,
      easing: "easeOutQuart",
      update: function () {
        let e = document.getElementById("rightPanel");
        e.style.opacity = rightPanelObj["opacity"];
        e.style.width = `${rightPanelObj["width"]}vw`;
      },
    });
    // document.getElementById("profile").style.marginLeft = "";
    // if (!isMobile) {
    const profileObj = { marginLeft: -25 };
    anime({
      targets: profileObj,
      marginLeft: 0,
      duration: 500,
      easing: "easeInOutQuart",
      update: () => {
        document.getElementById(
          "profile"
        ).style.marginLeft = `${profileObj["marginLeft"]}vw`;
      },
    });
    // }
    return lastAnime.finished;
  };

  const rightAnimation = async () => {
    const rightPanelObj = { opacity: 0, width: 0 };
    const lastAnime = anime({
      targets: rightPanelObj,
      opacity: 1,
      width: isMobile ? 90 : 30,
      delay: 100,
      duration: 500,
      easing: "easeOutQuart",
      update: function () {
        let e = document.getElementById("rightPanel");
        e.style.opacity = rightPanelObj["opacity"];
        e.style.width = `${rightPanelObj["width"]}vw`;
      },
    });
    const profileObj = { marginLeft: 0 };
    const profileAnime = anime({
      targets: profileObj,
      marginLeft: -25,
      duration: 500,
      easing: "easeInOutQuart",
      update: () => {
        document.getElementById(
          "profile"
        ).style.marginLeft = `${profileObj["marginLeft"]}vw`;
      },
    });
    return lastAnime.finished;
  };

  let clickProccess = true;
  const shallowPush = (e) => {
    if (!clickProccess && `/${pid}` != e) {
      clickProccess = true;
      if (pid == "main" || isMobile) {
        router.push(e, undefined, { shallow: true });
      } else {
        returnAnimation().then(() => {
          router.push(e, undefined, { shallow: true });
        });
      }
    }
  };

  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return availablePid.includes(pid) ? (
    <div className="fixed">
      <Head>
        <title>
          Vtuber CHUME{pid == "main" ? "" : ` | ${capitalizeFirst(pid)}`}
        </title>
      </Head>
      <main className={styles.main}>
        <video autoPlay muted loop playsinline>
          <source src="./background.mp4" type="video/mp4"></source>
        </video>
        <div id="main_content">
          <div id="menu" className={styles.menu} data-tilt>
            {!isMobile ? (
              <Menu pid={pid} shallowPush={shallowPush} mobile={false} />
            ) : (
              <div className="flex gap-1 z-10">
                <Bgm />
                <ViewListIcon className="h-10" onClick={mobileMenuAnim} />
              </div>
            )}
          </div>
          <div id="profile" className={styles.profile} data-tilt>
            <div className={styles.profileCover} />
            <object data="./circle.svg" id="circle" />
            <div id="vtuber" className={styles.avatar}>
              <video
                id="vtuber_avatar1"
                src="./default.webm"
                autoPlay
                muted
                loop
                playsinline
              />
              <video
                id="vtuber_avatar2"
                src="./default.webm"
                className="opacity-0"
                autoPlay
                muted
                loop
                playsinline
              />
            </div>
          </div>
          <div id="rightPanel" className={styles.rightPanel}>
            <Description
              style={{ opacity: 0, height: 0, position: "relative" }}
            />
            {
              {
                main: <div></div>,
                description: <div></div>,
                debut: <Debut />,
                contact: <Contact />,
              }[pid]
            }
          </div>
          <div
            className={styles.logo}
            onClick={() => {
              alert("doyouwantme?");
            }}
          >
            <img src="./logo.png" />
          </div>
          <div
            className={styles.dday}
            id="dday_parent"
            style={{ transform: "translate(-50%, -50%)" }}
          >
            <p
              id="dday_text"
              className="font-thin tracking-wider relative"
              style={{
                fontFamily: "Shadows Into Light",
                fontSize: "25vw",
              }}
            >
              CHUME
              {/* <span id="dday" style={{ fontFamily: "Shadows Into Light" }}>
                69
              </span> */}
            </p>
          </div>
          {isMobile ? (
            <div className="hidden" />
          ) : (
            <div>
              <div className="absolute left-7 bottom-7">
                <DocumentTextIcon
                  className="h-10 text-primary"
                  onClick={() => {
                    window.open("./LICENSE.txt");
                  }}
                />
              </div>
              <div className="absolute right-7 bottom-7">
                <Bgm />
              </div>
            </div>
          )}
        </div>
        <div
          className="absolute opacity-0 left-0 top-0 bg-pink-200"
          id="mobile_menu"
          style={{
            zIndex: -1,
            // mask: "url(/youtube.png) 50% 70%",
            // maskSize: "300vh",
            // maskRepeat: "no-repeat",
          }}
        >
          <div
            className="w-10/12 h-3/4 m-auto relative"
            onClick={mobileMenuCloseAnim}
          >
            <div className="flex flex-col m-auto gap-4 text-primary text-3xl">
              {availablePid.map((v, i) => (
                <p
                  onClick={() => {
                    shallowPush(`/${v}`);
                  }}
                  className="font-medium"
                  key={i}
                >
                  {capitalizeFirst(v)}
                </p>
              ))}
            </div>
          </div>
          <div className="absolute left-7 bottom-28">
            <DocumentTextIcon
              className="h-10 text-primary"
              onClick={() => {
                window.open("./LICENSE.txt");
              }}
            />
          </div>
        </div>
      </main>
    </div>
  ) : (
    <h1>ERROR</h1>
  );
}

export default Pid;
