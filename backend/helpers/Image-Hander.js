import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';



// For __dirname with ES6 modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '../uploads')),
  filename: (req, file, cb) => {
    const uniqueName = `img-${Date.now()}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  }
});

export const upload = multer({ storage });