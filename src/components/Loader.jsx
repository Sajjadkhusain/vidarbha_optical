import { motion } from "framer-motion";
import "../style/loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <motion.div
        className="loader"
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 0, 180, 180, 0],
          borderRadius: ["0%", "0%", "50%", "50%", "0%"],
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1,
        }}
      />
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="loader-text"
      >
        Loading...
      </motion.h1>
    </div>
  );
};

export default Loader;
