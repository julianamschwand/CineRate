import api from "../api.js"

export async function getrating(movieid) {
	try {
		const res = await api.get("/getrating", {
      params: {movieid}
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function rate(movieid, rating) {
	try {
		const res = await api.post("/rate", {
      movieid,
      rating
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}