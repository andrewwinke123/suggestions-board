import mongoose from 'mongoose'
import { isLoggedIn } from '../middleware/middleware.js'

const Schema = mongoose.Schema

const commentSchema = mongoose.Schema( {
  content: String,
  author: { type: Schema.Types.ObjectId, ref: "Profile"}
})



const suggestionSchema = new Schema({
  name: String,
  passive: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  comment: [commentSchema]
}, {
  timestamps: true
})

const Suggestion = mongoose.model('Suggestion', suggestionSchema)

export {
  Suggestion
}