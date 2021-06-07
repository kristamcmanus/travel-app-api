const mongoose = require('mongoose')
const commentSchema = require('./comment')
const tourSchema = new mongoose.Schema({
  city: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  host: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  comments: [commentSchema],
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
},
{
  timestamps: true
})
module.exports = mongoose.model('Tour', tourSchema)

// const mongoose = require('mongoose')
//
// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true
//   },
//   description: {
//     type: String,
//     required: true
//   },
//   date: {
//     type: String,
//     required: true
//   },
//   owner: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }
// }, {
//     timestamps: true
// })
//
// module.exports = mongoose.model('Tour', tourSchema)
