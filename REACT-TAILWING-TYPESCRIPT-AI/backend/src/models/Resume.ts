import mongoose from 'mongoose'

const ResumeSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  templateId: { type: String, required: true },
  title: { type: String, default: 'Untitled' },
  data: { type: mongoose.Schema.Types.Mixed, required: true }
}, {
  timestamps: true
})

export const ResumeModel = mongoose.model('Resume', ResumeSchema)
