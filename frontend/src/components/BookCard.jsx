import { motion } from 'framer-motion';
import '../styles/BookCard.css';

const BookCard = ({ book, index }) => {
    if (!book) return null;

    const {
        title,
        author_name = ['Unknown Author'],
        first_publish_year,
        cover_i,
        first_sentence,
        subtitle,
        description,
    } = book;

    const shortDescription = first_sentence
        ? (typeof first_sentence === 'string' ? first_sentence : first_sentence.value)
        : subtitle
            ? subtitle
            : description
                ? (typeof description === 'string' ? description : description.value)
                : 'No description available';

    const coverUrl = cover_i
        ? `https://covers.openlibrary.org/b/id/${cover_i}-L.jpg`
        : null;

    const formatText = (text, maxLength) => {
        if (!text) return '';
        return text.length > maxLength
            ? `${text.substring(0, maxLength)}...`
            : text;
    };


    const item = {
        hidden: { opacity: 0, y: 20 },
        show: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.4,
                delay: index * 0.05
            }
        }
    };

    const hoverAnimation = {
        rest: {
            scale: 1,
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
        },
        hover: {
            scale: 1.03,
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            y: -5
        }
    };

    return (
        <motion.div
          className="book-card"
          variants={item}
          initial="rest"
          whileHover="hover"
          animate="rest"
        >
          <motion.div className="book-card-inner" variants={hoverAnimation}>
            <div className="book-card-cover">
              {coverUrl ? (
                <img
                  src={coverUrl}
                  alt={`Cover of ${title}`}
                  className="book-cover-image"
                  loading="lazy"
                />
              ) : (
                <div className="no-cover">
                  <span>No Cover</span>
                </div>
              )}
            </div>

            <div className="book-card-content">
              <h3 className="book-card-title">{formatText(title, 40)}</h3>

              <p className="book-card-author">
                {formatText(author_name.join(', '), 30)}
              </p>

              {first_publish_year && (
                <p className="book-card-date">{first_publish_year}</p>
              )}

              <p className="book-card-description">
                {formatText(shortDescription, 100)}
              </p>
            </div>
          </motion.div>
        </motion.div>
    );
};

export default BookCard;
