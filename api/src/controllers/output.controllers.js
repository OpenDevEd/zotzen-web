//import {zoteroLib} from 'zotero-lib';



export const listCategories = async (req, res) => {
  try {
    //let categories = await zoteroLib.collections(2405685, 'MP53N7NC');
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
