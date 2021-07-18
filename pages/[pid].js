import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import anime from "animejs";
import Description from "../components/Description";
import VanillaTilt from "vanilla-tilt";
import Menu from "../components/Menu";
import Contact from "../components/Contact";

function Pid() {
  const router = useRouter();
  const { pid } = router.query;
  const availablePid = ["main", "description", "debut", "contact"];

  useEffect(() => {}, []);

  useEffect(() => {
    if (availablePid.includes(pid)) {
      //항상 적용되는 부분
      document.getElementById("circle").addEventListener("load", svgLoad);
    }
    switch (pid) {
      case "main":
        // ddayCountAnim();
        clickProccess = false;
        ddayAnim(true);
        break;

      case "description":
      case "contact":
      case "debut":
        ddayAnim(false);
        rightAnimation().then(() => {
          clickProccess = false;
        });
        break;

      default:
        break;
    }
  }, [pid]);

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
    const windowlow =
      window.innerWidth <= window.innerHeight
        ? window.innerWidth
        : window.innerHeight;
    moveElement("vtuber_avatar", wei, windowlow * 0.04);
    moveElement("dday_text", wei, windowlow * 0.04);
    moveElement("circle", wei, windowlow * 0.025);
    let impact = windowlow * 0.01;
    const menu = document.getElementById("menu");
    menu.style.marginLeft = `${wei[0] * impact}px`;
    menu.children[0].style.marginTop = `${wei[1] * impact}px`;
  };

  const moveElement = (eName, wei, impact) => {
    const e = document.getElementById(eName);
    e.style.left = `${wei[0] * impact}px`;
    e.style.top = `${wei[1] * impact}px`;
  };

  const svgLoad = () => {
    circleGradientAnimation();
    onResize();
    window.addEventListener("resize", onResize);
    const e = document.getElementById("profile");
    VanillaTilt.init(e, {
      max: 5,
      reverse: true,
      "full-page-listening": true,
      speed: 10,
    });
    document.addEventListener("mousemove", onMouseMove);
  };

  const onResize = () => {
    const circle = document.getElementById("circle");
    const vtuber = document.getElementById("vtuber");
    vtuber.style.top = `${circle.offsetTop}px`;
    vtuber.style.width = `${circle.offsetWidth}px`;
    vtuber.style.height = `${circle.offsetHeight}px`;
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

  const ddayCountAnim = () => {
    const dday = { dday: 80 };
    const e = document.getElementById("dday");
    anime({
      targets: dday,
      dday: 69,
      round: 1,
      duration: 3000,
      easing: "easeOutQuart",
      update: function () {
        e.textContent = dday["dday"];
      },
    });
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
    return lastAnime.finished;
  };

  const rightAnimation = async () => {
    const rightPanelObj = { opacity: 0, width: 0 };
    const lastAnime = anime({
      targets: rightPanelObj,
      opacity: 1,
      width: 30,
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
    anime({
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
    if (!clickProccess && `./${pid}` != e) {
      clickProccess = true;
      if (pid == "main") {
        router.push(e, undefined, { shallow: true });
      } else {
        returnAnimation().then(() => {
          router.push(e, undefined, { shallow: true });
        });
      }
    }
  };

  return availablePid.includes(pid) ? (
    <div className="overflow-hidden">
      <Head>
        <title>Vtuber CHU</title>
        <meta name="description" content="Vtuber CHU" />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <main className="select-none w-screen h-screen grid">
        <video
          autoPlay
          muted
          loop
          className="fixed min-h-full min-w-full object-cover"
        >
          <source src="/background.mp4" type="video/mp4"></source>
        </video>
        <div className="flex z-10 w-full h-full">
          <div
            id="menu"
            data-tilt
            className="flex-1 m-auto p-10 space-y-3 text-3xl font-thin text-primary grid"
          >
            <Menu pid={pid} shallowPush={shallowPush} />
          </div>
          <div
            id="profile"
            className="w-5/12 h-full relative m-auto"
            data-tilt
            style={{ transformStyle: "preserve-3d" }}
          >
            <div className="w-full h-full absolute top-0 left-0 z-20" />
            <object
              data="/circle.svg"
              id="circle"
              className="m-auto w-full absolute top-0 bottom-0 max-h-9/10"
            />
            <div
              id="vtuber"
              className="m-auto absolute filter drop-shadow-2xl-primary"
              style={{ transform: "translateZ(30px)" }}
            >
              <video
                id="vtuber_avatar"
                src="./vitchu_disable.webm"
                className="w-full h-full object-contain m-auto absolute"
                style={{ transform: "scale(0.9)" }}
                autoPlay
                muted
                loop
              />
            </div>
          </div>
          <div id="rightPanel" className="flex-1 p-10 w-0 opacity-0 m-auto">
            {
              {
                main: <div></div>,
                description: <Description />,
                debut: <p className="text-2xl">debut</p>,
                contact: <Contact />,
              }[pid]
            }
          </div>
          <div className="absolute right-0 p-5 w-48">
            <img src="./logo.png" />
          </div>
          <div
            className="absolute left-1/2 top-1/2 p-5 text-center text-primary filter drop-shadow-2xxl-whitepink"
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
              D-
              <span id="dday" style={{ fontFamily: "Shadows Into Light" }}>
                69
              </span>
            </p>
          </div>
        </div>
      </main>
    </div>
  ) : (
    <h1>ERROR</h1>
  );
}

export default Pid;
