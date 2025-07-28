import express from 'express';
import { getFeaturedResources, getsuggestions, getBundles } from '../featured/featured.controller.js';

const router = express.Router();

router.get('/', getFeaturedResources);
router.get('/suggestions', getsuggestions);
router.get('/bundles', getBundles);
export default router;
