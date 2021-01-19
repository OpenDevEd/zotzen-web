<<<<<<< HEAD
//import {zoteroLib} from 'zotero-lib';



export const listCategories = async (req, res) => {
  try {
    //let categories = await zoteroLib.collections(2405685, 'MP53N7NC');
=======
import zoterolib from 'zotero-lib';
import { config } from 'dotenv';
import { filterOutputCategories } from '../helpers/filterOutputCategories';

config();
const { OUTPUT_CATEGORY_KEY } = process.env;
const zoterolibIns = new zoterolib();

export const listCategories = async (req, res) => {
  try {
    let categories = await zoterolibIns.collections({
      key: OUTPUT_CATEGORY_KEY,
      terse: true
    });
    categories = await filterOutputCategories(categories);
>>>>>>> caac3b07f8893ed3061c5995799549cec9566abf
    return res.status(200).json({ categories, statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};


export const test = async (req, res) => {
  try {
    return res.status(200).json({ message: 'Hello World!', statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};
