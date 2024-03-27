// src/routes/listRoutes.ts
import express from 'express';
import { listVideos } from '../controllers/listController';

const router = express.Router();

router.get('/list', listVideos);

export default router;
