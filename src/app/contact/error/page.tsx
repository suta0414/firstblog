import Link from "next/link";

const Error = () => {
  return (
    <>
      <h2>エラーがありました。もう1度入力をお願いします。</h2>
      <Link href="/audtion/input">応募ページへ戻る</Link>
    </>
  );
};
export default Error;
