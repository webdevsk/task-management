
const express = require("express")
const upload = require("../config/multer")
const { uploadFiles, getFile, deleteFile } = require("../controllers/file-controller")
const { getAllTasks, getTasksByStatus, getTasksById, createNewTask, updateTask, deleteTask } = require("../controllers/task-controller")
const multer = require("multer")

const apiRouter = express.Router()

// API Routes

// Get all tasks with populated user references
apiRouter.get('/tasks', getAllTasks)

// Get tasks by status
apiRouter.get('/tasks/status/:status', getTasksByStatus)

// Get task by ID
apiRouter.get('/tasks/:id', getTasksById)

// Create new task
apiRouter.post('/tasks', createNewTask)

// Update task
apiRouter.put('/tasks/:id', updateTask)

// Delete task
apiRouter.delete('/tasks/:id', deleteTask)


// Route to upload files to a specific task
apiRouter.post('/tasks/:taskId/files', upload.array('files', 5), uploadFiles)

// Route to get file
apiRouter.use('/files/:filename', getFile)

// Route to delete file
apiRouter.delete('/tasks/:taskId/files/:filename', deleteFile)


// Error handling middleware for multer
apiRouter.use((error, req, res, next) => {
    if (error instanceof multer.MulterError) {
        if (error.code === 'LIMIT_FILE_SIZE') {
            return res.status(400).json({ error: 'File size too large. Max size is 5MB.' })
        }
        return res.status(400).json({ error: error.message })
    } else if (error) {
        return res.status(400).json({ error: error.message })
    }
    next()
})

module.exports = apiRouter