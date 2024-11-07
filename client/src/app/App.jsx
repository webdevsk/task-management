import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAllTasks } from "@/server/api"
import { useEffect, useMemo, useState } from "react"
import { ScrollMenu } from "react-horizontal-scrolling-menu"
import {
  FaClipboardList,
  FaPaperclip,
  FaRegCalendarDays,
  FaRegComments,
  FaUpload
} from "react-icons/fa6"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog"
import useSWR from "swr"
import UploadFiles from "@/components/UploadFiles"

function App() {
  const [activeTask, setActiveTask] = useState(null)
  const {
    data: taskList = [],
    error,
    isLoading
  } = useSWR("/api/tasks", getAllTasks, {
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false
  })

  console.log(taskList, error, isLoading)

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

  if (isLoading) {
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

  if (error) {
    console.error(error)
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

  return (
    <main className="">
      <section className="p-4 h-dvh">
        <div className="container">
          <ScrollMenu>
            <div className="flex gap-4 flex-nowrap items-stretch *:shrink-0">
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
                        activeTask={activeTask}
                        setActiveTask={setActiveTask}
                      />
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </ScrollMenu>
        </div>
      </section>

      {/* Dialog */}
      <Dialog
        open={!!activeTask}
        onOpenChange={bool => setActiveTask(task => (bool ? task : null))}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attachments</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-1">
            {activeTask?.attachments.length || (
              <p className="text-center text-xl p-4 text-gray-600">
                No attchments
              </p>
            )}
            {!!activeTask?.attachments.length &&
              activeTask.attachments.map(file => (
                <div
                  key={file.fileName}
                  className="rounded-md bg-muted flex gap-2 px-2 py-2"
                >
                  <h4 className="truncate shrink-1 text-base">
                    {file.originalName}
                  </h4>
                </div>
              ))}
            <UploadFiles id={activeTask?.id} />
          </div>
        </DialogContent>
      </Dialog>
    </main>
  )
}
export default App

function TaskCard({ task, setActiveTask }) {
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
        <button
          onClick={() => setActiveTask(task)}
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
