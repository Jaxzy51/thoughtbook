import { Router } from 'express';
import userController from '../controllers/userController.js';
const router = Router();
// Middleware to wrap async controller methods
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
// /api/users
router.route('/')
    .get(asyncHandler(userController.getUsers))
    .post(asyncHandler(userController.createUser));
// /api/users/:userId
router.route('/:userId')
    .get(asyncHandler(userController.getSingleUser))
    .put(asyncHandler(userController.updateUser))
    .delete(asyncHandler(userController.deleteUser));
// /api/users/:userId/friends/:friendId
router.route('/:userId/friends/:friendId')
    .post(asyncHandler(userController.addFriend))
    .delete(asyncHandler(userController.removeFriend));
export default router;
