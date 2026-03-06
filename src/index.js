
const express = require('express');
const cors = require('cors');
const v1Router = require('./routes/v1.router');
const logger = require('./utils/logger');
const finalErrorHandler = require('./middlewares/final.error.middleware');
const PORT = 3000;

const app = express();

app.use(cors());
app.use(express.json());

app.use('/v1', v1Router);

app.use(finalErrorHandler);


app.listen(PORT, () => {
    logger.info(`server listening on port ${PORT}`);
});

