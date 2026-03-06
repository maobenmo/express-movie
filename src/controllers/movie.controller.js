const movies = require('../models/movie.model');


const getAllMovies = (req, res) => {
    // search
    const { keyword, sort, page = 1, limit = 10 } = req.query;
    const parsedPage = parseInt(page) || 1;
    const parsedLimit = parseInt(limit) || 10;

    let filteredMovies = [...movies];

    const filter = {};
    if (keyword) {
        filteredMovies = filteredMovies.filter(
            (movie) =>
                movie.title.toLowerCase().includes(keyword.toLowerCase()) ||
                movie.description.toLowerCase().includes(keyword.toLowerCase()),
        );
    }

    if (sort === 'rating') {
        filteredMovies.sort((a, b) => a.averageRating - b.averageRating);
    } else if (sort === '-rating') {
        filteredMovies.sort((a, b) => b.averageRating - a.averageRating);
    }

    const startIndex = (parsedPage - 1) * parsedLimit;

    const result = filteredMovies.slice(startIndex, startIndex + parsedLimit);

    res.json(result);
};

const getMovieById = (req, res) => {
    const { id } = req.params;
    const movie = movies.find((m) => m.id === parseInt(id));    

    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
};

const createMovie = (req, res) => {
    const { title, description, types } = req.body;
    if (!title || !description || !types) {
        return res.status(400).json({ error: 'Title, description, and types are required' });
    }

    const newMovie = {
        id: nextMovieId++,
        title,
        description,
        types,
        averageRating: 0,
        reviews: [],
    };

    movies.push(newMovie);
    res.status(201).json(newMovie);
};


const updateMovie = (req, res) => {
    const { id } = req.params;
    const { title, description, types } = req.body;

    const movie = movies.find((m) => m.id === parseInt(id));

    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    if (title) movie.title = title;
    if (description) movie.description = description;
    if (types) movie.types = types;

    res.json(movie);
};

const deleteMovie = (req, res) => {
    const { id } = req.params;
    const index = movies.findIndex((m) => m.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    movies.splice(index, 1);
    res.status(204).send();
};

const getMovieReviews = (req, res) => {
    const { id } = req.params;
    const movie = movies.find((m) => m.id === parseInt(id));
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie.reviews);
};

const createMovieReview = (req, res) => {
    const { id } = req.params;
    const { content, rating } = req.body;
    if (!content || rating === undefined) {
        return res.status(400).json({ error: 'Content and rating are required' });
    }

    const movie = movies.find((m) => m.id === parseInt(id));
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    const newReview = {
        id: nextReviewId++,
        content,
        rating,
    };
    movie.reviews.push(newReview);
    res.status(201).json(newReview);
};

module.exports = {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieReviews,
    createMovieReview 
};



