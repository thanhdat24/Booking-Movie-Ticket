const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');

const filterObj = (obj, ...allowedField) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedField.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.deleteOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndDelete(req.params.id);

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(201).json({
      status: 'success',
      data: 'Xóa thành công!',
    });
  });

exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const path = req.file?.path.replace(/\\/g, '/').substring('public'.length);
    const urlImage = `http://localhost:8080${path}`;
    if (req.file) req.body.photo = urlImage;
    const _id = req.params.id;
    const doc = await Model.findByIdAndUpdate(_id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: doc,
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const path = req.file?.path.replace(/\\/g, '/').substring('public'.length);
    const urlImage = `http://localhost:8080${path}`;
    if (req.file) req.body.photo = urlImage;

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      result: doc.length,
      data: doc,
    });
  });
exports.createOneTheaterSystem = (Model) =>
  catchAsync(async (req, res, next) => {
    const path = req.file?.path.replace(/\\/g, '/').substring('public'.length);
    const urlImage = `http://localhost:8080${path}`;
    if (req.file) req.body.logo = urlImage;

    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      result: doc.length,
      data: doc,
    });
  });
exports.getOne = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    let query = Model.findById(req.params.id);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;
    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }
    res.status(200).json({
      status: 'success',
      length: 1,
      data: doc,
    });
  });

exports.getAll = (Model, populateOptions) =>
  catchAsync(async (req, res, next) => {
    // To allow for nested GET reviews on tour (hack)
    // let filter = {};
    // if (req.params.tourId) filter = { tour: req.params.tourId };

    // const features = new APIFeatures(Model.find(filter), req.query)
    //   .filter()
    //   .sort()
    //   .limitFields()
    //   .paginate();
    // const doc = await features.query;

    let query = Model.find(req.query);
    if (populateOptions) query = query.populate(populateOptions);
    const doc = await query;

    res.status(200).json({
      status: 'success',
      result: doc.length,
      data: doc,
    });
  });
