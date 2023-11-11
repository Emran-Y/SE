const mongoose = require('mongoose')
const Joi = require('joi')

const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required:true

  },
  content: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  announcementId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Announcement',
    required:true
  }
})

const Comment = mongoose.model('Comment', commentSchema)

const commentValidator = comment => {
    
    const commentValidationSchema = Joi.object({
        userId: Joi.string().required(),
        content: Joi.string().required().min(1).max(200),
        announcementId: Joi.string().required()
    })

    return Joi.validate(comment,commentValidationSchema)

}

exports.Comment = Comment
exports.commentValidate = commentValidator