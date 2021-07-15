import { AES } from "crypto-js";
import { useRouter } from "next/router";

function Aes(params) {
  const router = useRouter();
  const { content, pass } = router.query;
  return (
    <div>
      {router.query["content"] != undefined ? (
        <div>
          <p>content: {content}</p>
          <p>pass: {pass}</p>
          <p>{AES.encrypt(content, pass).toString()}</p>
        </div>
      ) : (
        <h1>Loading</h1>
      )}
    </div>
  );
}

export default Aes;
