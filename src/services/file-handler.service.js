const multer = require('multer');

const storage = (filepath, type) => {
    return multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, `uploads/${filepath}`);
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = Date.now()
            const newFileName = uniqueSuffix + '.' + file.mimetype.split('/')[1]
            cb(null, `${type}-${newFileName}`);
        }
    });
}

const imageFilter = (req, file, cb) => {
    const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('This file type is not allowed.'), false);
    }
  };

  const uploadImage = multer({
    storage: storage(`images/`, `app`),
    fileFilter: imageFilter,
});

const storage_user = (filepath, type) => {
  return multer.diskStorage({
      destination: (req, file, cb) => {
          cb(null, `uploads/${filepath}`);
      },
      filename: (req, file, cb) => {
          const uniqueSuffix = Date.now()
          const newFileName = uniqueSuffix + '.' + file.mimetype.split('/')[1]
          cb(null, `${type}-${newFileName}`);
      }
  });
}

const imageFilter_user = (req, file, cb) => {
  const allowedMimeTypes = ['image/jpeg', 'image/jpg', 'image/png'];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('This file type is not allowed.'), false);
  }
};

const uploadImage_user = multer({
  storage: storage_user(`images/`, `app`),
  fileFilter: imageFilter_user,
});

module.exports = {uploadImage, uploadImage_user}