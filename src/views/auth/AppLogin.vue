
<template>

  <div class="flex min-h-screen flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-10 w-auto" :src="logo" alt="Apprenticeship Tracker App from The Coders Guild" />
          <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div class="mt-10">
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form @submit.prevent="submit" class="py-10">
              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email
                </label>
                <input
                  v-model="email"
                  type="email"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  v-model="password"
                  type="password"
                  class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Password"
                />
              </div>

              <div class="relative w-full mb-3">
                <label
                  class="block uppercase text-blueGray-600 text-xs font-bold mb-2 sr-only"
                  htmlFor="grid-password"
                >
                  Login
                </label>
                <input
                  type="submit"
                  class="cursor-pointer border-0 px-3 py-3 text-white bg-blue-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  
                />
              </div>

              <div class="relative w-full mb-3 bg-red-200 py-2 text-white px-2 rounded-sm" v-if="error" >
                <p>{{error}}</p>
              </div>

            </form>
            <p>New to our tracker? Register <a class="cursor-pointer" href="/auth/register">here</a></p>
            <p>Forgot your password? <a class="cursor-pointer" href="/auth/forgot-password">Reset it here</a></p>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="../../assets/img/agile-lego.jpg" alt="login to your apprenticeship dashboard!" />
    </div>
  </div>
</template>

<script>
import logo from "@/assets/img/logo/TCG_Square_Logo_Blue.svg";
import { ref } from "vue";
import { auth, signInWithEmailAndPassword } from "@/firebase";
import { useRouter } from "vue-router";
import { useBoardStore } from "@/store/useBoardStore";
import { transformLoginErrors } from "@/helpers/transformLoginErrors";

export default {
  name: "AppLogin",
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const router = useRouter();
    const boardStore = useBoardStore();

    async function submit() {
      try {
        // Authenticate the user
        const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value);
        const userId = userCredential.user.uid;

        // Retrieve Monday.com data through the store
        await boardStore.fetchApprenticeData(userId);

        // If successful, navigate to dashboard
        router.push("/admin/dashboard");
      } catch (err) {
        error.value = transformLoginErrors(err.message);
      }
    }

    return { logo, email, password, error, router, submit };
  },
};
</script>
