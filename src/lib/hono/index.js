import { Hono } from 'hono';
import { orgRoutes } from './routes/organizations';

export const app = new Hono().basePath('/api')

// app.get('/hello', (c) => {
//     return c.json({
//       message: 'Hello from Hono!',
//     })
//   })

app.route('/organizations', orgRoutes)

app.notFound((c) => c.json({ message: "Not Found", ok: false }, 404));