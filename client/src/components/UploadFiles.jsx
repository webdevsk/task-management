import { allowedTypes, fileSizeLimit } from "@/data/data"
import { postAttachments } from "@/server/api"
import { memo, useState } from "react"
import { FaUpload } from "react-icons/fa6"
import { HiPhoto } from "react-icons/hi2"
import useSWR, { useSWRConfig } from "swr"

const UploadFiles = memo(({ id }) => {
  const mutate = useSWRConfig()

  const handleFileChange = event => {
    // setFiles(event.target.files)
    uploadFiles(event.target.files)
  }

  const uploadFiles = async fileList => {
    const formData = new FormData()
    for (const file of fileList) {
      formData.append("files", file) // Adjust 'files' to match your backend API's expected parameter name
    }
    console.log(formData)
    const res = await postAttachments(id, formData)
    console.log(res)
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
        className={`relative cursor-pointer gap-2 transition-colors peer-disabled:opacity-50 mt-auto hover:contrast-75 rounded-md px-2 py-2  bg-muted inline-flex justify-center items-center`}
      >
        <FaUpload />
        <span>Upload Attachments</span>
        {/* <span className="text-red-400 text-xs">
          Allowed file types:{" "}
          {allowedTypes.map(type => type.split(".").at(-1)).join(", ")}
        </span> */}
      </label>
    </>
  )
})

UploadFiles.displayName = "UploadFiles"

export default UploadFiles
