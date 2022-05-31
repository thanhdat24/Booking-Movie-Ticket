const TheaterSystem = require('../models/theaterSystemModel');
const factory = require('../controllers/handlerFactory');
const multer = require('multer');

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/img/theaters-system');
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split('/')[1];
    cb(null, `theaters-system-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image')) {
    cb(null, true);
  } else {
    cb(
      new AppError('Không phải hình ảnh! Vui lòng tải file hình ảnh.', 400),
      false
    );
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadTheaterSystem = upload.single('logo');

exports.getAllTheaterSystem = factory.getAll(TheaterSystem, {
  path: 'theatersystem',
});
exports.createTheaterSystem = factory.createOneTheaterSystem(TheaterSystem);
exports.getDetailTheaterSystem = factory.getOne(TheaterSystem, {
  path: 'theatersystem idTheaterCluster',
});
exports.updateTheaterSystem = factory.updateOne(TheaterSystem);
exports.deleteTheaterSystem = factory.deleteOne(TheaterSystem);

