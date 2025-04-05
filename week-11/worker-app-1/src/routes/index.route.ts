import { Hono } from 'hono';
import userRoute from './user.route';
import postRoute from './post.route';

const router = new Hono();

router.route('/user', userRoute); // Handle all user routes
router.route('/posts', postRoute); // Handle all post routes

export default router;
