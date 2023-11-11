const exp = require('constants');
const mongoose = require('mongoose')
const Joi = require('joi')

const jobAndInternshipsSchema = new mongoose. Schema({
 
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  profilePicture: {
    type: Buffer,
    required: false,
    default:null,
  },
//   admin: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   },
  createdAt: {
    type: Date,
    default:Date.now()
  },
  applicationLink: {
    type: String,
    required: true
  }
});

const JobAndInternship = mongoose.model('JobAndInternship', jobAndInternshipsSchema)

const JobAndInternshipsValidater = jobAndInternship => {
    const jobAndInternshipsValidationSchema = Joi.object({
        title: Joi.string().required().min(5),
        description: Joi.string().required().min(10),
        applicationLink: Joi.string().uri().required()
      })

    return Joi.validate(jobAndInternship,jobAndInternshipsValidationSchema)
}

exports.JobAndInternship = JobAndInternship
exports.validate = JobAndInternshipsValidater