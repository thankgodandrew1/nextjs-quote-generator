import React, { useState } from 'react';

export default function Pagination({ totalPages, setCurrentPage }) {
  const [currentPageNumber, setCurrentPageNumber] = useState(1);

  const handlePagination = (pageNumber) => {
    setCurrentPageNumber(pageNumber);
    setCurrentPage(pageNumber);
  };

  return (
    <div className='my-4'>
      <ul className='flex'>
        {[...Array(totalPages).keys()].map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => handlePagination(pageNumber + 1)}
              className={`px-3 py-1 mx-1 ${
                pageNumber + 1 === currentPageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300'
              } rounded-md`}
            >
              {pageNumber + 1}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};