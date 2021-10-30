import styles from "./Description.module.scss";
import "tailwindcss/tailwind.css";
import CryptoJS from "crypto-js";
import anime from "animejs";
import { useEffect, useState } from "react";
import { XIcon, ChevronRightIcon } from "@heroicons/react/outline";

function Description({ style }) {
  const [page, setPage] = useState(0);
  let secretFault = 0;

  useEffect(() => {
    if (
      document.getElementById("descriptionPass").style.backgroundColor ==
      "rgb(142, 216, 172)"
    ) {
      firstQuest = true;
    }
    if (navigator.userAgent.includes("SamsungBrowser")) {
    }
  });
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
        secretFault++;
        break;
      } finally {
        if (originalText != "" && pass.value.length == 12) {
          pass.disabled = true;
          pass.style.backgroundColor = "#8ED8AC";
          firstQuest = true;
          await shakeLetterAnimation(element[0], originalText, 500).then(() => {
            document.getElementById(element[0]).style.textDecoration = "none";
          });
        } else {
          pass.value = "";
          pass.style.backgroundColor = "#FFB1BA";
          secretFault++;
          break;
        }
      }
    }
    if (secretFault == 3) {
      alert("Hint : LOGO");
    }
    if (firstQuest) {
      secretButtonOnAnimation();
      document.getElementById("side").style.opacity = "1";
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

  const oeenSecretVideo = () => {
    const e_bottom = document.getElementById("vtuber_avatar1");
    const e = document.getElementById("vtuber_avatar2");
    e.src = "/sL0z7TSX5os.webm";
    const eObj = { opacity: 0 };
    e.currentTime = e_bottom.currentTime;
    anime({
      targets: eObj,
      opacity: 1,
      delay: 500,
      duration: 1000,
      easing: "easeOutQuart",
      update: () => {
        e.style.opacity = eObj["opacity"];
        e_bottom.style.opacity = 1 - eObj["opacity"];
      },
    });
  };

  const decrypt = () => {
    if (firstQuest) {
      const pass = document.getElementById("pass").value;
      const cyper =
        "U2FsdGVkX1/rp/m0mJkS0ZAIluRF6qeb4wT2QI+Uln0Z1eIXF5Z0z9H+aF70mUIv";
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
        if (originalText != "" && pass.length == 4) {
          document.getElementById("pass").disabled = true;
          document.getElementById("decrypt").disabled = true;
          shakeLetterAnimation("decryp", originalText, 2000).then(() => {
            statusAnimation(1);
            // oeenSecretVideo();
            closeAnimation();
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

  const addPage = (e) => {
    if (e.target.style.opacity != "") {
      if (page == 2) {
        setPage(0);
        document.getElementById("main_desc").style.height = "";
      } else {
        setPage(page + 1);
        document.getElementById("main_desc").style.height = 0;
      }
    }
  };

  return (
    <div
      id="description_content"
      className="flex overflow-hidden"
      style={style}
    >
      <div className={styles.main}>
        <h1>
          <span id="Y5TOAA">♥♥♥</span> 츄메
        </h1>
        <h3>
          チュメ{" "}
          <span>
            @<span id="uaSC40">♥♥♥</span>_Chume
          </span>
        </h3>
        <div id="main_desc" className="overflow-hidden">
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
            Internet broadcasting was started to solve food, clothing, and
            house.
          </p>
        </div>
        {
          {
            1: (
              <div>
                <p className={styles.kr}>
                  전형적인 쿠소빗치. 서큐버스답게 &apos;그쪽&apos; 분야에
                  빠삭하다. <br />
                  대체 머리에 뭐가 들어있는거야?
                </p>
                <p className={styles.jp}>
                  典型的なクソビッチ。サーキュバスらしく
                  <br />
                  &apos;H&apos;な分野について知っていることが多い。
                  <br />
                  一体頭に何が入っているの？
                </p>
                <p className={styles.en}>
                  Typical kusobitch. Like a succubus, <br />
                  she is so genius about the field of &apos;H&apos;. <br />{" "}
                  What&apos;s in her brain?
                </p>
              </div>
            ),
            2: (
              <div>
                <p className={styles.kr}>
                  자고있는 사람만 주로 상대해왔기 때문에 <br /> 사람과 직접
                  대화하는 것은 어려워한다.
                  <br />
                  방송은 사람과 직접 만나는게 아니라서 괜찮다는 듯 하다.
                </p>
                <p className={styles.jp}>
                  寝ている人だけに会ってきたので、人と直接話すのは苦手。
                  <br />
                  放送は人と直接会うのではないから大丈夫みたいだ。
                </p>
                <p className={styles.en}>
                  Since She have only dealt with people who are sleeping, <br />
                  it&apos;s difficult to talk directly with people. <br />
                  But, Broadcasting seems to be okay
                  <br />
                  because it&apos;s not meeting people in person.
                </p>
              </div>
            ),
          }[page]
        }
        <p className="text-primary text-2xl">PASSWORD</p>
        <div className="flex">
          <input
            type="text"
            id="descriptionPass"
            className="rounded-full p-2 pl-4 pr-4 focus:outline-none focus:ring-4 focus:ring-pink-200 m-3 text-base w-8/12"
            onKeyUp={descriptionPassKeyUp}
          />
          <button
            className="ml-10 text-secondary opacity-0 bg-red-200 pl-6 pr-6 rounded-2xl hover:bg-red-300"
            type="button"
            onClick={openAnimation}
            id="secretbutton"
          >
            SECRET
          </button>
        </div>
      </div>
      <div className="flex">
        <ChevronRightIcon
          className="h-10 text-primary mt-auto mb-28 opacity-0"
          id="side"
          onClick={addPage}
        />
      </div>
      <div className={styles.secretcard} id="secretcard" style={{ zIndex: -1 }}>
        <div className="absolute w-screen h-screen bg-red-200 opacity-40"></div>
        <div className="absolute w-screen h-screen">
          <div className={styles.decryp}>
            <XIcon
              className="absolute right-0 m-3 h-6 text-primary"
              onClick={closeAnimation}
            />
            <div className="self-center m-auto grid gap-5 w-4/5">
              <p className="text-center text-xl text-white" id="status"></p>
              <p className="text-primary text-4xl">PASSWORD</p>
              <p className="break-all" id="decryp">
                <button
                  onClick={() => {
                    window.open("https://youtu.be/l4O2W3-ecbs");
                  }}
                >
                  https://youtu.be/l4O2W3-ecbs
                </button>
              </p>
              <input
                type="text"
                id="pass"
                className="rounded-full focus:outline-none focus:ring-4 focus:ring-pink-200 p-1 pl-2 pr-2 w-full"
              />
              <button
                type="button"
                className="text-right"
                id="decrypt"
                onClick={decrypt}
              >
                복호화
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
