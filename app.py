from flask import Flask, request, jsonify, redirect
from flask_cors import CORS
import os
import sys
sys.path.append(os.path.join(os.path.dirname(__file__), 'backend'))
from database import init_db, save_url, get_url
from utils import generate_code

app = Flask(__name__)
CORS(app)

init_db()

@app.route('/')
def home():
    return "URL Shortener is working!"

@app.route('/shorten', methods=['POST'])
def shorten():
    data = request.get_json()
    long_url = data.get('long_url')
    if not long_url:
        return jsonify({'error': 'No URL provided'}), 400
    code = generate_code()
    save_url(code, long_url)
    short_url = request.host_url + code
    return jsonify({'short_url': short_url})

@app.route('/<code>')
def redirect_to_long_url(code):
    long_url = get_url(code)
    if long_url:
        return redirect(long_url)
    return 'URL not found', 404

if __name__ == '__main__':
    app.run(debug=True)
