const bodyParser = require('body-parser');
const express = require('express');
const path = require('path');
const app = express();
const cors = require('cors');
const videoRoutes = require('./routes/video')
const videoDetailsRoutes = require('./routes/video-details');
const uploadRoutes = require('./routes/upload');
require('dotenv').config();

const port = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

app.use('/videos', videoRoutes);
app.use('/videos', videoDetailsRoutes);
app.use('/upload', uploadRoutes);


app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});