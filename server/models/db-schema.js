const mongoose = require("mongoose")

// Schema Definitions

const mapId = {
    toJSON: {
        virtuals: true,
        transform: function (doc, ret) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
            return ret
        }
    }
}

const FileSchema = new mongoose.Schema({
    filename: String,
    originalname: String,
    path: String,
    mimetype: String,
    size: Number,
    uploadedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    uploadedAt: {
        type: Date,
        default: Date.now
    }
}, mapId)

const UserSchema = new mongoose.Schema({
    name: String,
    imageUrl: String,
    role: String,
    email: String
}, mapId)

const TaskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: {
        type: String,
        enum: ['Incomplete', 'To Do', 'Doing', 'Under Review', 'Completed'],
        default: 'Incomplete'
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    assignee: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    collaborators: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    commentsCount: Number,
    timeEstimate: Number,
    points: Number,
    createdAt: {
        type: Date,
        default: Date.now
    },
    dueDate: Date,
    attachments: [{
        name: String,
        url: String
    }],
    tags: [String],
    priority: {
        type: String,
        enum: ['Low', 'Medium', 'High'],
        default: 'Medium'
    },
    files: [FileSchema],
}, mapId)



const User = mongoose.model('User', UserSchema)
const Task = mongoose.model('Task', TaskSchema)

module.exports = { User, Task }