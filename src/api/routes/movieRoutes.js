import api from "../api.js"

export async function addmovie(title, description, poster, playbackid, releaseyear, duration) {
	try {
		const formData = new FormData()
		formData.append("title", JSON.stringify(title))
		formData.append("description", JSON.stringify(description))
		formData.append("poster", poster)
		formData.append("playbackid", playbackid)
		formData.append("duration", duration)
		formData.append("releaseyear", releaseyear)

		const res = await api.post("/addmovie", formData, {
			headers: {
        "Content-Type": "multipart/form-data",
      }
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function getmovies(languagecode) {
	try {
		const res = await api.get("/getmovies", {
			params: { languagecode }
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function getmoviedata(movieid, languagecode) {
	try {
		const res = await api.get("/getmoviedata", {
       params: { 
				movieid,
				languagecode 
		}
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function getallmoviedata(movieid) {
	try {
		const res = await api.get("/getallmoviedata", {
      params: { movieid }
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function editmovie(movieid, title = null, description = null, poster = null, playbackid = null) {
	try {
		const res = await api.patch("/editmovie", {
      movieid,
			title,
			description,
			poster,
			playbackid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function deletemovie(movieid) {
	try {
		const res = await api.delete("/deletemovie", {
      data: { movieid }
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}