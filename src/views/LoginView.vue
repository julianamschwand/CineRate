<script setup>
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { login } from "../api/routes/userRoutes";
import { ref } from "vue";
import LanguageDropdown from "@/components/LanguageDropdown.vue";

const email = ref("");
const password = ref("");

const router = useRouter();
const { t } = useI18n();

const RouteToRegister = () => {
	router.push("/register");
};
const Routetohome = () => {
	router.push("/");
};

const handleLogin = async () => {
	try {
    await login(email.value, password.value);
		Routetohome();
	} catch (error) {
		console.log("Error while logging in:", error);
	}
};
</script>

<template>
	<div class="navbar">
		<button class="backbutton" @click="$router.push('/')">
			<img src="@/assets/images/icons/BackIcon.svg" class="back-icon" />
		</button>
		<LanguageDropdown />
	</div>
	<div id="logincontainer">
		<div class="login-view">
			<h1>{{ t("buttons.login") }}</h1>
			<form @submit.prevent="handleLogin">
				<div class="form-group">
					<label for="email">{{ t("words.email") }}</label>
					<input
						type="email"
						id="email"
						required
						:placeholder="t('buttons.emailPlaceholder')"
						v-model="email" />
				</div>
				<div class="form-group">
					<label for="password">{{ t("words.password") }}</label>
					<input
						type="password"
						id="password"
						required
						:placeholder="t('buttons.passwordPlaceholder')"
						v-model="password" />
				</div>
				<button id="LoginButton" type="submit">{{ t("buttons.login") }}</button>
				<button id="RegisterButton" @click="RouteToRegister">
					{{ t("buttons.register") }}
				</button>
			</form>
		</div>
	</div>
</template>

<style scoped>
.login-view {
	width: 400px;
	background-color: #8ac379;
	margin: 0 auto;
	padding: 20px;
	border-radius: 8px;
	margin-top: 50px;
}

h1 {
	text-align: center;
	margin-bottom: 20px;
	font-size: 1.5rem;
	color: #333;
}

.form-group {
	margin-bottom: 15px;
}

label {
	display: block;
	margin-bottom: 5px;
	font-weight: 600;
	font-size: 1rem;
	color: black;
}

input {
	width: 100%;
	padding: 10px;
	font-size: 1rem;
	border: none;
	border-radius: 4px;
	background-color: #282c34;
	box-sizing: border-box;
	color: white;
}

#LoginButton {
	width: 100%;
	padding: 10px;
	background-color: #282c34;
	color: #8ac379;
	font-size: 1rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

#RegisterButton {
	width: 100%;
	padding: 10px;
	background-color: #8ac379;
	color: #282c34;
	font-size: 1rem;
	border: 4px solid #282c34;
	border-radius: 4px;
	cursor: pointer;
	margin-top: 10px;
}
</style>
