import React from 'react';

const Results = ({ searchResults, onSelect }) => {
  if (!searchResults || !searchResults.docs || searchResults.docs.length === 0) {
    return <p className="mt-4 text-gray-500">No books found.</p>;
  }

  return (
    <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {searchResults.docs.map((book) => (
        <div
          key={book.key}
          className="p-4 border rounded shadow hover:shadow-md cursor-pointer transition"
          onClick={() => onSelect(book)}
        >
          <h3 className="text-lg font-semibold">{book.title}</h3>
          <p className="text-sm text-gray-600">
            {book.author_name ? book.author_name.join(', ') : 'Unknown Author'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default Results;
