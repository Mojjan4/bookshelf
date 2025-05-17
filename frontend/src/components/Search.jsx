import React, { useState } from 'react';

const Search = ({ setSearchResults, setLoading, setError, setSelectedBook }) => {
    const [query, setQuery] = useState('');

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
            setSearchResults(data);
        } catch (error) {
            setError('Error fetching books. Please check your connection or try again later.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search books..."
                className="flex-grow p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
                type="submit"
                className="bg-blue-600 text-white px-4 rounded hover:bg-blue-700 transition"
            >
                Search
            </button>
        </form>
    );
};

export default Search;
