import sgMail from "@sendgrid/mail";
import { config } from "dotenv";

config();
const { SENDGRID_KEY } = process.env;

export const sendEmail = async (emailData) => {
  sgMail.setApiKey(SENDGRID_KEY);
  sgMail.setSubstitutionWrappers("{{", "}}");

  return await sgMail.send({
    ...emailData,
    from: "jacques@edtechhub.org",
    templateId: "d-617adb373dc24261a597951b16d71383",
    dynamic_template_data: {
      ...emailData,
    },
  });
};
