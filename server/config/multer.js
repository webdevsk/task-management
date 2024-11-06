const multer = require('multer')
const path = require('path')
const crypto = require('crypto')

// Configure multer for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/')
    },
    filename: (req, file, cb) => {
        // Generate unique filename using timestamp and random string
        const uniqueSuffix = Date.now() + '-' + crypto.randomBytes(6).hexSlice()
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
})

// File filter function
const fileFilter = (req, file, cb) => {
    // Define allowed file types
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'image/gif',
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ]

    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true)
    } else {
        cb(new Error('Invalid file type. Only images, PDFs, and Office documents are allowed.'))
    }
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
})

module.exports = upload