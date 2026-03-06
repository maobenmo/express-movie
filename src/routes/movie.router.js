const { Router } = require('express');
const {
    getAllMovies,
    getMovieById,
    createMovie,
    updateMovie,
    deleteMovie,
    getMovieReviews,
    createMovieReview 
} = require('../controllers/movie.controller');

const movieRouter = Router();

movieRouter.post('/', createMovie);
movieRouter.get('/', getAllMovies);
movieRouter.get('/:id', getMovieById);
movieRouter.put('/:id', updateMovie);
movieRouter.delete('/:id', deleteMovie);

movieRouter.post('/:id/reviews', createMovieReview);
movieRouter.get('/:id/reviews', getMovieReviews);

module.exports = movieRouter;