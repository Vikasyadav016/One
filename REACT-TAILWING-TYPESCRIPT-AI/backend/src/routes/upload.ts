import { Router } from 'express'
import multer from 'multer'
import pdfParse from 'pdf-parse'
import mammoth from 'mammoth'

const router = Router()
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 15 * 1024 * 1024 } })

router.post('/parse', upload.single('file'), async (req, res) => {
  if (!req.file) return res.status(400).json({ error: 'No file uploaded' })
  const mime = req.file.mimetype
  if (mime === 'application/pdf') {
    const pdf = await pdfParse(req.file.buffer)
    return res.json({ content: pdf.text })
  }
  if (['application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'application/msword'].includes(mime)) {
    const doc = await mammoth.extractRawText({ buffer: req.file.buffer })
    return res.json({ content: doc.value })
  }
  res.status(415).json({ error: 'Unsupported format' })
})

export default router
