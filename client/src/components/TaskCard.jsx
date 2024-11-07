import {
  FaClipboardList,
  FaPaperclip,
  FaRegCalendarDays,
  FaRegComments
} from "react-icons/fa6"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function TaskCard({ task, setActiveTaskId }) {
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

        {/* Files */}
        <button
          onClick={() => setActiveTaskId(task.id)}
          className="hover:bg-muted rounded-md p-1 inline-flex items-center gap-1 text-sm font-medium"
        >
          <FaPaperclip className="text-base shrink-0" />
          <span>{task.files.length}</span>
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
