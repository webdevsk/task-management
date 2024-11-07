import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAllTasks } from "@/server/api"
import { useEffect, useMemo, useState } from "react"
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import {
  FaClipboardList,
  FaPaperclip,
  FaRegCalendarDays,
  FaRegComments
} from "react-icons/fa6"

function App() {
  const [status, setStatus] = useState("Pending")
  const [taskList, setTaskList] = useState([])
  const [error, setError] = useState(null)

  const taskGroups = useMemo(
    () => Object.groupBy(taskList, ({ status }) => status),
    [taskList]
  )
  const taskGroupEnums = [
    "Incomplete",
    "To Do",
    "Doing",
    "Under Review",
    "Completed"
  ]
  console.log(taskGroups)

  useEffect(() => {
    getAllTasks()
      .then(res => {
        console.log(res)
        setStatus(res.status)
        setTaskList(res.data)
      })
      .catch(err => {
        console.error(err)
        setStatus(err.status)
        setError(err.message)
      })
  }, [])
  if (error) {
    return (
      <main>
        <section>
          <div className="text-2xl py-12 container text-center text-red-500">
            <h1>Failed to fetch data from api</h1>
          </div>
        </section>
      </main>
    )
  }
  if (status == "Pending") {
    return (
      <main>
        <section>
          <div className="text-2xl py-12 container text-center">
            <h1>Fetching Data...</h1>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="">
      <section className="p-4 h-dvh">
        <div className="container">
          <ScrollMenu>
            <div className="flex gap-4 flex-nowrap *:shrink-0">
              {taskGroupEnums.map(taskGroup => (
                <div
                  key={taskGroup}
                  style={{
                    "--accent": {
                      incomplete: "#d21010",
                      "to do": "#ffe700",
                      doing: "yellow",
                      "under review": "orange",
                      completed: "green"
                    }[taskGroup.toLowerCase()]
                  }}
                  className="w-[350px] bg-card text-card-foreground shadow"
                >
                  <div className="flex items-center gap-2 px-3 py-4">
                    <div className="size-6 rounded-l-full bg-[var(--accent)]"></div>
                    <h5 className="text-lg">{taskGroup}</h5>
                    <h5 className="min-w-8 grid place-items-center rounded-md aspect-square ms-auto">
                      0
                    </h5>
                  </div>
                  <ul className="flex flex-col h-full pb-2 overflow-y-scroll gap-3 px-2">
                    {taskGroups[taskGroup].map(task => (
                      <TaskCard
                        key={task.id}
                        task={task}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollMenu>
        </div>
      </section>
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

function TaskCard({ task }) {
  return (
    <div className="w-full bg-background rounded-md">
      <div className="flex p-2 items-center gap-2 *:flex-initial justify-between text-xs font-bold *:truncate">
        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarImage
              src={
                task.client.imageUrl ||
                "images/handsome-bearded-guy-posing-against-white-wall.jpg"
              }
            />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
          <h6>{task.client.name}</h6>
        </div>

        <div className="flex items-center gap-1">
          <Avatar>
            <AvatarImage
              src={
                task.assignee.imageUrl ||
                "images/young-bearded-man-with-striped-shirt.jpg"
              }
            />
            <AvatarFallback>AN</AvatarFallback>
          </Avatar>
          <h6>{task.assignee.name}</h6>
        </div>
      </div>

      <div className="flex p-2 gap-4">
        <div className="flex gap-2 items-center w-1 flex-grow text-sm">
          <FaRegCalendarDays className="text-base shrink-0" />
          <p className="truncate shrink-1 text-xs">{task.title}</p>
        </div>
        <div className="ms-auto">
          <small className="bg-muted rounded-sm px-0.5 py-1 flex items-center gap-1 font-medium">
            <FaClipboardList className="text-base shrink-0" />
            <p>1 / 3</p>
          </small>
        </div>
      </div>

      <div className="flex items-center justify-between flex-nowrap p-2">
        {/* Collaborators */}
        <Avatar>
          <AvatarImage src="images/young-bearded-man-with-striped-shirt.jpg" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarImage src="images/young-bearded-man-with-striped-shirt.jpg" />
          <AvatarFallback>CR</AvatarFallback>
        </Avatar>

        <Avatar>
          <AvatarFallback className="text-sm font-medium">12+</AvatarFallback>
        </Avatar>

        {/* comments */}
        <button className="hover:bg-muted rounded-md p-1 inline-flex items-center gap-1 text-sm font-medium">
          <FaRegComments className="text-base shrink-0" />
          <span>{task.commentsCount}</span>
        </button>

        {/* attachments */}
        <button className="hover:bg-muted rounded-md p-1 inline-flex items-center gap-1 text-sm font-medium">
          <FaPaperclip className="text-base shrink-0" />
          <span>{task.attachments.length}</span>
        </button>

        {/* due date */}
        <p className="p-1 inline-flex items-center gap-1 text-sm font-medium">
          <FaRegCalendarDays className="text-base shrink-0" />
          <span>
            {new Date(task.dueDate)
              .toLocaleDateString("en-GB")
              .split("/")
              .join("-")}
          </span>
        </p>
      </div>
    </div>
  )
}
