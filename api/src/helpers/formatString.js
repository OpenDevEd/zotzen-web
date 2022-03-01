export const formatAuthorsString = (authorsString) => {
  // Get author and remove the last semi-colon and any whitespace after it:
  authorsString.replace(/;\s*$/, '');

  const authors = authorsString.split(';');

  let authorsListWithout = [];
  let authorsListWithKey = [];
  authors.map((singleAuthor) => {
    const authorInfos = singleAuthor.split(',');
    if (authorInfos.length === 2) {
      authorsListWithout = [
        ...authorsListWithout,
        `${authorInfos[0].replace(/\s/g, '')}, ${authorInfos[1].replace(
          /\s/g,
          ''
        )}`,
      ];
      authorsListWithKey = [
        ...authorsListWithKey,
        {
          lastName: authorInfos[0].replace(/\s/g, ''), // removing whitespace
          firstName: authorInfos[1].replace(/\s/g, ''),
        },
      ];
    }
  });
  return {
    authors: authorsListWithout,
    authorsList: authorsListWithKey,
  };
};

export const createCitation = async (data) => {
  const { authors, date, title, categoryName, DOI, kerko_url } = data;
  const reportNumber = data.reportNumber ? `No.${data.reportNumber}` : '';

  const year = new Date(date).getFullYear();
  let authorsList = '';

  await authors.map((author, index) => {
    authorsList += ` ${author.lastName}, ${author.firstName[0].toUpperCase()}${(index===authors.length-2 && authorsList.length !== 2)?'., &':'.,'}`;
  });
  // remove last comma
  authorsList = authorsList.replace(/,\s*$/, '');
  return `${authorsList} (${year}). ${title}. ${categoryName} ${reportNumber}. https://doi.org/${DOI} Available at ${kerko_url}. Available under Creative Commons Attribution 4.0 International, https://creativecommons.org/licenses/by/4.0/.`;
};
