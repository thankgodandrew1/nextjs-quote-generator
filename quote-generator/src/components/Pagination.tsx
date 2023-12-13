import React, { useState } from 'react';

interface PaginationProps {
  totalPages: number;
  setCurrentPage: (pageNumber: number) => void;
}

export default function Pagination({ totalPages, setCurrentPage }: PaginationProps) {
  const [currentPageNumber, setCurrentPageNumber] = useState<number>(1);

  const handlePagination = (pageNumber: number) => {
    setCurrentPageNumber(pageNumber);
    setCurrentPage(pageNumber);
  };

  // Generating an array of numbers from 1 to totalPages
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <div className='my-4'>
      <ul className='flex'>
        {pageNumbers.map((pageNumber) => (
          <li key={pageNumber}>
            <button
              onClick={() => handlePagination(pageNumber)}
              className={`px-3 py-1 mx-1 ${
                pageNumber === currentPageNumber ? 'bg-blue-500 text-white' : 'bg-gray-300'
              } rounded-md`}
            >
              {pageNumber}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}