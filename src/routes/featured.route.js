import express from 'express';
import { getFeaturedResources } from '../featured/featured.controller.js';

const router = express.Router();

router.get('/', getFeaturedResources);

export default router;
