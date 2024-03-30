function isValidUrl(url) {
    // Regular expression to validate URL format with optional 'www'
    const urlPattern = /^(ftp|http|https):\/\/(www\.)?[^ "]+$/;
    return urlPattern.test(url);
}

function scanURL() {
    var url = document.getElementById('urlInput').value;

    // Check if the input is a valid URL
    if (!isValidUrl(url)) {
        document.getElementById('result').innerText = "Please enter a valid URL.";
        return;
    }

    // Make a GET request to your Node.js server
    fetch(`http://localhost:3000/scan-url?url=${encodeURIComponent(url)}`)
        .then(response => response.json())
        .then(data => {
            // Log the entire data object to inspect it
            console.log('API Response:', data);

            // Display the result
            if (data.error) {
                console.error('Error:', data.error);
                document.getElementById('result').innerText = "An error occurred. Please try again later.";
            } else {
                let resultMessage = "The URL is ";

                // Log boolean values for each factor
                console.log('Unsafe:', data.unsafe);
                console.log('Phishing Detected:', data.phishing);
                console.log('Malware Detected:', data.malware);
                console.log('Suspicious Activity Detected:', data.suspicious);

                // Add CSS classes based on the boolean values
                const safeClass = data.safe ? 'bold-green' : 'bold-red';
                const phishingClass = !data.phishing ? 'bold-red' : 'bold-green';
                const malwareClass = !data.malware ? 'bold-green' : 'bold-red';
                const suspiciousClass = data.suspicious ? 'bold-red' : 'bold-green';

                // Build the result message with CSS classes and line breaks
                //resultMessage += `<span class="${safeClass}">${data.safe ? 'safe' : 'unsafe'}</span>. <br>`;
                //resultMessage += `<span class="${phishingClass}">${!data.phishing ? 'Phishing detected' : 'No phishing detected'}</span>. <br>`;
                //resultMessage += `<span class="${malwareClass}">${data.malware ? 'Malware detected' : 'No malware detected'}</span>. <br>`;
                resultMessage += `<span class="${suspiciousClass}">${data.suspicious ? "Malicious": "Safe"}</span>. <br>`;

                document.getElementById('result').innerHTML = resultMessage;
            }
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('result').innerText = "An error occurred. Please try again later.";
        });
}
