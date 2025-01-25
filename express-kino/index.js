import express from "express";
import { engine } from "express-handlebars";
import fetch from "node-fetch"; 
import renderPage from './lib/renderPage.js';

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./templates");

// Serve static files
app.use("/static", express.static("./static"));
app.use("/script", express.static("./script"));

// Fetch movies from API dynamically
async function fetchMovies() {
    try {
        const response = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
        const payload = await response.json();
        console.log("API Response:", payload); 
        return payload.data; 
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

// Route for Movies Page 
app.get('/moviesPage', (req, res) => {
    res.render("moviesPage"); 
});

// Route for Home Page (Displays movie titles as links)
app.get("/", async (req, res) => {
    const movies = await fetchMovies();
    console.log("Fetched Movies:", movies); 
    res.render("index", { movies });
});

// Route for All Movies Page with Dynamic Styling
app.get('/allMovies', async (req, res) => {
    try {
        const response = await fetch("https://plankton-app-xhkom.ondigitalocean.app/api/movies");
        const payload = await response.json();
        res.render("allMovies", { movies: payload.data });
    } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).send("Failed to load movies.");
    }
});

// Route for Individual Movie Page (Displays full movie details)
app.get("/movies/:id", async (req, res) => {
    try {
        const movieId = req.params.id;
        const response = await fetch(`https://plankton-app-xhkom.ondigitalocean.app/api/movies/${movieId}`);
        const payload = await response.json();
        
        console.log("Fetched Movie Data:", JSON.stringify(payload, null, 2)); 
        
        res.render("movie", { movie: payload.data });
    } catch (error) {
        console.error("Error fetching movie details:", error);
        res.status(404).send("Movie not found.");
    }
});


// Start Server
app.listen(5080, () => {
    console.log("Server running on http://localhost:5080");
});
