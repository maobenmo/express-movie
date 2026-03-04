const express = require('express');

const movies = [
    {
        id: 1,
        title: 'Inception',
        description: 'A skilled thief steals secrets from dreams.',
        types: ['Sci-Fi'],
        averageRating: 4.5,
        reviews: [
            { id: 1, content: 'Amazing movie!', rating: 5 },
            { id: 2, content: 'Great visuals.', rating: 4 },
        ],
    },
    {
        id: 2,
        title: 'The Matrix',
        description: 'A computer hacker learns about the true nature of his reality.',
        types: ['Action'],
        averageRating: 4.7,
        reviews: [
            { id: 3, content: 'Amazing movie!', rating: 5 },
            { id: 4, content: 'Great visuals.', rating: 4 },
        ],
    },
];
let nextMovieId = 3;
let nextReviewId = 5;

const app = express();

app.get('/v1/movies', (req, res) => {
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
});

app.get('/v1/movies/:id', (req, res) => {
    const { id } = req.params;
    const movie = movies.find((m) => m.id === parseInt(id));    

    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    res.json(movie);
});

app.post('/v1/movies', express.json(), (req, res) => {
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
});

app.put('/v1/movies/:id', express.json(), (req, res) => {
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
});

app.delete('/v1/movies/:id', (req, res) => {
    const { id } = req.params;
    const index = movies.findIndex((m) => m.id === parseInt(id));
    if (index === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    movies.splice(index, 1);
    res.status(204).send();
});

app.get('/v1/movies/:id/reviews', (req, res) => {
    const { id } = req.params;
    const movie = movies.find((m) => m.id === parseInt(id));
    if (!movie) {
        return res.status(404).json({ error: 'Movie not found' });
    }
    res.json(movie.reviews);
});

app.post('/v1/movies/:id/reviews', express.json(), (req, res) => {
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
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});