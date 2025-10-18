require('dotenv').config()
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const { initializeFirebase } = require('./config/firebase')

const app = express()
const PORT = process.env.PORT || 5000

// Initialize Firebase
initializeFirebase()

// CORS configuration
const corsOptions = {
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))

// Body parser middleware - BUT NOT for webhook routes
// Webhooks need raw body for signature verification
app.use((req, res, next) => {
  if (req.originalUrl === '/webhooks/stripe') {
    next()
  } else {
    bodyParser.json()(req, res, next)
  }
})

app.use(bodyParser.urlencoded({ extended: true }))

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Black Therapy Server is running',
    timestamp: new Date().toISOString(),
  })
})

// API Routes
app.use('/api/stripe', require('./routes/stripe'))
app.use('/webhooks', require('./routes/webhooks'))

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    error: 'Internal server error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong',
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    error: 'Not found',
    message: `Route ${req.originalUrl} not found`,
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`)
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`🌐 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:3000'}`)
  console.log(`💳 Stripe configured: ${process.env.STRIPE_SECRET_KEY ? 'Yes' : 'No'}`)
})

module.exports = app
