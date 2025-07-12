import { Hono } from 'hono'
import { serve } from '@hono/node-server'

const app = new Hono()

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

const port = parseInt(process.env.PORT || '3000')

console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})