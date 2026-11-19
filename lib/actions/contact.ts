"use server";

import { sendInquiryEmail } from "@/lib/mailer";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export type ContactResult = { ok: true } | { ok: false; error: "invalid" | "failed" };

export async function submitContactForm(input: {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
  // Hidden from people; bots that fill every field get a silent "success".
  website?: string;
}): Promise<ContactResult> {
  if (input.website) return { ok: true };

  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim();
  const phone = String(input.phone ?? "").trim();
  const message = String(input.message ?? "").trim();
  const locale = input.locale === "ar" ? "ar" : "en";

  if (
    !name || name.length > 200 ||
    !EMAIL_RE.test(email) || email.length > 320 ||
    phone.length > 50 ||
    !message || message.length > 10_000
  ) {
    return { ok: false, error: "invalid" };
  }

  const sent = await sendInquiryEmail({ name, email, phone, message, locale });
  return sent ? { ok: true } : { ok: false, error: "failed" };
}
