import { Hono } from 'hono';
import { getPostByTag, getTags } from '../controllers/tag.controller';

const router = new Hono();

router.get('/tags', getTags); // Get all tags
router.get('/getPost/:tag', getPostByTag); // Get posts by tag names

export default router;
