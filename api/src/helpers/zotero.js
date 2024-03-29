import zoterolib from 'zotero-lib';
import { config } from 'dotenv';
import { filterOutputCategories } from './filterOutputCategories';

config();

const { OUTPUT_CATEGORY_KEY, OUTPUT_GROUP_ID, ZOTERO_API_KEY } = process.env;

const zoterolibIns = new zoterolib({
  verbose: true,
  'group-id': OUTPUT_GROUP_ID,
  api_key: ZOTERO_API_KEY,
});

export const listCollections = async () => {
  let categories = await zoterolibIns.collections({
    key: OUTPUT_CATEGORY_KEY,
    terse: true,
    top: true
  });
  categories = await filterOutputCategories(categories);
  return categories;
};

export const getItem = async (key) => {
  let tags = await zoterolibIns.item({ key: key });
  return tags;
};

export const addTag = async (key, tags) => {
  let response = await zoterolibIns.item({
    key: key,
    addtocollection: tags,
  });

  return response;
};

export const removeTag = async (key, tags) => {
  let response = await zoterolibIns.item({
    key: key,
    removefromcollection: tags,
  });

  return response;
};