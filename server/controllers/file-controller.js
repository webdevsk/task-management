const { Task } = require('../models/db-schema')

const fs = require('fs').promises
const path = require('path')

exports.uploadFiles = async (req, res) => {
    try {
        const taskId = req.params.taskId
        // const uploadedBy = req.body.uploadedBy // This should come from authenticated user session
        // Find the task
        const task = await Task.findById(taskId)
        console.log(task)
        if (!task) {
            // Delete uploaded files if task doesn't exist
            await Promise.all(req.files.map(file =>
                fs.unlink(file.path).catch(console.error)
            ))
            return res.status(404).json({ error: 'Task not found' })
        }

        // Create file documents
        const fileDocuments = req.files.map(file => ({
            filename: file.filename,
            originalname: file.originalname,
            path: file.path,
            mimetype: file.mimetype,
            size: file.size,
            // uploadedBy: uploadedBy,
            uploadedAt: new Date()
        }))

        // Add files to task
        task.files.push(...fileDocuments)
        await task.save()

        res.status(200).json({
            message: 'Files uploaded successfully',
            files: fileDocuments
        })
    } catch (error) {
        console.error(error)
        // Delete uploaded files if there's an error
        if (req.files) {
            await Promise.all(req.files.map(file =>
                fs.unlink(file.path).catch(console.error)
            ))
        }
        res.status(500).json({ error: 'Error uploading files' })
    }
}

exports.getFile = async (req, res) => {
    try {
        const filename = req.params.filename
        const filepath = path.join(__dirname, 'uploads', filename)

        // Check if file exists
        await fs.access(filepath)

        // Send file
        res.sendFile(filepath)
    } catch (error) {
        res.status(404).json({ error: 'File not found' })
    }
}


exports.deleteFile = async (req, res) => {
    try {
        const { taskId, filename } = req.params

        // Find task and remove file reference
        const task = await Task.findById(taskId)
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }

        const fileIndex = task.files.findIndex(file => file.filename === filename)
        if (fileIndex === -1) {
            return res.status(404).json({ error: 'File not found in task' })
        }

        // Remove file from filesystem
        const filepath = path.join(__dirname, 'uploads', filename)
        await fs.unlink(filepath)

        // Remove file from task
        task.files.splice(fileIndex, 1)
        await task.save()

        res.json({ message: 'File deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting file' })
    }
}