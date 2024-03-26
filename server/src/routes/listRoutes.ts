// src/routes/listRoutes.ts
import express from 'express';
import { listVideos } from '../controllers/listController';

const router = express.Router();

router.get('/', listVideos);

export default router;
