import express from 'express';
import { getFeaturedResources, getsuggestions } from '../featured/featured.controller.js';

const router = express.Router();

router.get('/', getFeaturedResources);
router.get('/suggestions', getsuggestions);

export default router;
