const mongoose = require('mongoose')
const Joi = require('joi');


const userSchema = new mongoose.Schema({
  universityId: {
    type: String,
    required: true
  },
  fullName: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  },
  fieldOfStudy: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 5,
    maxlength: 255
  },
  isAdmin: {
    type: Boolean,
    default: false
  },
  clubAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club',
    default:null
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 1024
  },
  profilePicture: {
    type: Buffer,
    required: false,
    default:null,
  },
  activities: {
    likes: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Announcement'
    }],
    comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }]
  },
  clubMemberships: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Club'
  }],
  pendingClubRequests: [{
    clubId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Club'
    },
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected']
    }
  }],
  votedPolls: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Poll'
  }]
});

const User = mongoose.model('User', userSchema)

const userValidator = (user) => {
  const userValidationSchema = Joi.object({
    universityId: Joi.string().required(),
    fullName: Joi.string().min(5).max(50).required(),
    fieldOfStudy: Joi.string().required(),
    email: Joi.string().email().min(5).max(255).required(),
    password: Joi.string().min(8).max(255).required(),
    profilePicture: Joi.binary().optional(),
  });

  return Joi.validate(user, userValidationSchema);
};



exports.User = User
exports.validate = userValidator