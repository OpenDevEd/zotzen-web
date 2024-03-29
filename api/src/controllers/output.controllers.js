import Output from '../database/models/output';
import User from '../database/models/user';
import { sendEmail } from '../helpers/sendEmail';
import { formatAuthorsString, createCitation } from '../helpers/formatString';
import { listCollections, getItem, addTag, removeTag } from '../helpers/zotero';
import { createRecord } from '../helpers/zotzen';

export const listCategories = async (req, res) => {
  try {
    const categories = await listCollections();
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
      categoryName,
      categoryNamekey,
      reportNumber,
      date,
      primaryTeam,
      documentURL,
    } = req.body;

    let author = req.body.author.replace(/[,;]$/, '');

    const { authors, authorsList } = await formatAuthorsString(author);

    const newOutput = await createRecord({
      title,
      authors,
      date,
      documentURL,
      categoryName,
      categoryNamekey,
      reportNumber,
      primaryTeam,
      userInfo: {
        firstName: req.user.firstName,
        lastName: req.user.lastName,
      },
    });

    if (newOutput.message === 'success') {
      const { data } = newOutput;
      const { kerko_url, DOI } = data;

      // Create Citation
      const citation = await createCitation({
        authors: authorsList,
        date,
        title,
        categoryName,
        reportNumber,
        DOI,
        kerko_url,
      });
      await Output.create({
        userId: req.user.id,
        title,
        linkToLibrary: kerko_url,
        doi: DOI,
        citation,
        authors: authorsList,
        category: {
          key: categoryNamekey,
          name: categoryName,
        },
        reportNumber,
        date,
        workingDocURL: documentURL,
      });
      // Send email
      sendEmail({
        title,
        doi: DOI,
        link: kerko_url,
        citation,
        to: req.user.email,
        documentURL,
      });
      return res.status(200).json({ data: { citation }, statusCode: 200 });
    }
    return res.status(422).json({ message: 'Invalid data', statusCode: 422 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const addTagsOnOutput = async (req, res) => {
  try {
    const {
      params: { itemId },
      body,
    } = req;
    const response = await addTag(itemId, body);
    return res.status(200).json({
      message: 'The tags were added.',
      reponse: response,
      statusCode: 201,
    });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const removeTagsFromOutput = async (req, res) => {
  try {
    const {
      params: { itemId },
      body,
    } = req;
    const response = await removeTag(itemId, body);
    return res.status(200).json({
      message: 'The tags were removed.',
      reponse: response,
      statusCode: 204,
    });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const getOutputTags = async (req, res) => {
  const { itemId } = req.params;
  try {
    const item = await getItem(itemId);

    return res.status(200).json({ statusCode: 200, tags: item?.collections });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const fetchMyOutput = async (req, res) => {
  try {
    const response = await Output.find({ userId: req.user.id });
    return res.status(200).json({
      count: response.length,
      data: response.reverse(),
      statusCode: 200,
    });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const fetchAllOutput = async (req, res) => {
  try {
    const response = await Output.find();
    const user = await User.find().select([
      'firstName',
      'lastName',
      'profilePhotoURL',
    ]);
    return res.status(200).json({
      count: response.length,
      data: {
        user,
        output: response.reverse(),
      },
      statusCode: 200,
    });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};
