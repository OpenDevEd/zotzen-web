import zoterolib from 'zotero-lib';
import zotzenlib from 'zotzen-lib';
import { config } from 'dotenv';
import { filterOutputCategories } from '../helpers/filterOutputCategories';
import Output from '../database/models/output';
import User from '../database/models/user';

config();
const { OUTPUT_CATEGORY_KEY, OUTPUT_GROUP_ID } = process.env;

const zoterolibIns = new zoterolib();

const defaultOutputData = {
  institution: "EdTech Hub",
  language: "en",           
  rights: "Creative Commons Attribution 4.0", 
  kerko_url: "https://docs.edtechhub.org/lib/",
  tags: ["_r:AddedByZotZen"],
  description: "An output of the EdTech Hub, https://edtechhub.org"
};

export const listCategories = async (req, res) => {
  try {
    let categories = await zoterolibIns.collections({
      key: OUTPUT_CATEGORY_KEY,
      terse: true
    });
    categories = await filterOutputCategories(categories);
    return res.status(200).json({ categories, statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const createOutput = async (req, res) => {
  try {
    const {
      title,
      author,
      categoryName, // Collection Name
      categoryKey, // Collection Key
      date,
      reportNumber,
      primaryTeam,
      documentURL
    } = req.body;

    const authors = author.split(';');

    const { firstName, lastName } = req.user;

    const newOutput = await zotzenlib.create({
      group_id: OUTPUT_GROUP_ID,
      title,
      authors,
      date,
      googledoc: documentURL,
      reportType: categoryName,
      collections: [categoryKey],
      reportNumber,
      team: primaryTeam,
      note: `This output was added by ${firstName} ${lastName} on ${new Date()}`,
      // Default Info
      ...defaultOutputData
    });
    if (newOutput.message === 'success') {
      const { data } = newOutput;
      const { kerko_url, DOI } = data;
      const response = await Output.create({
        userId: req.user.id,
        title,
        linkToLibrary: kerko_url,
        doi: DOI
      })
      return res.status(200).json({ data: response, statusCode: 200 });
    }
    return res.status(422).json({ message: 'Invalid data', statusCode: 422 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const fetchOutputOfLoggedInUser = async (req, res) => {
  try {
    const response = await Output.find({
      userId: req.user.id
    })
    return res.status(200).json({ data: response, statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};