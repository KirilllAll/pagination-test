import React, { memo, useMemo, useState } from 'react';
import styles from './Pagination.module.css';
import { getPages } from './utils';
import { STEP } from './const';
import classNames from 'classnames';
import { Size, Variant } from './types';

interface PaginationProps {
  totalPages: number;
  callback?: (page: number) => void;
  className?: string;
  size: Size;
  variant: Variant;
}

const Pagination: React.FC<PaginationProps> = memo(
  ({ totalPages, callback, size, variant, className }) => {
    const [currentPage, setCurrentPage] = useState<number>(STEP);

    const wrapperClassnames = classNames(styles.pagination, className);

    const getButtonClassnames = (page: number | string) =>
      classNames({
        [styles.active]: currentPage === page,
        [styles.primary]: variant === 'primary',
        [styles.secondary]: variant === 'secondary',
        [styles.small]: size === 's',
        [styles.medium]: size === 'm',
        [styles.large]: size === 'l',
      });

    const handlePageChange = (page: number) => {
      if (page !== currentPage && page >= STEP && page <= totalPages) {
        setCurrentPage(page);
        if (callback) {
          callback(page);
        }
      }
    };

    const handleClick = (event: React.MouseEvent) => {
      const target = event.target as HTMLElement;
      const page = target.getAttribute('data-page');

      if (page) {
        handlePageChange(Number(page));
      }
    };

    const pages = useMemo(() => getPages(totalPages, currentPage), [totalPages, currentPage]);

    const renderPagination = () =>
      pages.map((page, index) =>
        page === '...' ? (
          <span key={page + index} className={styles.dots} aria-hidden="true">
            ...
          </span>
        ) : (
          <button
            data-page={page}
            key={page}
            className={getButtonClassnames(page)}
            aria-current={currentPage === page ? 'true' : undefined}
            aria-label={`Page ${page}`}
          >
            {page}
          </button>
        )
      );

    return (
      <div onClick={handleClick} className={wrapperClassnames}>
        {renderPagination()}
      </div>
    );
  }
);

export default Pagination;
