import api from "../api.js";

export async function isloggedin() {
  try {
    const res = await api.get("/isloggedin")
    return res.data
  } catch (error) {
    console.error(error)
  }
}

export async function userdata() {
  try {
    const res = await api.get("/userdata");
    return res.data;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function register(username, email, password, selectedlanguage) {
  try {
    const res = await api.post("/register", {
      username,
      email,
      password,
      selectedlanguage
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
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
    console.error("Error:", error);
  }
}

export async function logout() {
  try {
    const res = await api.post("/logout");
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function rolemod(userdataid) {
  try {
    const res = await api.post("/rolemod", {
      userdataid,
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function roleadmin(userdataid) {
  try {
    const res = await api.post("/roleadmin", {
      userdataid,
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function roleuser(userdataid) {
  try {
    const res = await api.post("/roleuser", {
      userdataid,
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function edituser(username = null, email = null, password = null) {
  try {
    const res = await api.patch("/edituser", {
      username,
      email,
      password,
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function deleteuser(userdataid) {
  try {
    const res = await api.delete("/deleteuser", {
      data: { userdataid }
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function changeselectedlanguage(languagecode) {
  try {
    const res = await api.post("/changeselectedlanguage", {
      languagecode
    });
    return res.data;
  } catch (error) {
    console.error("Error:", error);
  }
}