const mongoose = require('mongoose')
const Joi = require('joi')

const announcementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 5
  },
  content: {
    type: String,
    minlength: 10,
    required: true
  },
//   admin: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  reactions: {
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  announcementPicture: {
    type: Buffer,
    default: null,
    required: false
  }
});

const Announcement = mongoose.model('Announcement', announcementSchema)


const annoucementValidater =  annoucement => {
    const announcementValidationSchema = Joi.object({
        title: Joi.string().required().min(5),
        content: Joi.string().required().min(10),
      });
    return Joi.validate(annoucement,announcementValidationSchema)
}


exports.Announcement = Announcement
exports.validate = annoucementValidater