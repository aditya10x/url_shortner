# URL Shortener Project Documentation

## Overview

This project is a URL shortener that converts long URLs into shorter, more manageable links. It consists of a Flask backend and a simple HTML/JavaScript frontend.

## Backend

### Flask Server (`app.py`)

- **Purpose**: Handles API requests for shortening URLs and redirecting short URLs to their original long URLs.
- **Key Components**:
  - **CORS Support**: Enabled to allow cross-origin requests from the frontend.
  - **Database Initialization**: Initializes the SQLite database on startup.
  - **API Endpoints**:
    - `POST /shorten`: Accepts a JSON payload with a `long_url`, generates a short code, saves it to the database, and returns the short URL.
    - `GET /<code>`: Retrieves the original long URL from the database using the short code and redirects the user.

### Database Logic (`backend/database.py`)

- **Purpose**: Manages interactions with the SQLite database.
- **Key Functions**:
  - `init_db()`: Creates the `urls` table if it doesn't exist.
  - `save_url(code, long_url)`: Saves a new URL entry into the database.
  - `get_url(code)`: Retrieves the original long URL associated with a short code.

### Utility Functions (`backend/utils.py`)

- **Purpose**: Provides helper functions for the backend.
- **Key Functions**:
  - `generate_code(length=6)`: Generates a random short code for the URL.

## Frontend

### HTML (`frontend/index.html`)

- **Purpose**: Provides the user interface for entering long URLs and displaying short URLs.
- **Key Elements**:
  - Input field for the long URL.
  - Button to trigger the URL shortening process.
  - Paragraph element to display the short URL or error messages.

### JavaScript (`frontend/script.js`)

- **Purpose**: Handles user interactions and communicates with the backend.
- **Key Functions**:
  - `shortenUrl()`: Asynchronously sends a POST request to the `/shorten` endpoint with the long URL, then displays the short URL or error message.

## How It Works

1. **User Interaction**:
   - The user enters a long URL in the input field and clicks "Shorten".
   - The JavaScript function `shortenUrl()` is triggered.

2. **Backend Processing**:
   - The Flask server receives the POST request at `/shorten`.
   - It extracts the long URL from the request, generates a short code, and saves it to the database.
   - The short URL is returned to the frontend.

3. **Frontend Display**:
   - The short URL is displayed to the user.
   - Clicking the short URL triggers a GET request to `/<code>`, which redirects to the original long URL.

## Database

- **SQLite Database (`urls.db`)**:
  - Stores the mapping between short codes and long URLs.
  - Schema: `urls (code TEXT PRIMARY KEY, long_url TEXT)`.

## Conclusion

This project demonstrates a simple yet effective URL shortener using Flask and vanilla JavaScript. It showcases basic API interactions, database operations, and frontend-backend communication. 