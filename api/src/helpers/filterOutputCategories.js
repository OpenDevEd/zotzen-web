export const filterOutputCategories = (categories) => {
  let filteredCategories = [];
  categories.forEach(category => {
    if (category.name[0] !== '_') {
      filteredCategories.push({
        key: category.key,
        name: category.name.replace(/ *\[[^\]]*]/, '')
      });
    }
  });
  return filteredCategories;
};
