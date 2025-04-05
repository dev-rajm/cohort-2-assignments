import { Hono } from 'hono';
import { cors } from 'hono/cors';
import rootRoute from './routes/index.route';

const app = new Hono();

app.use(cors());

app.route('/api/v1', rootRoute); // Root route

export default app;
