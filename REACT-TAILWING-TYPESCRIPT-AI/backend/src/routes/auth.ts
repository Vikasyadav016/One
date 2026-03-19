import { Router } from 'express'
import bcrypt from 'bcryptjs'
import { UserModel } from '../models/User.js'

const router = Router()

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) return res.status(400).json({ error: 'Missing fields' })
  const user = await UserModel.findOne({ email })
  if (!user || !(await bcrypt.compare(password, user.password))) return res.status(401).json({ error: 'Invalid credentials' })
  return res.json({ user: { id: user._id, name: user.name, email: user.email } })
})

router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body
  if (!name || !email || !password) return res.status(400).json({ error: 'Missing fields' })
  const existing = await UserModel.findOne({ email })
  if (existing) return res.status(409).json({ error: 'Email already exists' })
  const hashed = await bcrypt.hash(password, 10)
  const user = await UserModel.create({ name, email, password: hashed })
  return res.status(201).json({ user: { id: user._id, name: user.name, email: user.email } })
})

export default router
