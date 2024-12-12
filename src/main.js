import { createApp } from "vue";
import pinia from "./store/pinia";
import { createWebHistory, createRouter } from "vue-router";
import { auth } from "@/firebase";
import { onAuthStateChanged } from "firebase/auth";

// styles

import "@fortawesome/fontawesome-free/css/all.min.css";
import "@/assets/styles/tailwind.css";

// mouting point for the whole app

import App from "@/App.vue";

// layouts

import Admin from "@/layouts/AppAdmin.vue";
import Auth from "@/layouts/AppAuth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/AppDashboard.vue";
import TrainingPlan from "@/views/admin/TrainingPlan.vue";

// views for Auth layout

import Login from "@/views/auth/AppLogin.vue";
import Register from "@/views/auth/AppRegister.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";


// routes

const routes = [
  {
    path: "/admin",
    redirect: "/admin/dashboard",
    component: Admin,
    children: [
      {
        path: "/admin/dashboard",
        component: Dashboard,
      },
      {
        path: "/admin/training-plan",
        component: TrainingPlan
      }
    ],
  },
  {
    path: "/auth",
    redirect: "/auth/login",
    component: Auth,
    children: [
      {
        path: "/auth/login",
        component: Login,
      },
      {
        path: "/auth/register",
        component: Register,
      },
      {
        path: "/auth/forgot-password",
        component: ForgotPassword,
      },
    ],
  },
  {
    path: "/",
    component: Admin,
    children: [
      {
        path: "/",
        component: Dashboard,
      }
    ]
  },
  { path: "/:pathMatch(.*)*", redirect: "/" },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  onAuthStateChanged(auth, (user) => {
    const isAuthenticated = !!user; // Check if the user is authenticated

    // If the route does not start with /auth and user is not authenticated, redirect to login
    if (to.path.startsWith("/auth")) {
      next(); // Allow navigation to /auth routes (login, register)
    } else if (!isAuthenticated) {
      next("/auth/login"); // Redirect unauthenticated users to login page
    } else {
      next(); // Allow authenticated users to proceed
    }
  });
});

const app = createApp(App);

app.use(pinia);
app.use(router);
app.mount('#app');
