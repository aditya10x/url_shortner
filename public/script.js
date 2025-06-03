// API endpoint configuration
const API_BASE_URL = '/api'; // Vercel API routes are relative to the domain

async function shortenUrl() {
    const longUrl = document.getElementById('longUrl').value.trim();
    const resultDiv = document.getElementById('result');
    const shortenBtn = document.getElementById('shortenBtn');

    // Validate URL
    if (!longUrl) {
        showResult('Please enter a URL', 'error');
        return;
    }

    if (!isValidUrl(longUrl)) {
        showResult('Please enter a valid URL (e.g., https://example.com)', 'error');
        return;
    }

    try {
        // Show loading state
        shortenBtn.innerHTML = '<div class="loading"></div>';
        shortenBtn.disabled = true;

        const response = await fetch(`${API_BASE_URL}/shorten`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ long_url: longUrl })
        });

        const data = await response.json();

        if (response.ok) {
            const shortUrl = data.short_url;
            showResult(`
                <div class="success-message">
                    <p>Your shortened URL is ready!</p>
                    <div class="url-container">
                        <a href="${shortUrl}" target="_blank" rel="noopener noreferrer">${shortUrl}</a>
                        <button onclick="copyToClipboard('${shortUrl}')" class="copy-btn" aria-label="Copy URL">
                            <i class="fas fa-copy"></i>
                        </button>
                    </div>
                </div>
            `, 'success');
            // Clear input after successful shortening
            document.getElementById('longUrl').value = '';
        } else {
            showResult(data.error || 'Failed to shorten URL. Please try again.', 'error');
        }
    } catch (error) {
        showResult('Error connecting to server. Please check your connection and try again.', 'error');
    } finally {
        // Reset button state
        shortenBtn.innerHTML = '<i class="fas fa-magic"></i> Shorten';
        shortenBtn.disabled = false;
    }
} 