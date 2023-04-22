import mongoose from 'mongoose'

const Schema = mongoose.Schema

const suggestionSchema = new Schema({
  name: String,
  passive: Boolean,
  owner: {type: Schema.Types.ObjectId, ref: "Profile"},
  // comment: [commentSchema]
}, {
  timestamps: true
})

const Suggestion = mongoose.model('Suggestion', suggestionSchema)

export {
  Suggestion
}