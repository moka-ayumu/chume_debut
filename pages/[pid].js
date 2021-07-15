import { useRouter } from "next/router";
import { useEffect } from "react";
import Head from "next/head";
import styles from "../styles/[pid].module.scss";
import anime from "animejs";
import Description from "../components/Description";

function Pid() {
  const router = useRouter();
  const { pid } = router.query;
  const availablePid = [
    "main",
    "description",
    "twitch",
    "youtube",
    "twitter",
    "contact",
  ];

  useEffect(() => {
    console.log(pid);
    if (availablePid.includes(pid)) {
      //항상 적용되는 부분
      document
        .getElementById("circle")
        .addEventListener("load", circleGradientAnimation);
    }
    switch (pid) {
      case "main":
        // mainAnimation();
        clickProccess = false;
        break;

      case "description":
      case "twitch":
      case "youtube":
      case "twitter":
      case "contact":
        rightAnimation().then(() => {
          clickProccess = false;
        });
        break;

      default:
        break;
    }
  }, [pid]);

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

  const mainAnimation = () => {
    const dday = { dday: 365 };
    const menuObj = { opacity: 0 };
    const profileObj = { marginLeft: -480 };
    const releaseObj = { margin: 40, fontSizeAdd: 20 };
    const vitchuObj = { opacity: 0 };
    let e = document.getElementById("dday");
    let menu = document.getElementById("menu");

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
    anime({
      targets: menuObj,
      opacity: 1,
      delay: 2500,
      duration: 1000,
      easing: "easeInQuad",
      update: () => {
        menu.style.opacity = menuObj["opacity"];
      },
    });
    anime({
      targets: profileObj,
      marginLeft: 0,
      delay: 2000,
      duration: 1500,
      easing: "easeInOutQuart",
      update: () => {
        document.getElementById(
          "profile"
        ).style.marginLeft = `${profileObj["marginLeft"]}px`;
      },
    });
    anime({
      targets: releaseObj,
      margin: 0,
      fontSizeAdd: 0,
      delay: 2000,
      duration: 1500,
      easing: "easeInOutQuart",
      update: () => {
        document.getElementById(
          "release"
        ).style.margin = `${releaseObj["margin"]}vh`;
        document.getElementById("release").style.fontSize = `${
          40 + releaseObj["fontSizeAdd"]
        }px`;
        document.getElementById("release").style.lineHeight = `${
          43 + releaseObj["fontSizeAdd"]
        }px`;
        document.getElementById("dday_text").style.fontSize = `${
          35 + releaseObj["fontSizeAdd"]
        }px`;
      },
    });
    anime({
      targets: vitchuObj,
      opacity: 1,
      delay: 1500,
      duration: 1500,
      easing: "easeInOutQuart",
      update: () => {
        document.getElementById(
          "vitchu"
        ).style.opacity = `${vitchuObj["opacity"]}`;
      },
    });
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
          console.log("return done");
          router.push(e, undefined, { shallow: true });
        });
      }
    } else {
      console.log("clickProccess: TRUE");
    }
  };

  return availablePid.includes(pid) ? (
    <div>
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
            className="flex-1 m-auto p-10 space-y-3 text-3xl font-thin text-primary"
          >
            {availablePid.map((v, i) => (
              <p
                onClick={() => shallowPush(`./${v}`)}
                className={`hover:text-hover capitalize duration-150 ease-in-out ${
                  v == pid ? "font-medium" : ""
                }`}
                key={i}
              >
                {v}
              </p>
            ))}
          </div>
          <div id="profile" className="w-5/12 h-full relative m-auto">
            <object
              data="/profile.svg"
              id="circle"
              className="m-auto w-full absolute top-0 bottom-0 max-h-9/10"
            />
          </div>
          <div id="rightPanel" className="flex-1 p-10 w-0 opacity-0 m-auto">
            {
              {
                main: <div></div>,
                description: <Description />,
                twitch: <p>twitch</p>,
                youtube: <p>youtube</p>,
                twitter: <p>twitter</p>,
                contact: <p>contact</p>,
              }[pid]
            }
          </div>
          <div className="absolute right-0 p-5 text-right text-primary">
            <p id="release" className="font-medium text-4xl">
              DEBUT
            </p>
            <p id="dday_text" className="font-thin text-3xl tracking-wider">
              D-<span id="dday">69</span>
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
