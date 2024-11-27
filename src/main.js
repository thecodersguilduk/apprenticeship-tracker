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

import Admin from "@/layouts/Admin.vue";
import Auth from "@/layouts/Auth.vue";

// views for Admin layout

import Dashboard from "@/views/admin/Dashboard.vue";
import Settings from "@/views/admin/Settings.vue";
import Tables from "@/views/admin/Tables.vue";
import Maps from "@/views/admin/Maps.vue";

// views for Auth layout

import Login from "@/views/auth/Login.vue";
import Register from "@/views/auth/Register.vue";
import ForgotPassword from "@/views/auth/ForgotPassword.vue";

// views without layouts

import Landing from "@/views/Landing.vue";
import Profile from "@/views/Profile.vue";
//import Index from "@/views/Index.vue";

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
        path: "/admin/settings",
        component: Settings,
      },
      {
        path: "/admin/tables",
        component: Tables,
      },
      {
        path: "/admin/maps",
        component: Maps,
      },
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
    path: "/landing",
    component: Landing,
  },
  {
    path: "/profile",
    component: Profile,
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
