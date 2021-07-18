import styles from "./Menu.module.scss";

function Menu({ pid, shallowPush }) {
  const availablePid = [
    "main",
    "description",
    "debut",
    // "twitch",
    // "youtube",
    // "twitter",
    "contact",
  ];
  const styleList = {
    main: styles.Main,
    description: styles.Description,
    twitch: styles.Twitch,
    youtube: styles.Youtube,
    twitter: styles.Twitter,
    contact: styles.Contact,
    debut: styles.Debut,
  };
  return (
    <div className={styles.main}>
      {availablePid.map((v, i) => (
        <div
          className={styleList[v]}
          style={v == pid ? { transform: "scale(1)", borderWidth: "5px" } : {}}
          key={i}
        >
          <p
            onClick={() => shallowPush(`./${v}`)}
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
