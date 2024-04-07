const express = require('express');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const VideoPath = path.join(__dirname, '..', 'data', 'videos.json');

const readVideos = () => {
    return JSON.parse(fs.readFileSync(VideoPath, 'utf8'));
};

const writeVideos = (data) => {
    fs.writeFileSync(VideoPath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    const videos = readVideos();
    const listVideos = videos.map(({id, title, image}) => ({id, title, image}));
    res.json(listVideos);
});

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const videos = readVideos();
    const video = videos.find(video => video.id === id);
    if (video) {
        res.json(video);
    }   else {
        res.status(404).send('Video not found')
    }
});

router.post('/', (req, res) => {
    const { title, description = '', channel = 'Unknown' } = req.body;
    const videos = readVideos();
    const newVideo = {
        id: uuidv4(),
        title,
        description,
        image: 'http://localhost:8080/images/Upload-video-preview.jpg',
    }
    videos.push(newVideo);
    writeVideos(videos);
    res.status(201).json(newVideo);
});

module.exports = router;