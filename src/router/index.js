import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import LoginView from "../views/LoginView.vue";
import MovieView from "../views/MovieView.vue";
import RegisterView from "../views/RegisterView.vue";
import AddMovieView from "../views/AddMovieView.vue";
import AdminPanelView from "../views/AdminPanelView.vue";
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/login",
      name: "login",
      component: LoginView,
    },
    {
      path: "/movie/:id",
      component: MovieView,
      props: true,
    },
    {
      path: "/register",
      name: "register",
      component: RegisterView,
    },
    {
      path: "/addmovie",
      name: "addmovie",
      component: AddMovieView,
    },
    {
      path: '/admin',
      name: 'AdminPanel',
      component: AdminPanelView,
    },
    {
      path: "/editmovie/:id",
      name: "editmovie",
      component: AddMovieView
    },
  ],
});
export default router;
