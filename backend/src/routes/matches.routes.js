import express from 'express';

import { matchController } from '../controllers/matchController.js';
import {
  validateMatchQuery,
  validateSearchQuery,
} from '../middleware/validate.js';

const router = express.Router();

router.get('/search', validateSearchQuery, matchController.search);
router.get('/', validateMatchQuery, matchController.getMatches);
router.get('/:id', matchController.getById);
router.get('/:id/related', matchController.getRelated);

export default router;
