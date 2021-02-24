import { emailTemplate } from "./emailTemplate";


export const sendEmail = async (title, doi, link, citation) {
  await emailTemplate(title, doi, link, citation)
}