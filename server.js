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
];
let nextMovieId = 1;
let nextReviewId = 1;

const app = express();

app.get('/v1/movies', (req, res) => {
  res.send('Hello World!');
});



app.listen(3000, () => {
  console.log('Server is running on port 3000');
});