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
            }
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
                todos: [
                    {
                        title: 'Create wireframes',
                        description: 'Design initial wireframes for homepage',
                        isCompleted: true,
                        assignee: alice._id,
                        completedAt: new Date('2024-11-01')
                    },
                    {
                        title: 'Design hero section',
                        description: 'Create visual design for hero section',
                        isCompleted: true,
                        assignee: alice._id,
                        completedAt: new Date('2024-11-03')
                    },
                    {
                        title: 'Implement responsive design',
                        description: 'Ensure design works on all devices',
                        isCompleted: false,
                        assignee: sadik._id
                    }
                ],
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
                todos: [
                    {
                        title: 'Setup OAuth providers',
                        isCompleted: true,
                        assignee: sadik._id,
                        completedAt: new Date('2024-10-15')
                    },
                    {
                        title: 'Implement login flow',
                        isCompleted: true,
                        assignee: sadik._id,
                        completedAt: new Date('2024-10-20')
                    },
                    {
                        title: 'Add password reset functionality',
                        isCompleted: true,
                        assignee: mike._id,
                        completedAt: new Date('2024-10-25')
                    }
                ],
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
                todos: [
                    {
                        title: 'Create test cases',
                        isCompleted: true,
                        assignee: emma._id,
                        completedAt: new Date('2024-11-02')
                    },
                    {
                        title: 'Perform functional testing',
                        isCompleted: true,
                        assignee: emma._id,
                        completedAt: new Date('2024-11-04')
                    },
                    {
                        title: 'Cross-device testing',
                        isCompleted: true,
                        assignee: emma._id,
                        completedAt: new Date('2024-11-05')
                    },
                    {
                        title: 'Write test report',
                        isCompleted: false,
                        assignee: emma._id
                    }
                ],
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
                todos: [
                    {
                        title: 'Setup Stripe account',
                        isCompleted: false,
                        assignee: mike._id
                    },
                    {
                        title: 'Implement payment endpoints',
                        isCompleted: false,
                        assignee: mike._id
                    },
                    {
                        title: 'Add webhook handlers',
                        isCompleted: false,
                        assignee: mike._id
                    }
                ],
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
                todos: [
                    {
                        title: 'Analyze slow queries',
                        isCompleted: true,
                        assignee: sadik._id,
                        completedAt: new Date('2024-11-01')
                    },
                    {
                        title: 'Add necessary indexes',
                        isCompleted: false,
                        assignee: sadik._id
                    },
                    {
                        title: 'Implement caching',
                        isCompleted: false,
                        assignee: mike._id
                    }
                ],
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
                todos: [
                    {
                        title: 'Design dashboard layout',
                        isCompleted: false,
                        assignee: alice._id
                    },
                    {
                        title: 'Create chart components',
                        isCompleted: false,
                        assignee: sadik._id
                    },
                    {
                        title: 'Implement real-time updates',
                        isCompleted: false,
                        assignee: mike._id
                    }
                ],
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
                todos: [
                    {
                        title: 'Document endpoints',
                        isCompleted: true,
                        assignee: mike._id,
                        completedAt: new Date('2024-11-02')
                    },
                    {
                        title: 'Add code examples',
                        isCompleted: true,
                        assignee: mike._id,
                        completedAt: new Date('2024-11-04')
                    },
                    {
                        title: 'Review documentation',
                        isCompleted: false,
                        assignee: sadik._id
                    }
                ],
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
                todos: [
                    {
                        title: 'Review authentication system',
                        isCompleted: false,
                        assignee: sadik._id
                    },
                    {
                        title: 'Analyze API security',
                        isCompleted: false,
                        assignee: mike._id
                    },
                    {
                        title: 'Test for vulnerabilities',
                        isCompleted: false,
                        assignee: emma._id
                    }
                ],
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
                todos: [
                    {
                        title: 'Design email templates',
                        isCompleted: true,
                        assignee: alice._id,
                        completedAt: new Date('2024-11-01')
                    },
                    {
                        title: 'Implement template engine',
                        isCompleted: false,
                        assignee: sadik._id
                    },
                    {
                        title: 'Add customization options',
                        isCompleted: false,
                        assignee: sadik._id
                    }
                ],
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
                todos: [
                    {
                        title: 'Design onboarding screens',
                        isCompleted: true,
                        assignee: alice._id,
                        completedAt: new Date('2024-10-15')
                    },
                    {
                        title: 'Implement frontend flow',
                        isCompleted: true,
                        assignee: sadik._id,
                        completedAt: new Date('2024-10-20')
                    },
                    {
                        title: 'User testing',
                        isCompleted: true,
                        assignee: emma._id,
                        completedAt: new Date('2024-10-25')
                    }
                ],
                commentsCount: 18,
                timeEstimate: 40,
                points: 21,
                dueDate: new Date('2024-10-30')
            }
        ])

        console.log(`Created ${users.length} users and ${tasks.length} tasks successfully`)
    } catch (error) {
        console.error('Error creating sample data:', error)
    }
}

module.exports = createSampleData