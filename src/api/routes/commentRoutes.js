import api from "../api.js"

export async function getcomments(movieid) {
	try {
		const res = await api.get("/getcomments", {
      params: {movieid}
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function addcomment(movieid, content) {
	try {
		const res = await api.post("/addcomment", {
      movieid,
      content
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function editcomment(commentid, content) {
	try {
		const res = await api.patch("/editcomment", {
      commentid,
      content
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function deletecomment(commentid) {
	try {
		const res = await api.get("/deletecomment", {
      commentid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}