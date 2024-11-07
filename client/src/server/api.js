export async function getAllTasks() {
    const res = await fetch("/api/tasks")
    const result = await res.json()
    if (res.status == 200) return result
    throw Error(result.message)
}

export async function postAttachments(id, formData) {
    const res = await fetch(`/api/${id}/files`, {
        method: "POST",
        body: formData
    })
    const result = await res.json()
    if (res.status == 200) return result
    throw Error(result.message)
}