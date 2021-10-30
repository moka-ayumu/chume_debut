function Debut() {
  return (
    <div className="flex flex-col gap-4">
      <p className="text-xl text-primary">
        츄메의 데뷔방송에서 함께 읽을 메세지를 28일까지 보내주세요!
        <br />
        다양한 질문, 응원 등 많은 관심 부탁드립니다♡
      </p>
      <img src="./debut_desc.jpg" className="pointer-events-none" />
      <div className="flex ml-auto gap-4">
        <button
          className="bg-pink-200 p-3 pl-5 pr-4 rounded-xl text-primary hover:bg-pink-300"
          onClick={() => {
            window.open("https://peing.net/ko/succuvus_chume");
          }}
        >
          페잉 질문함
          <br />
          (peing)
        </button>
        <button
          className="bg-pink-200 p-3 rounded-xl text-primary hover:bg-pink-300"
          onClick={() => {
            window.open(
              "https://marshmallow-qa.com/succuvus_chume?utm_medium=url_text&utm_source=promotion"
            );
          }}
        >
          마슈마로
          <br />
          (マシュマロ)
        </button>
      </div>
    </div>
  );
}

export default Debut;
