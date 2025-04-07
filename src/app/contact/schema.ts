import { z } from "zod";

export const schema = z.object({
  name: z.string({ required_error: "名前を入力してください" }),
  email: z
    .string({ required_error: "メールアドレスは必須です" })
    .email("正しいメールアドレスを入力してください"),
  message: z.string({ required_error: "問い合わせ内容は必須です" }),
});
