
const express      = require('express')
const cors         = require('cors')
require('dotenv').config()

const { initDB }       = require('./db')
const contactRouter    = require('./routes/contact')

const app  = express()
const PORT = process.env.PORT || 3000


app.use(cors({
  origin:  process.env.CLIENT_URL || 'http://localhost:5173',
  methods: ['GET', 'POST', 'DELETE'],
}))

app.use(express.json())

app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`)
  next() 
})


app.use('/api/contact', contactRouter)

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})


app.use((_req, res) => {
  res.status(404).json({ success: false, message: 'Route not found.' })
})


app.use((err, _req, res, _next) => {
  console.error('Unhandled error:', err)
  res.status(500).json({ success: false, message: 'Internal server error.' })
})


;(async () => {
  await initDB()          
  app.listen(PORT, () => {  
    console.log(`🚀 Server running at http://localhost:${PORT}`)
    console.log(`📋 Endpoints:`)
    console.log(`   POST   http://localhost:${PORT}/api/contact`)
    console.log(`   GET    http://localhost:${PORT}/api/contact`)
    console.log(`   DELETE http://localhost:${PORT}/api/contact/:id`)
    console.log(`   GET    http://localhost:${PORT}/api/health`)
  })
})()


process.on('SIGINT', () => {
  console.log('\n👋 Server shutting down...')
  process.exit(0)
})
