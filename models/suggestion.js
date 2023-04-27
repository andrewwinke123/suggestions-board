import mongoose from 'mongoose'

const Schema = mongoose.Schema

const commentSchema = mongoose.Schema({
	content: {type: String, required: true},
	author: { type: Schema.Types.ObjectId, ref: "Profile" }
})

const suggestionSchema = new Schema({
	name: {type: String, required: true},
	passive: Boolean,
	owner: { type: Schema.Types.ObjectId, ref: "Profile" },
	comments: [commentSchema]
}, {
	timestamps: true
})

const Suggestion = mongoose.model('Suggestion', suggestionSchema)

export {
	Suggestion
}