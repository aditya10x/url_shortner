import { createClient } from '@vercel/postgres';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    try {
        const { long_url } = req.body;

        if (!long_url) {
            return res.status(400).json({ error: 'URL is required' });
        }

        // Generate short code
        const code = generateCode();

        // Store in database
        const client = createClient();
        await client.connect();
        await client.query(
            'INSERT INTO urls (code, long_url) VALUES ($1, $2)',
            [code, long_url]
        );
        await client.end();

        // Return short URL
        const shortUrl = `${req.headers.origin}/${code}`;
        return res.status(200).json({ short_url: shortUrl });
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}

function generateCode(length = 6) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
} 