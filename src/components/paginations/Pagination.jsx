import React from "react";

const Pagination = ({ pagination, onPageChange = () => {} }) => {
  const { current_page, last_page, next_page_url, prev_page_url } = pagination;

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={() => onPageChange(current_page - 1)}
        disabled={!prev_page_url}
        className="px-4 py-2 mx-1 text-white bg-gradient-to-r from-brandPrimary to-brandSecondary transition-colors duration-300 ease-in-out hover:from-brandSecondary hover:to-brandPrimary rounded disabled:opacity-50"
      >
        Previous
      </button>
      <span className="px-4 py-2 mx-1 text-brandPrimary">
        Page {current_page} of {last_page}
      </span>
      <button
        onClick={() => onPageChange(current_page + 1)}
        disabled={!next_page_url}
        className="px-4 py-2 mx-1 text-white bg-gradient-to-r from-brandPrimary to-brandSecondary transition-colors duration-300 ease-in-out hover:from-brandSecondary hover:to-brandPrimary rounded disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
