const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const videoDetailsPath = path.join(__dirname, '..', 'data', 'video-details.json');
const videoPath = path.join(__dirname, '..', 'data', 'videos.json');
const {v4: uuidv4} = require('uuid');

const readVideos = (filePath) => JSON.parse(fs.readFileSync(filePath));
const writeVideos = (filePath, data) => fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

router.post('/', (req, res) => {
    const { title, description } = req.body;

    const newVideo = {
        id: uuidv4(),
        title, 
        description, 
        channel: 'Placeholder channel',
        image: '/images/Upload-video-preview.jpg',
        views: '0',
        likes: '0',
        duration: '0:00',
        video: 'Placeholder video',
        timestamp: Date.now(),
        comments: []
    };

    const videoDetails = readVideos(videoDetailsPath);
    videoDetails.push(newVideo);
    writeVideos(videoDetailsPath, videoDetails);

    const videos = readVideos(videoPath);
    videos.push({ id: newVideo.id, title: newVideo.title, channel: newVideo.channel, image: newVideo.image })
    writeVideos(videoPath, videos);

    res.status(201).json({ message: 'Video uploaded'});
});

module.exports = router;