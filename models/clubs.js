const mongoose = require('mongoose')
const Joi = require('joi')

const clubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  members: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  admin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  group: {
    chat: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Message'
    }],
    polls: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Poll'
    }],
    calendar: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Event'
    }]
  }
})

const Club = mongoose.model('Club', clubSchema)

const clubValidator = (club) => {
    const clubValidationSchema = Joi.object({
      name: Joi.string().required().min(5),
      members: Joi.array().items(Joi.string().required()),
      admin: Joi.string().required(),
    })
  
    return Joi.validate(club, clubValidationSchema);
  };

exports.Club = Club
exports.validate = clubValidator