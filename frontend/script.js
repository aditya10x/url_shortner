async function shortenUrl() {
  const longUrl = document.getElementById('longUrl').value;
  const response = await fetch('http://localhost:5000/shorten', {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({ long_url: longUrl })
  });
  const data = await response.json();
  document.getElementById('result').innerText = data.short_url || data.error;
}
