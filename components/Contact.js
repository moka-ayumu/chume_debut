function Contact() {
  const list = [
    {
      src: "/youtube.png",
      desc: "YOUTUBE",
      class: "p-3 h-56 object-contain pointer-events-none",
      url: "https://www.youtube.com/channel/UCJqC8ip5UD-dChfH07zy6uw",
    },
    {
      src: "./twitch.png",
      desc: "TWITCH",
      class: "p-3 h-56 object-contain pointer-events-none",
      url: "https://www.twitch.tv/succuvus_chume",
    },
    {
      src: "/twitter.png",
      desc: "TWITTER",
      class: "p-3 h-56 object-contain pointer-events-none",
      url: "https://twitter.com/succuVus_chume",
    },
  ];
  return (
    <div
      className="flex flex-row gap-2 m-auto"
      style={{ height: "30vh", maxHeight: "280px" }}
    >
      {list.map((v, i) => (
        <div
          className="flex flex-col ring-2 ring-inset ring-pink-200 rounded-2xl overflow-hidden h-full"
          key={i}
          onClick={() => {
            window.open(v.url);
          }}
        >
          <img className={v.class} src={v.src} />
          <hr className="border-pink-200 border-2" />
          <p className="m-auto text-2xl text-primary pt-3 pb-3">{v.desc}</p>
        </div>
      ))}
    </div>
  );
}

export default Contact;
