const express = require('express')
const router = express.Router()
const {Announcement,validate} = require('../models/announcements')
const {User} = require('../models/users')
const {commentValidate,Comment} = require('../models/comment')




// All announcemnts Reader or getter

router.get('/',async (req,res) => {
    const announcements = await Announcement.find()
    res.json(announcements)
})


// announcement poster

router.post('/', async (req,res) => {
    const {error} = validate(req.body)
    if(error){
        return res.status(400).send(error.details[0].message)
    }
    
    const announcement = await Announcement.create(req.body)

    res.json(announcement)
})

// Liking handler 

router.post('/:id/like', async (req, res) => {
    try {
      const announcementId = req.params.id
  
      const announcement = await Announcement.findById(announcementId)
  
      if (!announcement) {
        return res.status(404).json({ error: 'Announcement not found' })
      }
      
      
      const userId = req.body.userId
      const user = await User.findById(userId)
      if(!user) {
        return res.status(400).send('User Not foundS')
      }
      const likedByUser = announcement.reactions.likes.includes(userId)
  
      if (likedByUser) {
        announcement.reactions.likes = announcement.reactions.likes.filter(item => item!=userId)
        user.activities.likes = user.activities.likes.filter((item) => item!= announcementId)
      } else {
        announcement.reactions.likes.push(userId)
        user.activities.likes.push(announcementId)
      }
  
      await announcement.save()
      await user.save()
  
      return res.json(announcement)
    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Server error' })
    }
  })


//   Comment poster

router.post('/:id/comments', async (req, res) => {
    try {
      const announcementId = req.params.id
  
      const announcement = await Announcement.findById(announcementId)
  
      if (!announcement) {
        return res.status(404).json({ error: 'Announcement not found' })
      }
      
      
      const userId = req.body.userId
      const user = await User.findById(userId)
      if(!user) {
        return res.status(400).send('Something Went Wrong')
      }

      const newComment = {
        userId:userId,
        announcementId:announcementId,
        content:req.body.content
      }

      const {error} = commentValidate(newComment)

      if(error){
        return res.status(400).send(error.details[0].message)
    }
      const comment = await Comment.create(newComment)

      announcement.reactions.comments.push(comment._id)
      await announcement.save()
      user.activities.comments.push(comment._id)
      await user.save()
      res.json(comment)

    } catch (error) {
      console.error(error)
      return res.status(500).json({ error: 'Server error' })
    }
  })

//   All comment in that specific announcement getter

router.get('/:id/comments',async (req,res) => {
    const commentsInAnnouncement = await Comment.find({ announcementId: req.params.id }).select('-announcementId')
    res.json(commentsInAnnouncement)


})

module.exports= router