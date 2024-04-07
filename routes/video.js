const express = require('express');
const {v4: uuidv4} = require('uuid');
const fs = require('fs');
const router = express.Router();
const path = require('path');
const videoPath = path.join(__dirname, '..', 'data', 'videos.json');

const readVideos = () => {
    return JSON.parse(fs.readFileSync(videoPath));
};

const writeVideos = (data) => {
    fs.writeFileSync(videoPath, JSON.stringify(data, null, 2));
};

router.get('/', (req, res) => {
    const videos = readVideos();
    const listVideos = videos.map(video => ({
        id: video.id, 
        title: video.title, 
        channel: video.channel, 
        image: video.image 
    }));
    res.json(listVideos);
});

router.post('/', (req, res) => {
    const { title, channel, image } = req.body;
    const videos = readVideos();
    const newVideo = {
        id: uuidv4(),
        title,
        channel,
        image
    }
    videos.push(newVideo);
    writeVideos(videos);
    
    res.status(201).json(newVideo);
});

module.exports = router;