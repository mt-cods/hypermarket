import allowedOrigins from './allowedOrigins.js';
const { indexOf } = allowedOrigins;

const corsOptions = {
  origin: (origin, callback) => {
    if (indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not Allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

export default corsOptions;