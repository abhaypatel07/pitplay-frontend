import React from 'react'
import { useRouter } from 'next/router';
import Link from 'next/link';
import { Fragment } from 'react';

interface PaginationProps {
  totalPages: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ totalPages, currentPage, onPageChange }) => {
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }
  const handlePrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };
  const handleLastPage = () => {
    onPageChange(totalPages);
  };

  return (
    <nav className="mt-4 mb-6">
      <ul className="flex justify-center">
        {pages.map((page) => (
          <li
            key={page}
            className={`mx-1 px-3 py-2 rounded-md cursor-pointer ${page === currentPage ? 'bg-[--primary] text-white' : 'bg-gray-300'
              }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </li>
        ))}
       
      </ul>
    </nav>
  );
};

export default Pagination;