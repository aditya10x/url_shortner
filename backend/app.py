import sqlite3

DB_FILE = 'urls.db'

def init_db():
    conn = sqlite3.connect(DB_FILE)
    conn.execute('CREATE TABLE IF NOT EXISTS urls (code TEXT PRIMARY KEY, long_url TEXT)')
    conn.commit()
    conn.close()

def save_url(code, long_url):
    conn = sqlite3.connect(DB_FILE)
    conn.execute('INSERT INTO urls (code, long_url) VALUES (?, ?)', (code, long_url))
    conn.commit()
    conn.close()

def get_url(code):
    conn = sqlite3.connect(DB_FILE)
    cursor = conn.execute('SELECT long_url FROM urls WHERE code = ?', (code,))
    row = cursor.fetchone()
    conn.close()
    return row[0] if row else None
