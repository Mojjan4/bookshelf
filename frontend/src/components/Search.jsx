import React, { useState, useRef } from 'react';
import '../styles/Search.css';

const Search = ({ setSearchResults, setLoading, setError, setSelectedBook }) => {
    const [query, setQuery] = useState('');
    const inputRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!query.trim()) return;

        setLoading(true);
        setError(null);
        setSelectedBook(null);

        try {
            const response = await fetch(`http://localhost:8080/api/books?q=${encodeURIComponent(query)}`);

            if (!response.ok) {
                throw new Error('Failed to fetch search results.');
            }

            const data = await response.json();
            console.log('Search results data:', data);
            setSearchResults(data.docs || []);
        } catch (error) {
            setError('Error fetching books. Please check your connection or try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const handleClear = () => {
        setQuery('');
        inputRef.current.focus();
    };

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <div className="search-input-container">
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search books..."
                    className="search-input"
                />
                {query && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="clear-button"
                        aria-label="Clear search"
                    >
                        ✕
                    </button>
                )}
            </div>
            <button
                type="submit"
                disabled={!query.trim()}
                className="search-button"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
