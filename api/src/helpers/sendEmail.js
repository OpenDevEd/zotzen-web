import sgMail from "@sendgrid/mail";
import { config } from "dotenv";

config();
const { SENDGRID_KEY, SENDER_EMAIL, SENDGRID_TEMPLATE_ID } = process.env;

export const sendEmail = async (emailData) => {
  sgMail.setApiKey(SENDGRID_KEY);
  sgMail.setSubstitutionWrappers("{{", "}}");

  return await sgMail.send({
    ...emailData,
    from: SENDER_EMAIL,
    templateId: SENDGRID_TEMPLATE_ID,
    dynamic_template_data: {
      ...emailData,
    },
  });
};
