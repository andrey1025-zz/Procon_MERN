const multer = require('multer');
const path = require('path');

// storage engine
const storageEngine = multer.diskStorage({
    destination: './uploads/models/',
    filename: (req, file, fn) => {
        fn(null, `${new Date().getTime().toString()}-${file.fieldname}${path.extname(file.originalname)}`);
    }
});

const uploadMedia = multer({
    storage: storageEngine,
    limits: {
        fileSize: 1000000
    },
    fileFilter: (req, file, cb) => {
        validateMedia(file, cb)
    }
});


const validateMedia = function (file, cb) {
    allowedFileTypes = /jpeg|jpg|png|gif/;
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
    if (extension && mimeType) {
        return cb(null, true);
    } else {
        cb("Invalid file type. Only JPEG, PNG and GIF file are allowed.")
    }
};

module.exports = uploadMedia;
