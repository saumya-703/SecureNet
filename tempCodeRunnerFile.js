const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// URL scanning route
app.get('/scan-url', async (req, res) => {
    try {
        const url = req.query.url;
        const apiKey = 'xqjy4ZjTD7oFkRE4jfwSNI0iSPit4RFm';
        const fetch = await require('node-fetch');
        const apiUrl = `https://www.ipqualityscore.com/api/json/url/${apiKey}/scan?url=${encodeURIComponent(url)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        // Extract relevant information from the API response
        const safeStatus = data.safe || false;
        const phishingDetection = data.phishing || false;
        const malwareScanning = data.malware || false;
        const domainReputation = data.reputation || 'undefined';

        // Construct the response object
        const responseData = {
            safe: safeStatus,
            phishing: phishingDetection,
            malware: malwareScanning,
            reputation: domainReputation
        };

        res.json(responseData);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
