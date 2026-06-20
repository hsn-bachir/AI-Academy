const express = require('express');
const multer = require('multer');
const path = require('path');
const xlsx = require('xlsx');
const fs = require('fs');

const app = express();

// Set up multer to handle form data (without file upload)
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// Middleware to parse JSON and form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// POST route to handle form submission
app.post('/save', upload.none(), (req, res) => {
    const { name, email, password, dob } = req.body;

    // Ensure all fields are filled
    if (!name || !email || !password || !dob) {
        return res.status(400).json({ success: false, message: 'All fields are required!' });
    }

    // Handle Excel file writing here (same as before)
    // Define the path to the Excel file
    const filePath = path.join(__dirname, 'student_info.xlsx');
    let workbook;
    let worksheet;

    // Check if the file exists
    if (fs.existsSync(filePath)) {
        workbook = xlsx.readFile(filePath);  // Read the existing workbook
        worksheet = workbook.Sheets['Students'];  // Get the existing worksheet
    } else {
        workbook = xlsx.utils.book_new();  // Create a new workbook
        worksheet = xlsx.utils.aoa_to_sheet([["Name", "Email", "Password", "DOB"]]);  // Add headers
        xlsx.utils.book_append_sheet(workbook, worksheet, 'Students');  // Append sheet
    }

    // Find the last row to append data
    const worksheetData = xlsx.utils.sheet_to_json(worksheet, { header: 1 });
    const lastRowIndex = worksheetData.length;  // Get the next available row

    // Add the new data to the worksheet
    const newRow = [name, email, password, dob];
    xlsx.utils.sheet_add_aoa(worksheet, [newRow], { origin: lastRowIndex });

    // Save the workbook to the file
    xlsx.writeFile(workbook, filePath);

    // Respond to the client with a success message
    res.json({ success: true, message: 'Student information saved successfully!' });
});

// Start the server
app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
