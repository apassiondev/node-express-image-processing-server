const { Router } = require("express");
const multer = require("multer");
const path = require("path");
const imageProcessor = require("./imageProcessor");

const router = Router();

// Write the filename handler function
const filename = (request, file, callback) => {
  callback(null, file.originalname);
};

// Configure Multer disk storage
const storage = multer.diskStorage({
  filename,
  destination: "api/uploads/",
});

// Create the MIME type file filter
const fileFilter = (request, file, callback) => {
  if (file.mimetype !== "image/png") {
    const errorMessage = "Wrong file type";
    request.fileValidatorError = errorMessage;
    callback(null, false, new Error(errorMessage));
  } else {
    callback(null, true);
  }
};

// Define the upload callback
const upload = multer({
  storage,
  fileFilter,
});

// Create the upload route
router.post("/upload", upload.single("photo"), async (request, response) => {
  // Failed
  if (request.fileValidatorError) {
    return response.status(400).json({
      error: request.fileValidatorError,
    });
  }

  try {
    await imageProcessor(request.file.filename);
  } catch (error) {
    // throw new Error(error.message);
    return console.error(error);
  }

  // Success
  response.status(201).json({
    success: true,
  });
});

// Resolve the path to the photo viewer
const photoPath = path.resolve(__dirname, "../../client/photo-viewer.html");
router.get("/photo-viewer", (request, response) => {
  response.sendFile(photoPath);
});

module.exports = router;
