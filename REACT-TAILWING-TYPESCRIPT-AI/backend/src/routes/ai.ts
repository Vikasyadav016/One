import { Router } from 'express'
import OpenAI from 'openai'

const router = Router()
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY })

router.post('/suggest', async (req, res) => {
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'Missing text' })

  const prompt = `Improve the following resume bullet or summary with professional ATS-friendly wording:\n\n${text}`
  const response = await openai.responses.create({
    model: 'gpt-4o-mini',
    input: prompt,
    max_output_tokens: 180
  })

  const improved = Array.isArray(response.output) ? response.output.map((item: any) => item.content).join(' ') : (response.output?.[0]?.content ?? '')
  res.json({ improved })
})

export default router
