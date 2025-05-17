import React, { useEffect, useState } from 'react';

const BookDetails = ({ book }) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!book || !book.key) {
            setDetails(null);
            return;
        }

        // Extract book ID from key, assuming key looks like "/works/OL12345W"
        const bookId = book.key.split('/').pop();

        setLoading(true);
        setError(null);

        fetch(`http://localhost:8080/api/books/${bookId}`)
            .then((res) => {
                if (!res.ok) {
                    throw new Error('Failed to fetch book details');
                }
                return res.json();
            })
            .then((data) => {
                setDetails(data);
            })
            .catch((err) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [book]);

    if (!book) {
        return <p className="text-gray-500 italic">Select a book to see details.</p>;
    }

    if (loading) {
        return <p>Loading book details...</p>;
    }

    if (error) {
        return <p className="text-red-500">Error: {error}</p>;
    }

    if (!details) {
        return null;
    }

    return (
        <div className="p-4 border rounded shadow mt-4">
            <h2 className="text-xl font-bold mb-2">{details.title}</h2>
            <p><strong>Description:</strong> {details.description ? (typeof details.description === 'string' ? details.description : details.description.value) : 'N/A'}</p>
            <p><strong>First published:</strong> {details.first_publish_date || 'N/A'}</p>
            {/* Add more fields as available */}
        </div>
    );
};

export default BookDetails;
