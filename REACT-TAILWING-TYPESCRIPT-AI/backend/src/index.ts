import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import authRouter from './routes/auth.js'
import resumesRouter from './routes/resumes.js'
import uploadRouter from './routes/upload.js'
import aiRouter from './routes/ai.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(bodyParser.json())
app.use('/api/auth', authRouter)
app.use('/api/resumes', resumesRouter)
app.use('/api/upload', uploadRouter)
app.use('/api/ai', aiRouter)

const MONGODB_URI = process.env.MONGODB_URI ?? 'mongodb://localhost:27017/resume-maker'
mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err))

const port = Number(process.env.PORT ?? 4000)
app.listen(port, () => {
  console.log(`Backend running at http://localhost:${port}`)
})
