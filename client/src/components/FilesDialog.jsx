import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle
} from "@/components/ui/dialog"
import { FaDownload } from "react-icons/fa6"
import UploadFiles from "./UploadFiles"
import { getFile } from "@/server/api"
export function FilesDialog({ task, setActiveTaskId }) {
  async function downloadFile(...args) {
    await getFile(...args)
  }

  return (
    <Dialog
      open={!!task}
      onOpenChange={bool => setActiveTaskId(id => (bool ? id : null))}
    >
      <DialogContent className="max-h-[80dvh] flex flex-row">
        <div className="w-full flex flex-col">
          <DialogHeader>
            <DialogTitle>Files</DialogTitle>
          </DialogHeader>
          <div className="flex flex-col h-full">
            {!!task?.files.length || (
              <p className="text-center text-xl mb-auto grow p-4 text-gray-600">
                No files
              </p>
            )}
            <div className="flex flex-col gap-2 my-4 overflow-y-auto">
              {!!task?.files.length &&
                task.files.map(file => (
                  <div
                    key={file.filename}
                    className="rounded-md bg-muted items-center flex gap-2 px-2 py-2"
                  >
                    <h4 className="truncate shrink-1 text-base">
                      {file.originalname}
                    </h4>
                    <button
                      onClick={() =>
                        downloadFile(file.filename, file.originalname)
                      }
                      className="ms-auto shrink-0 rounded-md bg-inherit hover:contrast-125 transition p-2"
                    >
                      <FaDownload />
                    </button>
                  </div>
                ))}
            </div>
            <UploadFiles id={task?.id} />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
