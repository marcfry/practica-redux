export const searcTransaction = (transactions, searchString) => {
  const searchResult = transactions.filter((transaction) =>
    Object.values(transaction).some((value) =>
      String(value).toLowerCase().includes(searchString.toLowerCase())
    )
  );
  return searchResult;
};
