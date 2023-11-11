const Joi = require('joi');
const mongoose = require('mongoose')

const lostFoundSchema = new mongoose.Schema({
  item: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
//   admin: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  createdAt: {
    type: Date,
    default:Date.now()
  }
});

const LostFound = mongoose.model('LostFound', lostFoundSchema)

const lostAndFoundValidater = lostFound => {
    const lostFoundValidationSchema = Joi.object({
        item: Joi.string().required().min(5),
        description: Joi.string().required().min(10),
      })

    return Joi.validate(lostFound,lostFoundValidationSchema)
}

exports.LostFound = LostFound
exports.validate = lostAndFoundValidater