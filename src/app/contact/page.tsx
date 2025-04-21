"use client";

import { useState } from "react";

import { getFormProps, useForm } from "@conform-to/react";
import { getZodConstraint, parseWithZod } from "@conform-to/zod";

import { schema } from "./schema";
import { SideBar } from "@/components/sideBar/sideBar";
import { ConfirmScreen } from "@/components/confirmScreen/confirmScreen";

export default function Contact() {
  const [isConfirm, setIsConfirm] = useState(true);

  const [form, fields] = useForm({
    constraint: getZodConstraint(schema),
    shouldValidate: "onBlur",
    shouldRevalidate: "onInput",
    onValidate({ formData }) {
      return parseWithZod(formData, { schema });
    },
    onSubmit(e) {
      // 確認画面に進む
      e.preventDefault();
      setIsConfirm(false);
    },
  });

  return (
    <div className="max-w-[1300px] mx-auto mt-16">
      <div className="block lg:flex mt-16">
        <div className="lg:w-3/4">
          <div className="text-center">
            <h1 className="inline-block text-3xl text-black font-bold mb-5 pb-2 border-blue-400 border-b-4">
              お問い合わせ
            </h1>
          </div>
          <div className="p-6 pl-10">
            {isConfirm ? (
              <form {...getFormProps(form)} id={form.id}>
                <div className="flex flex-col mb-6">
                  <div className="mb-2">
                    <label
                      className="block text-black font-bold"
                      htmlFor="name"
                    >
                      名前
                      <span className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                        必須
                      </span>
                    </label>
                  </div>
                  <div className="lg:w-1/3 md:w-1/2 w-full">
                    <input
                      id={fields.name.id}
                      name={fields.name.name}
                      form={fields.name.formId}
                      defaultValue={fields.name.value}
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
                    <label
                      className="block text-black font-bold"
                      htmlFor="email"
                    >
                      メールアドレス
                      <span className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                        必須
                      </span>
                    </label>
                  </div>
                  <div className="lg:w-1/3 md:w-1/2 w-full">
                    <input
                      id={fields.email.id}
                      name={fields.email.name}
                      form={fields.email.formId}
                      defaultValue={fields.email.value}
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
                    <label
                      className="block text-black font-bold"
                      htmlFor="message"
                    >
                      問い合わせ内容
                      <span className="text-white bg-red-500 font-normal text-sm ml-2 p-0.5 rounded-md">
                        必須
                      </span>
                    </label>
                  </div>
                  <div className="lg:w-2/3 w-full">
                    <textarea
                      id={fields.message.id}
                      name={fields.message.name}
                      form={fields.message.formId}
                      defaultValue={fields.message.value}
                      aria-invalid={!fields.message.valid || undefined}
                      aria-describedby={
                        !fields.message.valid
                          ? fields.message.errorId
                          : undefined
                      }
                      required={fields.message.required}
                      rows={10}
                      cols={30}
                      className="appearance-none border-2 border-gray-400 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <p className="text-red-500 text-sm">
                    {fields.message.errors}
                  </p>
                </div>
                <div className="text-center">
                  <button
                    className={
                      "py-3 lg:py-3 px-14 lg:px-14 text-white-500 font-bold rounded-xl bg-blue-400 hover:bg-blue-700 hover:shadow-teal-md transition-all outline-none text-white"
                    }
                  >
                    確認する
                  </button>
                </div>
              </form>
            ) : (
              <ConfirmScreen fields={fields} setIsConfirm={setIsConfirm} />
            )}
          </div>
        </div>
        <SideBar />
      </div>
    </div>
  );
}
