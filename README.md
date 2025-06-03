# URL Shortener Project

This project is a simple URL shortener built with Flask for the backend and vanilla JavaScript for the frontend.

## Overview

- **Backend**: Flask server with SQLite database for storing URLs.
- **Frontend**: HTML, CSS, and JavaScript for user interaction.

## Setup

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd url_shortner
   ```

2. **Set up a virtual environment** (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
   ```

3. **Install dependencies**:
   ```bash
   pip install -r backend/requirements.txt
   pip install flask-cors
   ```

4. **Run the Flask server**:
   ```bash
   python app.py
   ```

5. **Open the frontend**:
   - Open `frontend/index.html` in your browser.

## Usage

- Enter a long URL in the input field and click "Shorten".
- The short URL will be displayed. Clicking it will redirect you to the original long URL.

## Project Structure

- `app.py`: Main Flask application with API endpoints.
- `backend/`: Contains database logic (`database.py`) and utility functions (`utils.py`).
- `frontend/`: Contains HTML, CSS, and JavaScript files for the user interface.

## API Endpoints

- `POST /shorten`: Accepts a JSON payload with a `long_url` and returns a short URL.
- `GET /<code>`: Redirects to the original long URL associated with the short code.

## License

This project is open-source and available under the MIT License. 