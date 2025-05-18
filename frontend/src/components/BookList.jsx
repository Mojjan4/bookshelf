import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BookCard from './BookCard';
import Loader from './Loader';
import '../styles/BookList.css';

const BookList = ({ books, loading }) => {
    if (loading) {
        return <Loader />;
    }

    if (!Array.isArray(books)) {
        console.error("Invalid books prop passed to BookList:", books);
        return <p className="text-red-600">Failed to display books. Please try again.</p>;
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <motion.div
            className="book-list"
            variants={container}
            initial="hidden"
            animate="show"
        >
            {books.map((book, index) => (
                <Link
                    to={`/book/${book.key?.split('/').pop() || book.id || index}`}
                    className="book-link"
                    key={book.key || index}
                >
                    <BookCard book={book} index={index} />
                </Link>
            ))}
        </motion.div>
    );
};

export default BookList;
