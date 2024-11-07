import { getAllTasks } from "@/server/api"
import { useMemo, useState } from "react"
import { ScrollMenu } from "react-horizontal-scrolling-menu"

import useSWR from "swr"
import { Toaster } from "@/components/ui/sonner"
import { FilesDialog } from "@/components/FilesDialog"
import { TaskCard } from "@/components/TaskCard"

function App() {
  const {
    data: taskList = [],
    error,
    isLoading
  } = useSWR("/api/tasks", getAllTasks, {
    refreshWhenHidden: false,
    refreshWhenOffline: false,
    revalidateOnFocus: false
  })
  const [activeTaskId, setActiveTaskId] = useState(null)
  const activeTask = taskList.find(task => task.id === activeTaskId)

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
    <>
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
                          setActiveTaskId={setActiveTaskId}
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
        <FilesDialog
          task={activeTask}
          setActiveTaskId={setActiveTaskId}
        />
      </main>
      <Toaster />
    </>
  )
}
export default App
