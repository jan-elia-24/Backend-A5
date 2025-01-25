const API_BASE = 'https://plankton-app-xhkom.ondigitalocean.app/api';

export async function fetchMovies() {
    try {
        const response = await fetch(`${API_BASE}/movies`);
        const payload = await response.json();
        return payload.data;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

export async function fetchMovie(id) {
    try {
        const response = await fetch(`${API_BASE}/movies/${id}`);
        const payload = await response.json();
        return payload.data;
    } catch (error) {
        console.error("Error fetching movie:", error);
        return null;
    }
}