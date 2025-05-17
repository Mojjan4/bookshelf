import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Search from './components/Search.jsx';
import Results from './components/Results.jsx';
import BookDetails from './components/BookDetails.jsx';

const App = () => {
  const [searchResults, setSearchResults] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);
  const [selectedBook, setSelectedBook] = React.useState(null);

  // We will pass selectedBookId via URL parameter for details page

  return (
    <div className="container mx-auto p-4">
      <Routes>
        {/* Main search page */}
        <Route
          path="/"
          element={
            <>
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
              />
            </>
          }
        />

        {/* Book details page with :id param */}
        <Route
          path="/book/:id"
          element={<BookDetailsPage />}
        />
      </Routes>
    </div>
  );
};

// Separate component for BookDetailsPage
const BookDetailsPage = () => {
  const { id } = useParams(); // get book id from URL param
  const navigate = useNavigate();

  const [bookDetails, setBookDetails] = React.useState(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    const fetchBookDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`http://localhost:8080/api/books/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch book details');
        }
        const data = await response.json();
        setBookDetails(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBookDetails();
  }, [id]);

  return (
    <div>
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
      >
        &larr; Back
      </button>

      {loading && <p>Loading book details...</p>}
      {error && <p className="text-red-600">{error}</p>}
      {!loading && !error && (
        <BookDetails book={bookDetails} />
      )}
    </div>
  );
};

export default App;
