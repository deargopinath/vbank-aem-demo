const express = require('express');
const cors = require('cors');

const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const PORT = 8888;
const app = express();

app.use(cors({ origin: '*'}));

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// POST endpoint to receive data
app.post('/upload', (req, res) => {
    const { title, content } = req.body;

    // Verify that the data has both title and content attributes
    if (!title || !content) {
        return res.status(400).send('Invalid data: title and content are required');
    }

    // Replace all blank spaces with underscores in the title
    const formattedTitle = title.replace(/ /g, '_');

    // Create a file named title.html with content as the content attribute of received data
    const filePath = path.join(__dirname, `${formattedTitle}.html`);
    fs.writeFile(filePath, content, 'utf8', (err) => {
        if (err) {
            console.error('Error writing file:', err);
            return res.status(500).send('Internal Server Error');
        }

        // Respond with success message
        res.send('File created successfully');
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

