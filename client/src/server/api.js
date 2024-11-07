const API_URL = import.meta.env.VITE_API_URL
console.log(API_URL)
export async function getAllTasks() {
    const res = await fetch(API_URL + "/api/tasks")
    const result = await res.json()
    if (res.status == 200) return result
    throw Error(result.message)
}

export async function postFiles(id, formData) {
    const res = await fetch(API_URL + `/api/tasks/${id}/files`, {
        method: "POST",
        body: formData,
    })
    const result = await res.json()
    if (res.status == 200) return result
    throw Error(result.message)
}

export async function getFile(fileName, originalName) {
    fetch(API_URL + `/api/files/${fileName}`)
        .then(res => res.blob())
        .then(blob => {
            const url = window.URL.createObjectURL(blob)
            const a = document.createElement('a')
            a.href = url
            a.download = originalName
            document.body.appendChild(a) // we need to append the element to the dom -> otherwise it will not work in firefox
            a.click()
            a.remove()  //afterwards we remove the element again  
        })
}