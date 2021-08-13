import zoterolib from "zotero-lib";
import { config } from "dotenv";
import { filterOutputCategories } from "./filterOutputCategories";

config();

const { OUTPUT_CATEGORY_KEY, OUTPUT_GROUP_ID, ZOTERO_API_KEY } = process.env;

const zoterolibIns = new zoterolib({
  verbose: true,
  "group-id": OUTPUT_GROUP_ID,
  api_key: ZOTERO_API_KEY,
});

export const listCollections = async () => {
  let categories = await zoterolibIns.collections({
    key: OUTPUT_CATEGORY_KEY,
    terse: true,
    top: true
  });
  console.log(">>>>>>", categories);
  categories = await filterOutputCategories(categories);
  return categories;
};
