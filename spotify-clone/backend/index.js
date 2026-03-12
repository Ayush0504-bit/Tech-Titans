require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { spawn } = require('child_process');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Mock Data
const MOCK_TRACKS = [
    {
        title: "Never Gonna Give You Up",
        artist: "Rick Astley",
        duration: 213,
        thumbnail: "https://i.ytimg.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
        streamUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
        id: "dQw4w9WgXcQ"
    },
    {
        title: "Blinding Lights",
        artist: "The Weeknd",
        duration: 200,
        thumbnail: "https://i.ytimg.com/vi/4NRXx6U8ABQ/hqdefault.jpg",
        streamUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3",
        id: "4NRXx6U8ABQ"
    },
    {
        title: "Levitating",
        artist: "Dua Lipa",
        duration: 203,
        thumbnail: "https://i.ytimg.com/vi/TUVcZfQe-Kw/hqdefault.jpg",
        streamUrl: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
        id: "TUVcZfQe-Kw"
    }
];

// 1. GET /search?q=song+artist (MOCKED)
app.get('/search', (req, res) => {
    const { q } = req.query;
    if (!q) return res.status(400).json({ error: 'Query is required' });

    // Return a random mock track to simulate search
    const track = MOCK_TRACKS[Math.floor(Math.random() * MOCK_TRACKS.length)];
    res.json(track);
});

// 2. GET /stream?url=... (MOCKED direct redirect or pass-through for demo)
app.get('/stream', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: 'URL is required' });

    // In a real app we'd proxy, here we just redirect to the mock URL
    res.redirect(url);
});

// 3. GET /spotify-playlist?id=... (MOCKED)
app.get('/spotify-playlist', async (req, res) => {
    const { id } = req.query;
    if (!id) return res.status(400).json({ error: 'Playlist ID is required' });

    // Return the mocked tracks array
    const tracks = MOCK_TRACKS.map(t => ({
        name: t.title,
        artists: t.artist,
        albumArt: t.thumbnail
    }));

    res.json({ tracks });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
