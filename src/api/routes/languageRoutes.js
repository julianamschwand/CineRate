import api from "../api.js"

export async function getlanguages() {
	try {
		const res = await api.get("/getlanguages")
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}