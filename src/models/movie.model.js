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

module.exports = movies;