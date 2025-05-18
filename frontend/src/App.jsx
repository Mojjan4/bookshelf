import React from 'react';
import { Routes, Route, useNavigate, useParams } from 'react-router-dom';
import Search from './components/Search.jsx';
import BookList from './components/BookList.jsx';
import BookDetailsPage from './pages/BookDetailPage.jsx';
import './App.css';

const App = () => {
    const [searchResults, setSearchResults] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState(null);
    const [selectedBook, setSelectedBook] = React.useState(null);

    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="flex flex-col items-center">
                            <h1 className="text-3xl font-bold mb-6 text-center">
                                Discover Your Next Great Read
                            </h1>

                            <Search
                                setSearchResults={setSearchResults}
                                setLoading={setLoading}
                                setError={setError}
                                setSelectedBook={setSelectedBook}
                            />

                            {error && (
                                <p className="mt-6 text-center text-red-600">{error}</p>
                            )}

                            <BookList books={searchResults} loading={loading} />
                        </div>
                    }
                />

                <Route path="/book/:id" element={<BookDetailsPage />} />
            </Routes>
        </div>
    );
};

export default App;
