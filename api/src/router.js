const { Router } = require("express");
const multer = require("multer");

const router = Router();

// Write the filename handler function
const filename = (request, file, callback) => {
  callback(null, file.originalname);
};

// Create the MIME type file filter
const fileFilter = (request, file, callback) => {
  const { mimetype } = file;
  if (mimetype !== "image/png") {
    const errorMessage = "Wrong file type";
    request.fileValidatorError = errorMessage;
    callback(null, false, new Error(errorMessage));
  } else {
    callback(null, true);
  }
};

// Configure Multer disk storage
const storage = multer.diskStorage({
  filename,
  destination: "api/uploads/",
});

// Define the upload callback
const upload = multer({
  storage,
  fileFilter,
});

// Create the upload route
router.post("/upload", upload.single("photo"), (request, response) => {
  // Failed
  if (request.fileValidatorError) {
    return response.status(400).json({
      error: request.fileValidatorError,
    });
  }

  // Success
  response.status(201).json({
    success: true,
  });
});

module.exports = router;
