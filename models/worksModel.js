const mongoose = require('mongoose')
const Schema = mongoose.Schema

const WorkSchema = new Schema({
    name_work: {
        type: String,
        required: true

    },
    date_work: [
        {
            hours: { type: Number, required: true },
            minutes: { type: Number, required: true },

        }
    ],
    notification: {
        type: String,
        required: true

    },
    status: {
        type: Boolean
    },
    startAt: {
        type: String
    },
    timeRemain: {
        type: Number
    },
    statusFinised: {
        type: Boolean
    },
    endWork: {
        type: Boolean

    },
    scores: {
        type: Number
    },
    type_work: {
        type: String,
        required: true

    },
    dateWorkToday: {
        type: String
    },
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'users'
    }
})
module.exports = mongoose.model('works', WorkSchema)