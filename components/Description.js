import styles from "./Description.module.scss";
import "tailwindcss/tailwind.css";
import CryptoJS from "crypto-js";
import anime from "animejs";
import { useEffect } from "react";

function Description() {
  useEffect(() => {}, []);
  const cyperList = {
    Y5TOAA: "U2FsdGVkX1+z7DEPaQ5A6+M0sWKMa+73gpX6tY5TOAA=",
    uaSC40: "U2FsdGVkX1+6FORtJnHxZe6w2aFoz+qaVJgl4uaSC40=",
    jCEulA: "U2FsdGVkX19YbwRy9SeT8vkAI38zgoCF0FSjMjCEulA=",
    "3sH04M": "U2FsdGVkX1+AlCfkVqn+S4HIk4YED9T2AWhUT3sH04M=",
    "6I3xTs": "U2FsdGVkX18dySe6yJQ585AoMwNj9go5/lrYg6I3xTs=",
    SV54nc: "U2FsdGVkX18ZvXwsJM7PVN2j8z2iDvJimm5RASV54nc=",
    qW8geM: "U2FsdGVkX18vSv4K6GCh9zhi6xyRYPWXioHE9qW8geM=",
    MTrO74: "U2FsdGVkX18/iVLLwWnPaJ6IKdu5bd21BMBMzMTrO74=",
    RHCmao: "U2FsdGVkX1/Cb5o5hkHig6dXjbRzpNDXRXn7JRHCmao=",
    "jY/2db":
      "U2FsdGVkX1/KpkQZMf269tH6mE7p6K0SIPHm9VWqVttrhTtYNWjXTD9ZthjY/2db",
    PKhNyc: "U2FsdGVkX1+HDbWJh4ZDmxGKZyyvOnPZq9p56PKhNyc=",
    ez73SI: "U2FsdGVkX1+ibk8cZ+mb2rWZuNNzBTF6biPnaez73SI=",
    Sk2VlU: "U2FsdGVkX18tUXtk/LpD6mTq+PeVo5FGClJn8Sk2VlU=",
    GB1ywM: "U2FsdGVkX18H2DPHo6SWRonv2gH5jt4ABCTD7GB1ywM=",
    "o6/pZE": "U2FsdGVkX1+lqGmxu8qEodwyFZebXzKPMl75po6/pZE=",
    "53Y7zg": "U2FsdGVkX19lpSN0ZuJYGL49f5enyP3SbLAZf53Y7zg=",
    drbY5o: "U2FsdGVkX1+B4t+QLlgTwWmr8yg3SWXWoATRJdrbY5o=",
  };

  let firstQuest = false;

  const descriptionDecrypt = async () => {
    const pass = document.getElementById("descriptionPass");
    const entries_cyperList = Object.entries(cyperList);
    for (let i = 0; i < entries_cyperList.length; i++) {
      const element = entries_cyperList[i];
      const bytes = CryptoJS.AES.decrypt(element[1], pass.value);
      let originalText;
      try {
        originalText = bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        pass.value = "";
        pass.style.backgroundColor = "#FFB1BA";
        break;
      } finally {
        if (originalText != "") {
          pass.disabled = true;
          pass.style.backgroundColor = "#8ED8AC";
          firstQuest = true;
          await shakeLetterAnimation(element[0], originalText, 500).then(() => {
            document.getElementById(element[0]).style.textDecoration = "none";
          });
        } else {
          pass.value = "";
          pass.style.backgroundColor = "#FFB1BA";
          break;
        }
      }
    }
    if (firstQuest) {
      secretButtonOnAnimation();
    }
  };

  const secretButtonOnAnimation = () => {
    const e = document.getElementById("secretbutton");
    const secretbuttonObj = { opacity: 0 };
    anime({
      targets: secretbuttonObj,
      opacity: 1,
      duration: 500,
      easing: "easeInOutCubic",
      update: () => {
        e.style.opacity = secretbuttonObj["opacity"];
      },
    });
  };

  const openAnimation = () => {
    if (firstQuest) {
      const e = document.getElementById("secretcard");
      e.style.zIndex = 30;
      const secretcardObj = { opacity: 0 };
      anime({
        targets: secretcardObj,
        opacity: 1,
        duration: 500,
        easing: "easeInOutCubic",
        update: () => {
          e.style.opacity = secretcardObj["opacity"];
        },
      });
    }
  };

  const closeAnimation = () => {
    const e = document.getElementById("secretcard");
    const secretcardObj = { opacity: 1 };
    anime({
      targets: secretcardObj,
      opacity: 0,
      duration: 500,
      easing: "easeInOutCubic",
      update: () => {
        e.style.opacity = secretcardObj["opacity"];
      },
    }).finished.then(() => {
      e.style.zIndex = -1;
    });
  };

  const decrypt = () => {
    if (firstQuest) {
      const pass = document.getElementById("pass").value;
      const cyper =
        "U2FsdGVkX1+Yk12lZABb0Xk4YKp6mT3+hpYb1KSW/Om/jfSYC65how/TMylM+BJq";
      const bytes = CryptoJS.AES.decrypt(
        // text.textContent.toString(),
        cyper,
        pass.toString()
      );
      let originalText = "";
      try {
        originalText = bytes.toString(CryptoJS.enc.Utf8);
      } catch (error) {
        statusAnimation(0);
      } finally {
        if (originalText != "") {
          document.getElementById("pass").disabled = true;
          document.getElementById("decrypt").disabled = true;
          shakeLetterAnimation("decryp", originalText, 2000).then(() => {
            statusAnimation(1);
          });
        } else {
          statusAnimation(0);
        }
      }
    }
  };

  const statusAnimation = (status) => {
    const e = document.getElementById("status");
    const statusObj = { opacity: 0 };
    if (status == 0) {
      e.style.backgroundColor = "#EA5148";
      e.textContent = "FAIL";
    } else if (status == 1) {
      e.style.backgroundColor = "#00B27A";
      e.textContent = "SUCCESS";
    }
    anime({
      targets: statusObj,
      opacity: 1,
      direction: "alternate",
      duration: 500,
      loop: 5,
      easing: "easeOutQuint",
      update: () => {
        e.style.opacity = statusObj["opacity"];
      },
    });
  };

  const shakeLetterAnimation = async (id, value, duration) => {
    const text = document.getElementById(id);
    let value_code = stringToCharCode(value);
    const arr_code = stringToCharCode(text.textContent);
    if (value_code.length < arr_code.length) {
      fillBlankArray(arr_code, value_code);
    } else if (value_code.length > arr_code.length) {
      fillBlankArray(value_code, arr_code);
    }
    let code = arrToDict(arr_code);
    const ani = anime({
      targets: code,
      ...arrToDict(value_code),
      duration,
      easing: "easeInQuart",
      update: () => {
        text.textContent = String.fromCharCode(...Object.values(code));
      },
    });
    return ani.finished;
  };

  const descriptionPassKeyUp = (e) => {
    if (e.key == "Enter") {
      descriptionDecrypt();
    }
  };

  return (
    <div>
      <div className={styles.main}>
        <h1>
          <span id="Y5TOAA">♥♥♥</span> 츄우
        </h1>
        <h3>
          チューちゃん{" "}
          <span>
            @<span id="uaSC40">♥♥♥</span>_Chu
          </span>
        </h3>
        <p className={styles.kr}>
          <span id="jCEulA">♥♥♥</span>을 잃어버려&nbsp;
          <span id="3sH04M">♥♥♥</span>을 사용할 수 없게 된{" "}
          <span id="6I3xTs">♥♥♥</span>. <br />
          <span id="SV54nc">♥♥♥</span>을 찾아 <span id="qW8geM">♥♥♥</span>
          로 내려오게 되는데... <br />
          의식주를 해결하기 위해 인터넷 방송을 시작하게 되었다.
        </p>
        <p className={styles.jp}>
          <span id="MTrO74">♥♥♥</span>を失って
          <span id="RHCmao">♥♥♥</span>
          が使えなくなった
          <span id="jY/2db">♥♥♥</span>。
          <br />
          <span id="PKhNyc">♥♥♥</span>を探して
          <span id="ez73SI">♥♥♥</span>
          に降りてくるんだけど···。
          <br />
          衣食住を解決するため、インターネット放送を始めることになった。
        </p>
        <p className={styles.en}>
          The <span id="Sk2VlU">♥♥♥</span> lost hers{" "}
          <span id="GB1ywM">♥♥♥</span> and unable to use any{" "}
          <span id="o6/pZE">♥♥♥</span>. <br />
          She came down to the <span id="53Y7zg">♥♥♥</span> in search of{" "}
          <span id="drbY5o">♥♥♥</span>... <br />
          Internet broadcasting was started to solve food, clothing, and house.
        </p>
        <p className="text-primary text-2xl">PASSWORD</p>
        <input
          type="text"
          id="descriptionPass"
          className="rounded-full p-2 pl-4 pr-4 focus:outline-none focus:ring-4 focus:ring-pink-200 m-3 text-base"
          onKeyUp={descriptionPassKeyUp}
        />
        <button
          className="ml-10 text-secondary opacity-0"
          type="button"
          onClick={openAnimation}
          id="secretbutton"
        >
          SECRET
        </button>
      </div>
      <div
        className="absolute opacity-0 left-0 top-0"
        id="secretcard"
        style={{ zIndex: -1 }}
      >
        <div className="absolute w-screen h-screen bg-red-200 opacity-40"></div>
        <div className="absolute w-screen h-screen">
          <div className="absolute flex left-0 right-0 top-0 bottom-0 m-auto w-1/4 h-2/6 bg-red-50 rounded-lg shadow-inner ring-yellow-300">
            <button
              type="button"
              className="absolute right-0 m-3"
              onClick={closeAnimation}
            >
              X
            </button>
            <div className="self-center m-auto grid gap-5 w-4/5">
              <p className="text-center text-xl text-white" id="status"></p>
              <p className="text-primary text-4xl">PASSWORD</p>
              <p className="break-all" id="decryp">
                U2FsdGVkX1+Yk12lZABb0Xk4YKp6mT3+hpYb1KSW/Om/jfSYC65how/TMylM+BJq
              </p>
              <input
                type="text"
                id="pass"
                className="rounded-full focus:outline-none focus:ring-4 focus:ring-pink-200 p-1 pl-2 pr-2"
              />
              <button
                type="button"
                className="text-right"
                id="decrypt"
                onClick={decrypt}
              >
                제출
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function arrToDict(arr) {
  let dict = {};
  arr.forEach((v, i) => {
    dict[i] = v;
  });
  return dict;
}

function stringToCharCode(str) {
  return [...str].map((c) => c.charCodeAt(0));
}

function fillBlankArray(standard_arr, apply_arr) {
  const weight = (standard_arr.length - apply_arr.length) / 2;
  const lw = Math.ceil(weight);
  const rw = Math.floor(weight);
  for (let i = 0; i < standard_arr.length; i++) {
    if (i < lw) {
      apply_arr.unshift(32);
    } else if (i >= standard_arr.length - rw) {
      apply_arr.push(32);
    }
  }
}

export default Description;
