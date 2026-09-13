import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    if (file.mimetype.startsWith('image/')) return callback(null, true);
    const error = new Error('Only image files are allowed.');
    error.statusCode = 400;
    return callback(error);
  }
});

export const projectImageUpload = upload.single('image');