import { useActionState } from "react";
import { sendToNewt } from "@/_util/sendToNewt";
import { FieldMetadata } from "@conform-to/react";

interface ConfirmScreenProps {
  fields: Required<{
    name: FieldMetadata<
      string,
      { name: string; email: string; message: string },
      string[]
    >;
    email: FieldMetadata<
      string,
      { name: string; email: string; message: string },
      string[]
    >;
    message: FieldMetadata<
      string,
      { name: string; email: string; message: string },
      string[]
    >;
  }>;
  setIsConfirm: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ConfirmScreen({ fields, setIsConfirm }: ConfirmScreenProps) {
  // eslint-disable-next-line
  const [state, action, pending] = useActionState(sendToNewt, {});

  // 編集画面に戻る
  const handleBack = () => {
    setIsConfirm(true);
  };

  return (
    <form action={action}>
      <div className="flex flex-col space-y-2 mb-6">
        <div>
          <span className="font-bold mr-2">名前:</span>
          <input
            type="text"
            name={fields.name.name}
            readOnly
            value={fields.name.value}
          ></input>
        </div>
        <div>
          <span className="font-bold mr-2">メールアドレス:</span>
          <input
            type="email"
            name={fields.email.name}
            readOnly
            value={fields.email.value}
          ></input>
        </div>
        <div>
          <span className="font-bold mr-2">問い合わせ内容:</span>
          <input
            type="text"
            name={fields.message.name}
            readOnly
            value={fields.message.value}
          ></input>
        </div>
      </div>
      <div className="flex justify-around">
        <button
          className="py-3 lg:py-3 px-8 lg:px-8 font-bold rounded-xl border border-black hover:border-none hover:bg-black hover:shadow-teal-md transition-all"
          type="button"
          onClick={handleBack}
        >
          キャンセル
        </button>
        <button
          className={
            "py-3 lg:py-3 px-8 lg:px-8 text-white font-bold rounded-xl bg-blue-400 hover:bg-blue-700 hover:shadow-teal-md transition-all outline-none"
          }
          type="submit"
        >
          {pending ? "送信中..." : "送信する"}
        </button>
      </div>
    </form>
  );
}
