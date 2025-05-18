import { motion } from 'framer-motion';
import '../styles/Loader.css';

const Loader = () => {
  const loadingVariants = {
    animate: {
      scale: [1, 1.2, 1],
      opacity: [0.5, 1, 0.5],
      transition: {
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop"
      }
    }
  };

  const circleVariants = {
    initial: { scale: 0 },
    animate: (i) => ({
      scale: 1,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: "easeInOut"
      }
    })
  };

  return (
    <div className="loader-container">
      <div className="loader">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="loader-circle"
            variants={circleVariants}
            initial="initial"
            animate="animate"
            custom={i}
            layoutId={`circle-${i}`}
          >
            <motion.div
              className="loader-inner-circle"
              variants={loadingVariants}
              animate="animate"
            />
          </motion.div>
        ))}
      </div>
      <p className="loader-text">Loading books...</p>
    </div>
  );
};

export default Loader;