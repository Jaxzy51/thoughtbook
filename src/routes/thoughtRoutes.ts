import { Router, Request, Response } from 'express';
import thoughtController from '../controllers/thoughtController.js';

const router = Router();

// Middleware to wrap async controller methods
const asyncHandler = (fn: any) => (req: Request, res: Response, next: any) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// /api/thoughts
router.route('/')
  .get(asyncHandler(thoughtController.getThoughts))
  .post(asyncHandler(thoughtController.createThought));

// /api/thoughts/:thoughtId
router.route('/:thoughtId')
  .get(asyncHandler(thoughtController.getSingleThought))
  .put(asyncHandler(thoughtController.updateThought))
  .delete(asyncHandler(thoughtController.deleteThought));

// /api/thoughts/:thoughtId/reactions
router.route('/:thoughtId/reactions')
  .post(asyncHandler(thoughtController.addReaction));

// /api/thoughts/:thoughtId/reactions/:reactionId
router.route('/:thoughtId/reactions/:reactionId')
  .delete(asyncHandler(thoughtController.removeReaction));

export default router;
