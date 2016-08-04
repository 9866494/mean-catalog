'use strict';


exports.file = function (req, res) {
  res.status(200).json({
    originalname: req.files[0].originalname,
    mimetype: req.files[0].mimetype,
    filename: req.files[0].filename
  })
  ;
};
