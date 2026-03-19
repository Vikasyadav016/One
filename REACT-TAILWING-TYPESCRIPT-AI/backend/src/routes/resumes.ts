import { Router } from 'express'
import { ResumeModel } from '../models/Resume.js'

const router = Router()

router.get('/', async (req, res) => {
  const { userId } = req.query
  if (!userId) return res.status(400).json({ error: 'Missing userId' })
  const resumes = await ResumeModel.find({ userId }).sort({ updatedAt: -1 })
  res.json({ resumes })
})

router.post('/', async (req, res) => {
  const { userId, templateId, data, title } = req.body
  if (!userId || !templateId || !data) return res.status(400).json({ error: 'Missing fields' })
  const saved = await ResumeModel.create({ userId, templateId, data, title })
  res.status(201).json({ resume: saved })
})

router.put('/:id', async (req, res) => {
  const { id } = req.params
  const updated = await ResumeModel.findByIdAndUpdate(id, req.body, { new: true })
  if (!updated) return res.status(404).json({ error: 'Not found' })
  res.json({ resume: updated })
})

router.delete('/:id', async (req, res) => {
  await ResumeModel.findByIdAndDelete(req.params.id)
  res.status(204).send()
})

export default router
