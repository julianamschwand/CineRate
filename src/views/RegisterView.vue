<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import LanguageDropdown from "@/components/LanguageDropdown.vue";
import { register } from "@/api/routes/userRoutes";
const { t } = useI18n();
const router = useRouter();
const username = ref("");
const email = ref("");
const password = ref("");

const handleregister = async () => {
	try {
		const result = await register(username.value, email.value, password.value);
		console.log("Registered:", result);
		router.push("/login");
	} catch (err) {
		console.error("Registration failed:", err);
	}
};
const RouteToLogin = () => {
	router.push("/login");
};
</script>
<template>
	<div class="navbar">
		<button class="backbutton" id="backbutton" @click="$router.push('/')">
			<img src="@/assets/images/icons/BackIcon.svg" id="back-icon" />
		</button>
		<LanguageDropdown />
	</div>
	<div class="register-view">
		<h1>{{ t("buttons.register") }}</h1>
		<form @submit.prevent="handleregister">
			<div class="form-group">
				<label for="username">{{ t("words.username") }}</label>
				<input
					type="text"
					id="username"
					v-model="username"
					required
					:placeholder="t('buttons.usernamePlaceholder')" />
			</div>
			<div class="form-group">
				<label for="email">{{ t("words.email") }}</label>
				<input
					type="email"
					id="email"
					v-model="email"
					required
					:placeholder="t('buttons.emailPlaceholder')" />
			</div>
			<div class="form-group">
				<label for="password">{{ t("words.password") }}</label>
				<input
					type="password"
					id="password"
					v-model="password"
					required
					:placeholder="t('buttons.passwordPlaceholder')" />
			</div>
			<button id="RegisterButton" type="submit">
				{{ t("buttons.register") }}
			</button>
			<button id="LoginButton" type="button" @click="RouteToLogin">
				{{ t("buttons.login") }}
			</button>
		</form>
	</div>
</template>

<style scoped>
.register-view {
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
	background-color: #282c34;
	color: white;
	border-radius: 4px;
	box-sizing: border-box;
}

#RegisterButton {
	width: 100%;
	padding: 10px;
	background-color: #282c34;
	color: #8ac379;
	font-size: 1rem;
	border: none;
	border-radius: 4px;
	cursor: pointer;
}

#LoginButton {
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

#back-icon {
	width: 25px;
	height: 25px;
	cursor: pointer;
}
</style>
