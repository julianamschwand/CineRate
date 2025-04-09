import api from "../api.js"

export async function addmovie(title, description, poster, playbackid) {
	try {
		const res = await api.post("/addmovie", {
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

export async function getmovies(languagecode) {
	try {
		const res = await api.get("/getmovies", {
			languagecode
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function getmoviedata(movieid, languagecode) {
	try {
		const res = await api.get("/getmoviedata", {
      movieid,
			languagecode
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function getallmoviedata(movieid) {
	try {
		const res = await api.get("/getallmoviedata", {
      movieid
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
      movieid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}