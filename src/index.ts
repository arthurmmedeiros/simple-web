import { Hono } from 'hono'
import { serve } from '@hono/node-server'
import { corsMiddleware } from './middleware/cors';

const app = new Hono()

app.use('*', corsMiddleware);

// Health endpoint
app.get('/health', (c) => {
  return c.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    message: 'Server is running successfully'
  })
})

// Root endpoint (optional)
app.get('/', (c) => {
  return c.text('Hono Server is running!')
})

// 404 handler
app.notFound((c) => {
  return c.json({ error: 'Not Found' }, 404);
});

// Error handler
app.onError((err, c) => {
  console.error('Server error:', err);
  return c.json({ error: 'Internal Server Error' }, 500);
});

const port = parseInt(process.env.PORT || '10000')

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})