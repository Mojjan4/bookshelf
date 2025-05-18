import React from 'react';

const BookDetails = ({ book }) => {
    if (!book) {
        return <p className="text-center text-gray-600">No book details available.</p>;
    }

    const {
        title = 'Unknown Title',
        description,
        first_publish_year,
        covers,
        authors,
        subjects,
        publishers
    } = book;

    const getDescription = () => {
        if (!description) return 'No description available.';
        if (typeof description === 'string') return description;
        return description.value || 'No description available.';
    };

    return (
        <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-xl space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{title}</h1>

            {covers?.length > 0 && (
                <img
                    src={`https://covers.openlibrary.org/b/id/${covers[0]}-L.jpg`}
                    alt={`Cover for ${title}`}
                    className="w-48 rounded border"
                />
            )}

            {authors?.length > 0 && (
                <div className="text-gray-700">
                    <strong>Author(s):</strong>{' '}
                    {authors.map((author, index) => (
                        <span key={author.key || index}>
                            {author.name}
                            {index < authors.length - 1 ? ', ' : ''}
                        </span>
                    ))}
                </div>
            )}

            <p className="text-gray-700">
                <strong>First Published:</strong> {first_publish_year || 'N/A'}
            </p>

            {publishers?.length > 0 && (
                <p className="text-gray-700">
                    <strong>Publisher:</strong> {publishers[0]}
                </p>
            )}

            {subjects?.length > 0 && (
                <div className="text-gray-700">
                    <strong>Subjects:</strong>{' '}
                    <ul className="list-disc list-inside ml-4">
                        {subjects.slice(0, 6).map(subject => (
                            <li key={subject}>{subject}</li>
                        ))}
                    </ul>
                </div>
            )}

            <div>
                <p className="text-gray-700 whitespace-pre-line">
                    <strong>Description:</strong> {getDescription()}
                </p>
            </div>
        </div>
    );
};

export default BookDetails;
