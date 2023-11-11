const exp = require('constants');
const mongoose = require('mongoose')

const jobAndInternshipsSchema = new mongoose. Schema({
 
  title: {
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
  },
  applicationLink: {
    type: String,
    required: true
  }
});

const JobAndInternship = mongoose.model('JobAndInternship', jobSchema)

const JobAndInternshipsValidater = jobAndInternship => {
    const jobAndInternshipsValidationSchema = Joi.object({
        title: Joi.string().required().min(5),
        description: Joi.string().required().min(10),
        createdAt: Joi.date().iso().required(),
        applicationLink: Joi.string().uri().required()
      })

    return Joi.validate(jobAndInternship,jobAndInternshipsValidationSchema)
}

exports.JobAndInternship = JobAndInternship
exports.validate = JobAndInternshipsValidater