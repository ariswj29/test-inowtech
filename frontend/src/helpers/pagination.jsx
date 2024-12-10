export const handlePrevPage = (page, setPage) => {
  if (page > 1) {
    setPage(page - 1);
  }
};

export const handleNextPage = (page, setPage, totalPages) => {
  if (page < totalPages) {
    setPage(page + 1);
  }
};
