const baseUrl = import.meta.SERVER_URL
if (!baseUrl) throw new Error("Server baseUrl not specified")

export async function getAllTasks() {
    try {
        const result = (await fetch(baseUrl + "/tasks"))?.json()
        console.log(result)
        return {
            status: "success",
            data: result
        }
    } catch (error) {
        console.error(error)
        return {
            status: "failed",
            error: error?.message
        }
    }
}