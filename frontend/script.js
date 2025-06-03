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

        const response = await fetch('http://localhost:5000/shorten', {
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

function showResult(message, type) {
    const resultDiv = document.getElementById('result');
    resultDiv.innerHTML = message;
    resultDiv.className = `result-container ${type}`;
    
    // Scroll to result if it's not visible
    resultDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        const copyBtn = document.querySelector('.copy-btn');
        const originalHTML = copyBtn.innerHTML;
        copyBtn.innerHTML = '<i class="fas fa-check"></i>';
        copyBtn.setAttribute('aria-label', 'URL copied!');
        
        // Show tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip';
        tooltip.textContent = 'Copied!';
        copyBtn.appendChild(tooltip);
        
        setTimeout(() => {
            copyBtn.innerHTML = originalHTML;
            copyBtn.setAttribute('aria-label', 'Copy URL');
            tooltip.remove();
        }, 2000);
    } catch (err) {
        console.error('Failed to copy text: ', err);
        showResult('Failed to copy URL. Please try again.', 'error');
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

// Add enter key support
document.getElementById('longUrl').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        shortenUrl();
    }
});

// Add paste event support
document.getElementById('longUrl').addEventListener('paste', function(e) {
    // Clear any existing error message when user pastes a new URL
    const resultDiv = document.getElementById('result');
    if (resultDiv.classList.contains('error')) {
        resultDiv.style.display = 'none';
    }
});
