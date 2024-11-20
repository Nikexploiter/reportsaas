const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadReports ,getReports} = require('../controllers/reportController');
const reportController = require('../controllers/reportController');


// Configure file upload
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), reportController.uploadReports);
// router.post("/segment",upload.single('file'),reportController.uploadExcel)

// router.route("/upload",upload.single('file')).post(uploadReports)
// Route to upload and process Excel file
// router.post('/upload', upload.single('file'), reportController.uploadReports);

// Route to retrieve reports by region and country
// router.get('/', reportController.getReports);

router.route("/getReport").get(getReports)

module.exports = router;
