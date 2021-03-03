import Output from "../database/models/output";
import { sendEmail } from "../helpers/sendEmail";
import { formatAuthorsString, createCitation } from "../helpers/formatString";
import { listCollections } from "../helpers/zotero";
import { createRecord } from "../helpers/zotzen";

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

    let author = req.body.author.replace(/[,;]$/, "");

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

    if (newOutput.message === "success") {
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
    return res.status(422).json({ message: "Invalid data", statusCode: 422 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};

export const fetchOutput = async (req, res) => {
  try {
    const response =
      req.user.role === "Administrator"
        ? await Output.find()
        : await Output.find({ userId: req.user.id });
    return res.status(200).json({ data: response.reverse(), statusCode: 200 });
  } catch (error) {
    const { message, status = 400 } = error;
    return res.status(status).json({ message, statusCode: status });
  }
};
