// import our express library
const express = require('express')

// creating a router for this file
const router = express.Router()

// require the Tour model so we can interact with our database
const Tour = require('../models/tour')

// require our function to handle 404 errors
const handle404 = require('../../lib/custom_errors')

const passport = require('passport')

const requireToken = passport.authenticate('bearer', { session: false })

router.post('/comments', requireToken, (req, res, next) => {
  // extract the comment from the request's data (body)
  const commentData = req.body.comment
  commentData.owner = req.user.id

  // extract the tourId from the comment data
  const tourId = commentData.tourId

  // find the tour by its id
  Tour.findById(tourId)
    .then(handle404)
    .then(tour => {
      // create a new comment in the comments subdocument array using the
      // request's commentData
      tour.comments.push(commentData)

      // save the tour (which saves the new comment)
      return tour.save()
    })
    // responding with the updated tour that includes our new comment
    .then(tour => res.status(201).json({ tour }))
    .catch(next)
})

router.delete('/comments/:commentId', requireToken, (req, res, next) => {
  // extract the comment's id from the url
  const commentId = req.params.commentId

  // extracting the tour's id from the incoming request's data
  const tourId = req.body.comment.tourId

  Tour.findById(tourId)
    .then(handle404)
    .then(tour => {
      // select the comment subdocument with the id `commentId` (tour.comments.id(commentId))
      // then remove it (delete it)
      tour.comments.id(commentId).remove()

      // save our deletion
      return tour.save()
    })
    // if successfully deleted, respond with 204 No Content
    .then(() => res.sendStatus(204))
    .catch(next)
})

router.patch('/comments/:commentId', requireToken, (req, res, next) => {
  const commentId = req.params.commentId

  // extract the comment data from our request's body
  const commentData = req.body.comment
  const tourId = commentData.tourId

  Tour.findById(tourId)
    .then(handle404)
    .then(tour => {
      // select the comment with the id `commentId`
      const comment = tour.comments.id(commentId)

      // update our comment, with the incoming request's data (commentData)
      comment.set(commentData)
      // save our changes, by saving the tour
      return tour.save()
    })
    .then(() => res.sendStatus(204))
})

// exporting our router, so we can register (mount) our router
module.exports = router
