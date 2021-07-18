function Contact() {
  const list = [
    {
      src: "./twitter.png",
      desc: "TWITTER",
      class: "ml-2 p-3",
    },
    {
      src: "./twitch.png",
      desc: "TWITCH",
      class: "ml-2 p-3",
    },
    {
      src: "./youtube.png",
      desc: "YOUTUBE",
      class: "ml-2 p-3",
    },
  ];
  return (
    <div className="flex flex-col gap-2" style={{ height: "30vh" }}>
      {list.map((v, i) => (
        <div
          className="flex ring-2 ring-inset ring-pink-200 rounded-2xl overflow-hidden h-2/3"
          key={i}
        >
          <img className={v.class} src={v.src} />
          <div
            className="ml-2 mr-2 mt-2 mb-2"
            style={{ borderLeft: "thick solid #fb5474" }}
          />
          <p className="mt-auto mb-auto ml-2 text-3xl">{v.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Contact;
