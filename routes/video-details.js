const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();
const videoDetailsPath = path.join(__dirname, '..', 'data', 'video-details.json');

const readVideoDetails = () => {
    return JSON.parse(fs.readFileSync(videoDetailsPath));
}

router.get('/:id', (req, res) => {
    const { id } = req.params;
    const videoDetails = readVideoDetails();
    const video = videoDetails.find(video => video.id === id);

    if (!video) {
        return res.status(404).json({ message: "No video found"});
    }

    res.json(video);
});

module.exports = router;