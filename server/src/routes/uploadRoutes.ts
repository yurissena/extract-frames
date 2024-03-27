// src/routes/uploadRoutes.ts
import express from 'express';
import { uploadVideo } from '../controllers/uploadController';

const router = express.Router();

router.post('/upload', uploadVideo);

export default router;
