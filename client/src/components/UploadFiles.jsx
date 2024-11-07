import { allowedTypes, fileSizeLimit } from "@/data/data"
import { memo } from "react"
import { FaUpload } from "react-icons/fa6"
import { HiPhoto } from "react-icons/hi2"
import { useSWRConfig } from "swr"

const UploadFiles = memo(({ className, setImageFiles }) => {
  const mutate = useSWRConfig()

  const handleChange = ({ currentTarget: t }) => {
    if (!t.files.length) return

    const [file] = t.files
    if (!allowedTypes.includes(file.type)) {
      alert("Allowed file types: " + allowedTypes.join(", "))
      return
    }

    if (file.size > fileSizeLimit) {
      alert(`Max file size limit: ${fileSizeLimit / 1024 / 1024} MB`)
      return
    }

    const reader = new FileReader()
    reader.onloadstart = () => (t.disabled = true)
    reader.onload = () => {}
    reader.onloadend = () => (t.disabled = false)
    reader.onerror = () => alert(reader.error)
    reader.readAsDataURL(file)
  }

  return (
    <>
      <input
        hidden
        type="file"
        id="file-upload"
        name="file-upload"
        onChange={handleChange}
        accept={allowedTypes.join(",")}
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
