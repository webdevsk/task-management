// Required dependencies
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const fs = require('fs').promises
require('dotenv').config()
const path = require('path')
const apiRouter = require('./routes/api.route')
const createSampleData = require('./utils/create-sample-data')
const args = process.argv.slice(2)
const dbUri = process.env.DATABASE_URL
if (!dbUri) throw new Error("Please populate .env file")

// Ensure uploads directory exists
const uploadsDir = path.join(__dirname, 'uploads')
fs.mkdir(uploadsDir, { recursive: true }).catch(console.error)

const app = express()


// Middleware
app.use(cors())
app.use(express.json())

// MongoDB connection
mongoose.connect(dbUri)

app.use('/api', apiRouter)

app.use((req, res) => res.status(404).json({ message: `No endpoints found at: ${req.originalUrl}` }))

// Initialize server
const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    createSampleData({ force: args.includes("--reset-database") }) // Create sample data when server starts
})
