// server.mjs
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

// Create Express app
const app = express();

// Define port number
const PORT = 3000;

// Use middleware
app.use(cors()); // Enable CORS for all routes
app.use(express.json()); // Parse incoming JSON requests

// URL scanning route
app.get('/scan-url', async (req, res) => {
    try {
        // Extract URL from query parameters
        const { url } = req.query;

        // API key for the URL scanning service
        const apiKey = 'xqjy4ZjTD7oFkRE4jfwSNI0iSPit4RFm';

        // Construct URL for the scanning service
        const apiUrl = `https://www.ipqualityscore.com/api/json/url/${apiKey}/scan?url=${encodeURIComponent(url)}`;

        // Fetch data from the scanning service
        const response = await fetch(apiUrl);
        const data = await response.json();

        // Log API response for debugging purposes
        console.log('API Response:', data);

        // Extract relevant information from the API response
        const safeStatus = !data.unsafe;
        const phishingDetection = !data.phishing;
        const malwareScanning = !data.malware;
        const suspiciousActivity = data.suspicious;
        const domainReputation = data.domain_trust || 'undefined';

        // Construct the response object
        const responseData = {
            safe: safeStatus,
            phishing: phishingDetection,
            malware: malwareScanning,
            suspicious: suspiciousActivity,
            reputation: domainReputation
        };

        // Send JSON response
        res.json(responseData);
    } catch (error) {
        // Handle errors
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
