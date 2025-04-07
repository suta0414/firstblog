import { FormState } from "@/app/contact/validation";
import { modals } from "@mantine/modals";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface openModalProps {
  id: string;
  data: FormState["data"];
  DataPending: {
    isPending: boolean;
    setIsPending: React.Dispatch<React.SetStateAction<boolean>>;
  };
  router: AppRouterInstance;
}

export function openModal({ id, data, DataPending, router }: openModalProps) {
  const { isPending, setIsPending } = DataPending;

  const sendToNewt = async (data: FormState["data"]) => {
    setIsPending(true);

    const url = process.env.NEXT_PUBLIC_NEWT_FORM_UID;
    if (!url) throw new Error("NEWT_FORM_UID is not defined");

    try {
      const res = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json", // ← JSONとして送信する
          Accept: "application/json",
        },
      });

      if (res.ok) {
        router.push("/contact/thanks");
      } else {
        router.push("/contact/error");
      }
    } catch (err) {
      console.error("送信エラー:", err);
      router.push("/contact/error");
    } finally {
      setIsPending(false);
    }
  };

  modals.open({
    title: "内容確認",
    radius: "md",
    modalId: id,
    children: (
      <div>
        <div className="flex flex-col space-y-2 mb-6">
          <div>
            <span className="font-bold mr-2">名前:</span>
            <p>{data?.name}</p>
          </div>
          <div>
            <span className="font-bold mr-2">メールアドレス:</span>
            <p>{data?.email}</p>
          </div>
          <div>
            <span className="font-bold mr-2">問い合わせ内容:</span>
            <p>{data?.message}</p>
          </div>
        </div>
        <div className="flex justify-around">
          <button
            className="py-3 lg:py-3 px-8 lg:px-8 font-bold rounded-xl border border-black hover:shadow-teal-md transition-all"
            type="button"
            onClick={() => modals.close(id)}
          >
            キャンセル
          </button>
          <button
            className={
              "py-3 lg:py-3 px-8 lg:px-8 text-white font-bold rounded-xl bg-blue-400 hover:shadow-teal-md transition-all outline-none"
            }
            type="submit"
            disabled={isPending}
            onClick={() => sendToNewt(data)}
          >
            {isPending ? "送信中..." : "送信する"}
          </button>
        </div>
      </div>
    ),
  });
}
