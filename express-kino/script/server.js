import app from '../index.js';

// Start Server
const PORT = 5080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

