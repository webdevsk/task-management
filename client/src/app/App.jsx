import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import clsx from "clsx"
import { ScrollMenu } from "react-horizontal-scrolling-menu"

function App() {
  return (
    <main className="p-4 min-h-dvh">
      <ScrollMenu>
        <TaskListContainer titleClassName="bg-red-500" />
      </ScrollMenu>
    </main>
  )
}
export default App

// {
//   "_id": "672b6c58a4e5c533cbaf7af0",
//   "title": "User Authentication System",
//   "description": "Implement secure user authentication with OAuth2",
//   "status": "Completed",
//   "client": {
//       "_id": "672b6c57a4e5c533cbaf7ae2",
//       "name": "Sarah Martinez",
//       "imageUrl": null
//   },
//   "assignee": {
//       "_id": "672b6c57a4e5c533cbaf7ae4",
//       "name": "Sadik Istiak",
//       "imageUrl": null
//   },
//   "collaborators": [
//       {
//           "_id": "672b6c57a4e5c533cbaf7ae6",
//           "name": "Mike Johnson",
//           "imageUrl": null
//       }
//   ],
//   "commentsCount": 15,
//   "timeEstimate": 40,
//   "points": 21,
//   "dueDate": "2024-10-30T00:00:00.000Z",
//   "tags": [],
//   "priority": "Medium",
//   "createdAt": "2024-11-06T13:17:12.755Z",
//   "attachments": [],
//   "files": [],
//   "__v": 0
// }

function TaskListContainer({ tasks, titleClassName, contentClassName }) {
  return (
    <div className="w-96 bg-card-background text-card-foreground shadow">
      <div className="flex items-center gap-2 px-3 py-4">
        <div className="size-6 rounded-l-full bg-accent"></div>
        <h5 className="text-lg">Incomplete</h5>
        <h5 className="min-w-8 grid place-items-center rounded-md aspect-square ms-auto">
          0
        </h5>
      </div>

      <ul className="flex flex-row h-max overflow-y-scroll gap-3 px-2"></ul>
    </div>
  )
}
