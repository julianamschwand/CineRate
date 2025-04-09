import api from "../api.js"

export async function userdata() {
  try {
		const res = await axios.get("/userdata")
		return res.data
  } catch (error) {
		console.error("Error:", error)
  }
}

export async function register(username, email, password) {
	try {
		const res = await axios.post("/register", {
			username,
			email,
			password
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function login(email, password) {
  try {
		const res = await axios.get("/login", {
			email,
			password
		})
		return res.data
  } catch (error) {
		console.error("Error:", error)
  }
}

export async function logout() {
	try {
		const res = await axios.post("/logout")
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function rolemod(userdataid) {
	try {
		const res = await axios.post("/rolemod", {
			userdataid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function roleadmin(userdataid) {
	try {
		const res = await axios.post("/roleadmin", {
			userdataid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function roleuser(userdataid) {
	try {
		const res = await axios.post("/roleuser", {
			userdataid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function edituser(username, email, password) {
	try {
		const res = await axios.post("/edituser", {
			username,
			email,
			password
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function deleteuser(userdataid) {
	try {
		const res = await axios.post("/deleteuser", {
			userdataid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}