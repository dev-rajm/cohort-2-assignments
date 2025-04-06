import { Hono } from 'hono';
import { getPostByTag, getTags } from '../controllers/tag.controller';

const router = new Hono();

router.get('/tags', getTags);
router.get('/getPost/:tag', getPostByTag);

export default router;
