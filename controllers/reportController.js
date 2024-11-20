const xlsx = require("xlsx");
const path = require("path");
const Report = require("../models/ReportModel");
const segmentsDATA = require("../models/segmentModel");

// Upload and process Excel file
exports.uploadReports = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = path.join(__dirname, "../", req.file.path);
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Assuming data is in the first sheet
    const sheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(sheet, { header: 1 });

    // Extract meta information (Rows 1-3)
    const reportCode = data[0]?.[1];
    const reportName = data[1]?.[1];
    const totalSegments = parseInt(data[2]?.[1]);

    // Extract years from the header row (Row 4)
    const years = data[3]?.slice(2, -1); // Extract columns C to L (years range)

    // Prepare regions data (From Row 5 onward)
    const regions = [];
    for (let i = 4; i < data.length; i++) {
      const row = data[i];
      if (!row[0] || !row[1]) continue; // Skip empty rows

      const region = row[0];
      const country = row[1];
      const yearValues = row.slice(2, -1); // Values for the years
      const cagr = row[row.length - 1]; // Last column (CAGR)

      // Pair year with its corresponding value
      const yearsData = years.map((year, index) => ({
        year: parseInt(year), // Convert year string to integer
        value: parseFloat(yearValues[index]), // Convert value to float
      }));

      regions.push({ region, country, years: yearsData, cagr });
    }

    // Create a new report document
    const report = new Report({
      sheetName,
      reportCode,
      reportName,
      totalSegments,
      regions,
    });

    console.log(totalSegments)
    // Save to MongoDB
    await report.save();

    res.status(201).json({ message: "Report uploaded successfully", report });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred during file upload" });
  }
};

// Retrieve reports by region and country
// exports.getReports = async (req, res) => {
//   try {
//     const { region, country } = req.query;
//     const filter = {};
//     if (region) filter.region = region;
//     if (country) filter.country = country;
//     const reports = await Report.find(filter);
//     res.status(200).json(reports);
//   } catch (error) {
//     console.error(error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while retrieving reports" });
//   }
// };

exports.getReports = async (req, res) => {
  try {
    const { region, country } = req.query; // Retrieve filters from query params
    const filter = {};

    // Add filters to the query if they are provided
    if (region) filter.region = new RegExp(region, "i"); // Case-insensitive match for region
    if (country) filter.country = new RegExp(country, "i"); // Case-insensitive match for country

    // Fetch reports from the database based on filters
    const reports = await Report.find(filter);

    // Check if reports are found
    if (!reports.length) {
      return res.status(404).json({ message: "No reports found" });
    }

    // Send reports as a response
    res.status(200).json(reports);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "An error occurred while retrieving reports" });
  }
};


////////////////////

// exports.uploadExcel = async (req, res) => {
//   try {
//     if (!req.file) {
//       return res.status(400).json({ message: "Please upload an Excel file." });
//     }

//     // Parse the uploaded Excel file
//     const workbook = xlsx.readFile(req.file.path);
//     const sheet = workbook.Sheets[workbook.SheetNames[0]];
//     const jsonData = xlsx.utils.sheet_to_json(sheet, { header: 1 });

//     // Extract data from the Excel sheet
//     const reportCode = jsonData[1][1]; // Assuming "segmentsDATA Code" is in row 2, column 2
//     const reportName = jsonData[1][2]; // Assuming "segmentsDATA Name" is in row 2, column 3

//     const data = [];
//     let currentCategory = "";

//     jsonData.slice(3).forEach((row) => {
//       if (row[0]) {
//         currentCategory = row[0]; // Category like "By Technology" or "By Application"
//       } else if (row[1]) {
//         const subCategory = row[1];
//         const yearValues = {};

//         // Collect year-wise data dynamically
//         for (let i = 2; i < row.length; i++) {
//           yearValues[`year_${2020 + i - 2}`] = row[i];
//         }

//         data.push({
//           category: currentCategory,
//           subCategory,
//           yearValues,
//         });
//       }
//     });

//     // Store in MongoDB
//     const report = new segmentsDATA({
//       reportCode,
//       reportName,
//       data,
//     });

//     await report.save();

//     res.status(200).json({ message: "Data saved successfully!", report });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "An error occurred while processing the file." });
//   }
// };