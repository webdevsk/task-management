import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import {
  FaClipboard,
  FaClipboardList,
  FaPaperclip,
  FaRegCalendarDays,
  FaRegComments
} from "react-icons/fa6"

function App() {
  return (
    <main className="">
      <section className="p-4 min-h-dvh">
        <div className="container">
          <ScrollMenu>
            <TaskListContainer titleClassName="bg-red-500" />
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

function TaskListContainer({ tasks, titleClassName, contentClassName }) {
  return (
    <div className="w-[350px] bg-card text-card-foreground shadow">
      <div className="flex items-center gap-2 px-3 py-4">
        <div className="size-6 rounded-l-full bg-accent"></div>
        <h5 className="text-lg">Incomplete</h5>
        <h5 className="min-w-8 grid place-items-center rounded-md aspect-square ms-auto">
          0
        </h5>
      </div>

      <ul className="flex flex-row h-max pb-2 overflow-y-scroll gap-3 px-2">
        <div className="w-full bg-background rounded-md">
          <div className="flex p-2 items-center gap-2 *:flex-initial justify-between text-xs font-bold *:truncate">
            <div className="flex items-center gap-1">
              <Avatar>
                <AvatarImage src="images/handsome-bearded-guy-posing-against-white-wall.jpg" />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <h6>Client Name</h6>
            </div>

            <div className="flex items-center gap-1">
              <Avatar>
                <AvatarImage src="images/young-bearded-man-with-striped-shirt.jpg" />
                <AvatarFallback>AN</AvatarFallback>
              </Avatar>
              <h6>Assignee Name</h6>
            </div>
          </div>

          <div className="flex p-2 gap-4">
            <div className="flex gap-2 items-center w-1 flex-grow text-sm">
              <FaRegCalendarDays className="text-base shrink-0" />
              <p className="truncate shrink-1 text-xs">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Officia cum libero, sit accusamus fugit repellendus dicta
                voluptatum voluptatem quos voluptatibus exercitationem atque id
                expedita sed quam aut fuga rerum.
              </p>
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
              <AvatarFallback className="text-sm font-medium">
                12+
              </AvatarFallback>
            </Avatar>

            {/* comments */}
            <button className="inline-flex items-center gap-1 text-sm font-medium">
              <FaRegComments className="text-base shrink-0" />
              <span>12</span>
            </button>

            {/* attachments */}
            <button className="inline-flex items-center gap-1 text-sm font-medium">
              <FaPaperclip className="text-base shrink-0" />
              <span>13</span>
            </button>

            {/* due date */}
            <button className="inline-flex items-center gap-1 text-sm font-medium">
              <FaRegCalendarDays className="text-base shrink-0" />
              <span>09-12-2023</span>
            </button>
          </div>
        </div>
      </ul>
    </div>
  )
}
