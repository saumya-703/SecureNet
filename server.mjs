// server.mjs
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// URL scanning route
app.get('/scan-url', async (req, res) => {
    try {
        const url = req.query.url;
        const apiKey = 'xqjy4ZjTD7oFkRE4jfwSNI0iSPit4RFm';
        const apiUrl = `https://www.ipqualityscore.com/api/json/url/${apiKey}/scan?url=${encodeURIComponent(url)}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('API Response:', data); // Log the API response

        // Extract relevant information from the API response
        const safeStatus = !data.unsafe;
        const phishingDetection = !data.phishing;
        const malwareScanning = !data.malware;
        const suspiciousActivity = data.suspicious;
        const domainReputation = data.domain_trust || 'undefined';

        console.log(safeStatus);
        // Construct the response object
        const responseData = {
            safe: safeStatus,
            phishing: phishingDetection,
            malware: malwareScanning,
            suspicious: suspiciousActivity,
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
