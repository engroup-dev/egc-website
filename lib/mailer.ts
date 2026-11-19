import "server-only";
import nodemailer, { type Transporter } from "nodemailer";

// SMTP settings come from the environment. On the EGC server they point at the
// BillionMail Postfix container (mail.engroup.ly, port 465). When unset (local
// dev), sending is skipped and the caller reports a failure.
const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, INQUIRY_NOTIFY_TO } = process.env;

let transporter: Transporter | null = null;

function getTransporter(): Transporter | null {
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) return null;
  if (!transporter) {
    const port = Number(SMTP_PORT ?? 465);
    transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port,
      secure: port === 465,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
      connectionTimeout: 10_000,
      greetingTimeout: 10_000,
      socketTimeout: 15_000,
    });
  }
  return transporter;
}

export type Inquiry = {
  name: string;
  email: string;
  phone: string;
  message: string;
  locale: string;
};

/** Emails a website inquiry to the team. Returns false if mail isn't configured or sending failed. */
export async function sendInquiryEmail(inquiry: Inquiry): Promise<boolean> {
  const mailer = getTransporter();
  if (!mailer) {
    console.error("[inquiry] SMTP is not configured; inquiry not sent");
    return false;
  }

  const to = INQUIRY_NOTIFY_TO || SMTP_USER!;
  const from = SMTP_FROM || `EGC Website <${SMTP_USER}>`;
  // The name ends up in headers; keep it on one line.
  const name = inquiry.name.replace(/[\r\n]+/g, " ").trim();

  try {
    await mailer.sendMail({
      from,
      to,
      replyTo: { name, address: inquiry.email },
      subject: `New website inquiry from ${name}`,
      text: [
        "A new inquiry was sent from the contact form on engroup.ly.",
        "",
        `Name:      ${inquiry.name}`,
        `Email:     ${inquiry.email}`,
        `Phone:     ${inquiry.phone || "-"}`,
        `Language:  ${inquiry.locale === "ar" ? "Arabic" : "English"}`,
        "",
        "Message:",
        inquiry.message,
        "",
        "Reply to this email to answer the sender directly.",
      ].join("\n"),
    });
    return true;
  } catch (err) {
    console.error("[inquiry] sending failed:", err);
    return false;
  }
}
