const { User, Task } = require('../models/db-schema')
const fs = require('fs')
const path = require('path')

async function createSampleData({ force = false }) {
    try {
        // Check if data already exists in MongoDB
        const userCount = await User.countDocuments({})
        const taskCount = await Task.countDocuments({})

        // If data exists and force is not true, exit the function without creating sample data
        if ((userCount > 0 || taskCount > 0) && !force) {
            console.log('Data already exists. Skipping sample data creation.')
            return
        }

        // If force is true and data exists, delete existing data and clear the upload folder
        if (force && (userCount > 0 || taskCount > 0)) {
            await User.deleteMany({})
            await Task.deleteMany({})

            // Clear the /upload directory
            const uploadDir = path.join(__dirname, '../uploads')
            fs.readdir(uploadDir, (err, files) => {
                if (err) throw err
                for (const file of files) {
                    fs.unlink(path.join(uploadDir, file), err => {
                        if (err) throw err
                    })
                }
            })
            console.log('Existing data and upload directory cleared.')
        }

        // Create sample users
        const users = await User.create([
            {
                name: 'John Client',
                imageUrl: null,
                role: 'client',
                email: 'john@clientcorp.com'
            },
            {
                name: 'Sarah Martinez',
                imageUrl: null,
                role: 'client',
                email: 'sarah@techinc.com'
            },
            {
                name: 'David Wong',
                imageUrl: null,
                role: 'client',
                email: 'david@startupx.com'
            },
            {
                name: 'Sadik Istiak',
                imageUrl: null,
                role: 'developer',
                email: 'sadik@team.com'
            },
            {
                name: 'Alice Chen',
                imageUrl: null,
                role: 'designer',
                email: 'alice@team.com'
            },
            {
                name: 'Mike Johnson',
                imageUrl: null,
                role: 'developer',
                email: 'mike@team.com'
            },
            {
                name: 'Emma Wilson',
                imageUrl: null,
                role: 'qa',
                email: 'emma@team.com'
            },
            { name: "John Doe", role: "client", email: "john.doe@example.com" },
            { name: "Alice Smith", imageUrl: null, role: "designer", email: "alice.smith@example.com" },
            { name: "Sadik Khan", imageUrl: null, role: "developer", email: "sadik.khan@example.com" },
            { name: "Rachel Green", imageUrl: null, role: "manager", email: "rachel.green@example.com" },
            { name: "Michael Scott", imageUrl: null, role: "client", email: "michael.scott@example.com" },
            { name: "Jim Halpert", imageUrl: null, role: "developer", email: "jim.halpert@example.com" },
            { name: "Pam Beesly", imageUrl: null, role: "designer", email: "pam.beesly@example.com" },
            { name: "Dwight Schrute", imageUrl: null, role: "manager", email: "dwight.schrute@example.com" }
        ])

        // Destructure users for easier reference
        const [johnClient, sarahClient, davidClient, sadik, alice, mike, emma] = users

        // Create sample tasks
        const tasks = await Task.create([
            {
                title: 'E-commerce Homepage Redesign',
                description: 'Redesign the main homepage to improve conversion rates',
                status: 'Doing',
                client: johnClient._id,
                assignee: alice._id,
                collaborators: [sadik._id],
                commentsCount: 8,
                timeEstimate: 20,
                points: 13,
                dueDate: new Date('2024-11-20')
            },
            {
                title: 'User Authentication System',
                description: 'Implement secure user authentication with OAuth2',
                status: 'Completed',
                client: sarahClient._id,
                assignee: sadik._id,
                collaborators: [mike._id],
                commentsCount: 15,
                timeEstimate: 40,
                points: 21,
                dueDate: new Date('2024-10-30')
            },
            {
                title: 'Mobile App Testing',
                description: 'Comprehensive testing of the new mobile app features',
                status: 'Under Review',
                client: davidClient._id,
                assignee: emma._id,
                collaborators: [mike._id],
                commentsCount: 12,
                timeEstimate: 30,
                points: 13,
                dueDate: new Date('2024-11-10')
            },
            {
                title: 'Payment Gateway Integration',
                description: 'Integrate Stripe payment gateway for subscriptions',
                status: 'To Do',
                client: sarahClient._id,
                assignee: mike._id,
                commentsCount: 5,
                timeEstimate: 25,
                points: 13,
                dueDate: new Date('2024-11-25')
            },
            {
                title: 'Database Optimization',
                description: 'Optimize database queries for better performance',
                status: 'Doing',
                client: davidClient._id,
                assignee: sadik._id,
                collaborators: [mike._id],
                commentsCount: 7,
                timeEstimate: 15,
                points: 8,
                dueDate: new Date('2024-11-15')
            },
            {
                title: 'Analytics Dashboard',
                description: 'Create real-time analytics dashboard',
                status: 'Incomplete',
                client: johnClient._id,
                assignee: alice._id,
                collaborators: [sadik._id, mike._id],
                commentsCount: 3,
                timeEstimate: 35,
                points: 21,
                dueDate: new Date('2024-12-01')
            },
            {
                title: 'API Documentation',
                description: 'Create comprehensive API documentation',
                status: 'Under Review',
                client: sarahClient._id,
                assignee: mike._id,
                commentsCount: 6,
                timeEstimate: 20,
                points: 13,
                dueDate: new Date('2024-11-12')
            },
            {
                title: 'Security Audit',
                description: 'Perform security audit of the application',
                status: 'To Do',
                client: davidClient._id,
                assignee: sadik._id,
                collaborators: [mike._id, emma._id],
                commentsCount: 4,
                timeEstimate: 30,
                points: 21,
                dueDate: new Date('2024-11-30')
            },
            {
                title: 'Email Template System',
                description: 'Create customizable email template system',
                status: 'Doing',
                client: johnClient._id,
                assignee: alice._id,
                collaborators: [sadik._id],
                commentsCount: 9,
                timeEstimate: 25,
                points: 13,
                dueDate: new Date('2024-11-20')
            },
            {
                title: 'User Onboarding Flow',
                description: 'Design and implement new user onboarding experience',
                status: 'Completed',
                client: sarahClient._id,
                assignee: alice._id,
                collaborators: [sadik._id, emma._id],
                commentsCount: 18,
                timeEstimate: 40,
                points: 21,
                dueDate: new Date('2024-10-30')
            },
            {
                title: "E-commerce Homepage Redesign",
                description: "Redesign the main homepage to improve conversion rates",
                status: "Doing",
                client: users[0]._id,
                assignee: users[1]._id,
                collaborators: [users[2]._id],
                commentsCount: 8,
                timeEstimate: 20,
                points: 13,
                dueDate: new Date("2024-11-20"),
            },
            {
                title: "Mobile App Prototype",
                description: "Create an interactive prototype for the new mobile app",
                status: "To Do",
                client: users[4]._id,
                assignee: users[6]._id,
                collaborators: [users[3]._id, users[5]._id],
                commentsCount: 5,
                timeEstimate: 30,
                points: 20,
                dueDate: new Date("2024-12-10"),
            },
            {
                title: "API Development for Inventory",
                description: "Develop a REST API to manage the inventory data",
                status: "Under Review",
                client: users[0]._id,
                assignee: users[2]._id,
                collaborators: [users[5]._id],
                commentsCount: 3,
                timeEstimate: 25,
                points: 18,
                dueDate: new Date("2024-11-30"),
            },
            {
                title: "Sales Report Automation",
                description: "Automate weekly sales reporting using a script",
                status: "Completed",
                client: users[4]._id,
                assignee: users[5]._id,
                collaborators: [users[7]._id],
                commentsCount: 6,
                timeEstimate: 15,
                points: 10,
                dueDate: new Date("2024-11-15"),
            },
            {
                title: "Onboarding Email Campaign",
                description: "Set up an onboarding email campaign for new users",
                status: "Doing",
                client: users[1]._id,
                assignee: users[3]._id,
                collaborators: [users[5]._id, users[6]._id],
                commentsCount: 12,
                timeEstimate: 10,
                points: 5,
                dueDate: new Date("2024-11-22"),
            },
            {
                title: "Dashboard Analytics Module",
                description: "Develop the analytics module for the admin dashboard",
                status: "To Do",
                client: users[0]._id,
                assignee: users[5]._id,
                collaborators: [users[2]._id, users[3]._id],
                commentsCount: 4,
                timeEstimate: 35,
                points: 25,
                dueDate: new Date("2024-12-01"),
            },
            {
                title: "SEO Optimization for Landing Page",
                description: "Improve SEO for the main landing page to increase traffic",
                status: "Incomplete",
                client: users[4]._id,
                assignee: users[1]._id,
                collaborators: [users[5]._id],
                commentsCount: 2,
                timeEstimate: 5,
                points: 3,
                dueDate: new Date("2024-11-25"),
            },
            {
                title: "Website Security Audit",
                description: "Conduct a security audit for potential vulnerabilities",
                status: "Doing",
                client: users[5]._id,
                assignee: users[2]._id,
                collaborators: [users[0]._id, users[5]._id],
                commentsCount: 9,
                timeEstimate: 18,
                points: 12,
                dueDate: new Date("2024-11-28"),
            },
            {
                title: "Create Brand Guidelines",
                description: "Develop brand guidelines for consistent design",
                status: "Under Review",
                client: users[1]._id,
                assignee: users[6]._id,
                collaborators: [users[3]._id],
                commentsCount: 7,
                timeEstimate: 22,
                points: 15,
                dueDate: new Date("2024-12-05"),
            },
            {
                title: "Customer Feedback Analysis",
                description: "Analyze customer feedback to find areas of improvement",
                status: "Completed",
                client: users[4]._id,
                assignee: users[5]._id,
                collaborators: [users[6]._id],
                commentsCount: 10,
                timeEstimate: 12,
                points: 8,
                dueDate: new Date("2024-11-18"),
            }
        ])

        console.log(`Created ${users.length} users and ${tasks.length} tasks successfully`)
    } catch (error) {
        console.error('Error creating sample data:', error)
    }
}

module.exports = createSampleData