import React from 'react';

const BookDetails = ({ book }) => {
  if (!book) {
    return <p className="text-gray-500 italic">Select a book to see details.</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-2">{book.title}</h2>
      <p className="mb-1"><strong>Author:</strong> {book.author}</p>
      {/* Additional details can be added here */}
    </div>
  );
};

export default BookDetails;
