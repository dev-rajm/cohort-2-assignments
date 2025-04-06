import { Hono } from 'hono';
import userRoute from './user.route';
import postRoute from './post.route';
import tagRoute from './tag.route';

const router = new Hono();

router.route('/user', userRoute); // Handle all user routes
router.route('/posts', postRoute); // Handle all post routes
router.route('/tags', tagRoute);

export default router;
