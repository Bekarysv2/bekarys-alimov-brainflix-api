const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const videoRoutes = require('./routes/video')
require('dotenv').config();

const port = process.env.PORT || 8080;

app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'public', 'images')));

app.use('/videos', videoRoutes);

app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});