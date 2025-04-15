"use server";

import { redirect } from "next/navigation";
import { SubmissionResult } from "@conform-to/react";

interface FormState {
  submission?: SubmissionResult;
  data?: {
    name: string;
    email: string;
    message: string;
  };
}

export const sendToNewt = async (prevState: FormState, formData: FormData) => {
  const url = process.env.NEXT_PUBLIC_NEWT_FORM_UID;
  if (!url) throw new Error("NEWT_FORM_UID is not defined");

  const res = await fetch(url, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  });

  // const res = [];
  // res["ok"] = true;

  if (res.ok) {
    redirect("/contact/thanks");
  } else {
    redirect("/contact/error");
  }
};
