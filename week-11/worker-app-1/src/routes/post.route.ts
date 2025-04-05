import { Hono } from 'hono';
import authMiddleware from '../middlewares/auth.middleware';

import {
  createPost,
  deletePost,
  getPost,
  getPosts,
  getUserPosts,
  updatePost,
} from '../controllers/post.controller';

const router = new Hono();

router.get('/all-posts', getPosts); // Get all posts

router.get('/posts', authMiddleware, getUserPosts); // Get user specific posts (protected)
router.post('/', authMiddleware, createPost); // Create post (protected)
router.get('/:id', authMiddleware, getPost); // Get a specific post (protected)
router.put('/:id', authMiddleware, updatePost); // Update an existing post (protected)
router.delete('/:id', authMiddleware, deletePost); // Delete an existing post (protected)

export default router;
