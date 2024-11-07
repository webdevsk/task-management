const { Task } = require("../models/db-schema")

exports.getAllTasks = async (req, res) => {
    try {
        const tasks = await Task.find()
            .populate('client', 'name imageUrl')
            .populate('assignee', 'name imageUrl')
            .populate('collaborators', 'name imageUrl')
            .populate('files')
            .sort({ createdAt: -1 })
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' })
    }
}

exports.getTasksByStatus = async (req, res) => {
    try {
        const tasks = await Task.find({ status: req.params.status })
            .populate('client', 'name imageUrl')
            .populate('assignee', 'name imageUrl')
            .populate('collaborators', 'name imageUrl')
            .populate('files')
        res.json(tasks)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching tasks' })
    }
}

exports.getTasksById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('client', 'name imageUrl')
            .populate('assignee', 'name imageUrl')
            .populate('collaborators', 'name imageUrl')
            .populate('files')
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.json(task)
    } catch (error) {
        res.status(500).json({ error: 'Error fetching task' })
    }
}

exports.createNewTask = async (req, res) => {
    try {
        const task = new Task(req.body)
        await task.save()
        const populatedTask = await Task.findById(task._id)
            .populate('client', 'name imageUrl')
            .populate('assignee', 'name imageUrl')
            .populate('collaborators', 'name imageUrl')
        res.status(201).json(populatedTask)
    } catch (error) {
        res.status(500).json({ error: 'Error creating task' })
    }
}

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        ).populate('client assignee collaborators', 'name imageUrl')
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.json(task)
    } catch (error) {
        res.status(500).json({ error: 'Error updating task' })
    }
}

exports.deleteTask = async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id)
        if (!task) {
            return res.status(404).json({ error: 'Task not found' })
        }
        res.json({ message: 'Task deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: 'Error deleting task' })
    }
}
