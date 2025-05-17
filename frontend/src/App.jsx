import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import BookDetails from './components/BookDetails';

const App = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <div className="min-h-screen flex flex-col max-w-7xl mx-auto p-4 sm:p-8">
      <header className="mb-6">
        <h1 className="text-3xl font-bold text-center sm:text-left">Bookshelf Search</h1>
      </header>
      <main className="flex flex-col sm:flex-row gap-6 flex-grow">
        <section className="flex-1">
          <Search
            setSearchResults={setSearchResults}
            setLoading={setLoading}
            setError={setError}
            setSelectedBook={setSelectedBook}
          />
          {loading && <p className="mt-4 text-center text-gray-600">Loading...</p>}
          {error && <p className="mt-4 text-center text-red-600">{error}</p>}
          <Results
            searchResults={searchResults}
            onSelectBook={setSelectedBook}
          />
        </section>
        <section className="flex-1 bg-gray-50 p-4 rounded shadow overflow-auto max-h-[70vh]">
          <BookDetails book={selectedBook} />
        </section>
      </main>
      <footer className="mt-8 text-center text-gray-500 text-sm">
        © 2025 Bookshelf Project
      </footer>
    </div>
  );
};

export default App;
