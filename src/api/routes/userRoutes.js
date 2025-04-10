import api from "../api.js"

export async function userdata() {
  try {
		const res = await api.get("/userdata")
		return res.data
  } catch (error) {
		console.error("Error:", error)
  }
}

export async function register(username, email, password) {
	try {
		const res = await api.post("/register", {
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
		const res = await api.post("/login", {
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
		const res = await api.post("/logout")
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function rolemod(userdataid) {
	try {
		const res = await api.post("/rolemod", {
			userdataid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function roleadmin(userdataid) {
	try {
		const res = await api.post("/roleadmin", {
			userdataid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function roleuser(userdataid) {
	try {
		const res = await api.post("/roleuser", {
			userdataid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}

export async function edituser(username = null, email = null, password = null) {
	try {
		const res = await api.patch("/edituser", {
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
		const res = await api.delete("/deleteuser", {
			userdataid
		})
		return res.data
	} catch (error) {
		console.error("Error:", error)
	}
}