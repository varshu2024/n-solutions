import multer from 'multer';

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 50 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    if (file.fieldname === 'video' && file.mimetype.startsWith('video/')) return callback(null, true);
    if (file.mimetype.startsWith('image/')) return callback(null, true);
    const error = new Error('Only image and video files are allowed.');
    error.statusCode = 400;
    return callback(error);
  }
});

export const projectImageUpload = upload.single('image');
export const mediaImageUpload = upload.single('image');
export const videoMediaUpload = upload.fields([
  { name: 'thumbnail', maxCount: 1 },
  { name: 'video', maxCount: 1 }
]);

const resumeUploadHandler = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (request, file, callback) => {
    const extension = file.originalname.toLowerCase().split('.').pop();
    const allowedTypes = {
      pdf: 'application/pdf',
      doc: 'application/msword'
    };

    if (allowedTypes[extension] === file.mimetype) return callback(null, true);

    const error = new Error('Resume must be a PDF or DOC file.');
    error.statusCode = 400;
    return callback(error);
  }
});

export const resumeUpload = (request, response, next) => resumeUploadHandler.single('resume')(
  request,
  response,
  (error) => {
    if (error?.code === 'LIMIT_FILE_SIZE') {
      error.statusCode = 400;
      error.message = 'Resume must not exceed 5 MB.';
    }
    return next(error);
  }
);