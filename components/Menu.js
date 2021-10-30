import styles from "./Menu.module.scss";

function Menu({ pid, shallowPush, mobile }) {
  const availablePid = ["main", "description", "debut", "contact"];
  const styleList = {
    main: styles.Main,
    description: styles.Description,
    twitch: styles.Twitch,
    youtube: styles.Youtube,
    twitter: styles.Twitter,
    contact: styles.Contact,
    debut: styles.Debut,
  };

  const menugrid = [1, 1, 2, 2, 3, 3, 4];

  const rePid = () => {
    if (mobile) {
      availablePid.splice(availablePid.indexOf(pid), 1);
      availablePid.unshift(pid);
    }
    return availablePid;
  };

  let viewMenuType = 0;
  const viewMenu = () => {
    viewMenuType = viewMenuType == 0 ? 1 : 0;
    for (let i = 0; i < availablePid.length; i++) {
      if (availablePid[i] != pid) {
        const e = document.getElementById(availablePid[i]);
        e.style.opacity = viewMenuType;
      }
    }
  };

  return (
    <div className={styles.main}>
      {rePid().map((v, i) => (
        <div
          className={styleList[v]}
          id={v}
          style={{
            ...(v == pid ? { transform: "scale(1)", borderWidth: "5px" } : {}),
            ...(v != pid && mobile ? { opacity: 0 } : {}),
            ...(!mobile
              ? { gridColumn: menugrid[i + 1], gridRow: menugrid[i] }
              : { gridColumn: menugrid[i], gridRow: menugrid[i + 1] }),
          }}
          key={i}
        >
          <p
            onClick={() => {
              shallowPush(`./${v}`);
              mobile ? viewMenu() : "";
            }}
            className={`hover:text-hover capitalize duration-150 ease-in-out ${
              v == pid ? "font-medium" : ""
            }`}
          >
            {v}
          </p>
        </div>
      ))}
    </div>
  );
}

export default Menu;
