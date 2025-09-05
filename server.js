// server.js
const express = require('express');
const path = require('path');

const app = express();

// Configuration
const PORT = process.env.PORT || 5000;
const HOST = '0.0.0.0'; // important for Docker

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files (optional)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.send('Hello from Node.js Dockerized App!');
});

app.get('/api/time', (req, res) => {
  res.json({ now: new Date().toISOString() });
});

app.get('/health', (req, res) => {
  res.json({ status: 'ok', uptime: process.uptime() });
});

// Basic error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// Start server
app.listen(PORT, HOST, () => {
  console.log(`Server listening at http://${HOST}:${PORT} (env: ${process.env.NODE_ENV || 'development'})`);
});
