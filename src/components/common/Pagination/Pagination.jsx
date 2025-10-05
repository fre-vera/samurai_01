import React from 'react';
import styles from './Pagination.module.scss';

export const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  let slicedPages;
  if (currentPage - 3 < 0) {
    slicedPages = pages.slice(0, 5);
  } else {
    slicedPages = pages.slice(currentPage - 3, currentPage + 2);
  }

  return (
    <div className={styles.pagination}>
      {/* Кнопка "назад" */}
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>

      {slicedPages.map((page) => (
        <span
          key={page}
          onClick={() => onPageChange(page)}
          className={`${styles.pageNumber} ${currentPage === page ? styles.active : ''}`}
        >
          {page}
        </span>
      ))}

      {/* Кнопка "вперед" */}
      <button
        className={styles.arrow}
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  );
};
