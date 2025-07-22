import express from 'express';
import upload from '../utils/multer.js';

const router = express.Router();

router.post('/', upload.single('file'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({
            status: 'error',
            message: 'No file uploaded'
        });
    }
    const url = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    res.json({
        status: 'success',
        url,
        message: 'File uploaded successfully'
    });
});

export default router;
