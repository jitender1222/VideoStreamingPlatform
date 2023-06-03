import { createTransport } from "nodemailer";

export const Email = async (to, subject, text) => {
  var transporter = createTransport({
    host: "sandbox.smtp.mailtrap.io",
    port: 2525,
    auth: {
      user: "f6a40df72e1717",
      pass: "027028856c3b45",
    },
  });

  await transporter.sendMail({
    to,
    subject,
    text,
  });
};
