import express from "express";
import { engine } from "express-handlebars";
import { fetchMovies, fetchMovie } from "./script/main.js";

const app = express();

// Set up Handlebars
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./templates");

// Serve static files
app.use("/static", express.static("./static"));
app.use("/script", express.static("./script"));

// Route: Home Page (Displays movie titles as links)
app.get("/", async (req, res) => {
    const movies = await fetchMovies();
    res.render("index", { movies });
});

// Route for Movies Page 
app.get('/moviesPage', (req, res) => {
    res.render("moviesPage"); 
});

// Route: All Movies Page
app.get("/allMovies", async (req, res) => {
    const movies = await fetchMovies();
    res.render("allMovies", { movies });
});

// Route: Individual Movie Page
app.get("/movies/:id", async (req, res) => {
    const movie = await fetchMovie(req.params.id);
    if (movie) {
        res.render("movie", { movie });
    } else {
        res.status(404).send("Movie not found.");
    }
});

// Start Server
const PORT = 5080;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

export default app;
