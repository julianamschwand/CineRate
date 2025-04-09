import api from "../api.js"

export async function languages() {
	try {
		const res = await api.get("/getlanguages")
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}