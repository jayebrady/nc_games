exports.formattedCategoriesData = (categoryData) => {
  const formattedCategories = categoryData.map((category) => [
    category.slug,
    category.description,
  ]);
  return formattedCategories;
};

exports.createcategoryRef = (categoryRows) => {
  const ref = {};
  categoryRows.forEach((categoryRow) => {
    ref[categoryRow.slug] = categoryRow.slug_id;
  });
  return ref;
};
