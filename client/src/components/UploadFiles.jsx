import { allowedTypes } from "@/data/data"
import { postFiles } from "@/server/api"
import { memo } from "react"
import { FaUpload } from "react-icons/fa6"
import { toast } from "sonner"
import { useSWRConfig } from "swr"

const UploadFiles = memo(({ id }) => {
  const { mutate } = useSWRConfig()

  const handleFileChange = event => {
    // setFiles(event.target.files)
    uploadFiles(event.target.files)
  }

  const uploadFiles = async fileList => {
    const formData = new FormData()
    for (const file of fileList) {
      formData.append("files", file) // Adjust 'files' to match your backend API's expected parameter name
    }

    toast.promise(() => postFiles(id, formData), {
      loading: "Uploading files...",
      success: data => {
        mutate("/api/tasks")
        return data.message
      },
      error: error => {
        console.error(error)
        return error
      }
    })
  }

  return (
    <>
      <input
        hidden
        type="file"
        id="file-upload"
        name="file-upload"
        onChange={handleFileChange}
        accept={allowedTypes.join(",")}
        multiple="multiple"
        className="peer"
      />
      <label
        htmlFor="file-upload"
        className={`relative cursor-pointer mb-2 gap-2 transition-colors peer-disabled:opacity-50 mt-auto hover:contrast-75 rounded-md px-2 py-2  bg-secondary inline-flex justify-center items-center`}
      >
        <FaUpload />
        <span>Upload Files</span>
      </label>
    </>
  )
})

UploadFiles.displayName = "UploadFiles"

export default UploadFiles
