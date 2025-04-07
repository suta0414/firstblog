"use server";

import { parseWithZod } from "@conform-to/zod";
import { schema } from "./schema";
import { SubmissionResult } from "@conform-to/react";

export interface FormState {
  status: "error" | "success";
  submission?: SubmissionResult;
  data?: {
    name: string;
    email: string;
    message: string;
  };
}

export async function validation(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Zod バリデーションを実行
  const submission = await parseWithZod(formData, { schema });

  // バリデーション結果に応じたレスポンスを返す
  if (submission.status !== "success") {
    return {
      status: "error",
      submission: submission.reply(), // エラー情報をそのまま返す
    };
  } else {
    return {
      status: "success",
      data: submission.value, // 成功時のデータ
    };
  }
}
