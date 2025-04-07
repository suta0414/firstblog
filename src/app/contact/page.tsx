"use client";

import { useActionState, useEffect, useState } from "react";

import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

import { schema } from "./schema";
import { validation } from "./validation";
import { SideBar } from "@/components/sideBar/sideBar";
import { ModalsProvider } from "@mantine/modals";
import { openModal } from "@/components/modal/modal";
import { useRouter } from "next/navigation";

export default function Contact() {
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  const [lastResult, action, pending] = useActionState(validation, {
    status: "error",
  });

  const [form, fields] = useForm({
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    lastResult,
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    defaultValue: {
      name: lastResult?.data?.name || "",
      email: lastResult?.data?.email || "",
      message: lastResult?.data?.message || "",
    },
  });

  useEffect(() => {
    if (lastResult.status === "success") {
      openModal({
        id: "confirm_modal",
        data: lastResult.data,
        DataPending: { isPending, setIsPending },
        router: router,
      });
      // router.push("/contact/thanks");
    }
  }, [lastResult]); // `lastResult` が変わったら実行

  return (
    <div className="max-w-[1300px] mx-auto">
      <h1 className="text-2xl text-black font-bold text-center mb-5">
        Contact
      </h1>
      <div className="block lg:flex mt-16">
        <div className="lg:w-3/4 p-6 pl-10">
          <form {...getFormProps(form)} action={action} id={form.id}>
            <div className="flex flex-col mb-6">
              <div className="mb-2">
                <label className="block text-black font-bold" htmlFor="name">
                  名前
                  <span className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                    必須
                  </span>
                </label>
              </div>
              <div className="w-1/3">
                <input
                  id={fields.name.id}
                  name={fields.name.name}
                  form={fields.name.formId}
                  defaultValue={fields.name.initialValue}
                  aria-invalid={!fields.name.valid || undefined}
                  aria-describedby={
                    !fields.name.valid ? fields.name.errorId : undefined
                  }
                  required={fields.name.required}
                  className=" appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  type="text"
                  placeholder="名前"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.name.errors}</p>
            </div>

            <div className="flex flex-col mb-6">
              <div className="mb-2">
                <label className="block text-black font-bold" htmlFor="email">
                  メールアドレス
                  <span className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                    必須
                  </span>
                </label>
              </div>
              <div className="w-1/3">
                <input
                  id={fields.email.id}
                  name={fields.email.name}
                  form={fields.email.formId}
                  defaultValue={fields.email.initialValue}
                  aria-invalid={!fields.email.valid || undefined}
                  aria-describedby={
                    !fields.email.valid ? fields.email.errorId : undefined
                  }
                  required={fields.email.required}
                  className="appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                  placeholder="例) example@gmail.me"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.email.errors}</p>
            </div>

            <div className="flex flex-col mb-6">
              <div className="mb-2">
                <label className="block text-black font-bold" htmlFor="message">
                  問い合わせ内容
                  <span className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                    必須
                  </span>
                </label>
              </div>
              <div className="md:w-2/3">
                <textarea
                  id={fields.message.id}
                  name={fields.message.name}
                  form={fields.message.formId}
                  defaultValue={fields.message.initialValue}
                  aria-invalid={!fields.message.valid || undefined}
                  aria-describedby={
                    !fields.message.valid ? fields.message.errorId : undefined
                  }
                  required={fields.message.required}
                  rows={10}
                  cols={30}
                  className="appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                />
              </div>
              <p className="text-red-500 text-sm">{fields.message.errors}</p>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className={
                  "py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-xl bg-blue-400 hover:shadow-teal-md transition-all outline-none text-white"
                }
              >
                {pending ? "送信中..." : "確認する"}
              </button>
              <ModalsProvider></ModalsProvider>
            </div>
          </form>
        </div>
        <SideBar />
      </div>
    </div>
  );
}
