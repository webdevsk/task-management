

export async function getAllTasks() {
    try {
        const result = await fetch("/api/tasks").then(res => res.json())
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