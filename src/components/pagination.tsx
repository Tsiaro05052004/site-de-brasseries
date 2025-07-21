// Pagination.tsx
import React from 'react';

interface PaginationProps {
  page: number;
  perPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  page,
  perPage,
  total,
  onPageChange,
}) => {
  const totalPages = Math.ceil(total / perPage);
  if (totalPages <= 1) return null; // ← empêche l'affichage s'il y a une seule page

  return (
    <div className="flex justify-center space-x-2 mt-6">
      {Array.from({ length: totalPages }).map((_, i) => (
        <button
          key={i}
          className={`px-3 py-1 rounded ${
            page === i + 1
              ? 'bg-primary text-white'
              : 'bg-muted text-muted-foreground'
          }`}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};
