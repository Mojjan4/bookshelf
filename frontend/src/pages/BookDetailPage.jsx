import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookDetails from '../components/BookDetails';

const BookDetailsPage = () => {
    const { id } = useParams();
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
        <div className="max-w-4xl mx-auto p-4">
            <button
                onClick={() => navigate(-1)}
                className="mb-4 px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
            >
                &larr; Back
            </button>

            {loading && <p>Loading book details...</p>}
            {error && <p className="text-red-600">{error}</p>}
            {!loading && !error && <BookDetails book={bookDetails} />}
        </div>
    );
};

export default BookDetailsPage;
