import zotzenlib from "zotzen-lib";
import { config } from "dotenv";

config();

const {
  OUTPUT_GROUP_ID,
  ZOTERO_API_KEY,
  ZENODO_ACCESS_TOKEN,
} = process.env;

const defaultOutputData = {
  verbose: true,
  zotero_api_key: ZOTERO_API_KEY,
  zenodo_access_token: ZENODO_ACCESS_TOKEN,
  institution: "EdTech Hub",
  language: "en",
  rights: "Creative Commons Attribution 4.0",
  kerko_url: "https://docs.edtechhub.org/lib/",
  tags: ["_r:AddedByZotZen"],
  description: "An output of the EdTech Hub, https://edtechhub.org",
};

export const createRecord = async (data) => {
  const {
    title,
    authors,
    date,
    documentURL,
    categoryName,
    categoryNamekey,
    reportNumber,
    primaryTeam,
    userInfo,
  } = data;
  const { firstName, lastName } = userInfo;
  return await zotzenlib.create({
    group_id: OUTPUT_GROUP_ID,
    title,
    authors,
    date,
    googledoc: documentURL,
    reportType: categoryName,
    collections: [categoryNamekey],
    reportNumber,
    team: primaryTeam,
    note: `This output was added by ${firstName} ${lastName} on ${new Date()}`,
    // Default Info
    ...defaultOutputData,
  });
};
