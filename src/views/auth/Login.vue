
<template>

  <div class="flex min-h-full flex-1">
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
        class="border-0 px-3 py-3 text-white bg-blue-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
        
      />
    </div>

    <div class="relative w-full mb-3" v-if="error" >
      <p>{{error}}</p>
    </div>
    <!-- <div>
      <label class="inline-flex items-center cursor-pointer">
        <input
          id="customCheckLogin"
          type="checkbox"
          class="form-checkbox border-0 rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
        />
        <span class="ml-2 text-sm font-semibold text-blueGray-600">
          Remember me
        </span>
      </label>
    </div> -->

    <!-- <div class="text-center mt-6">
      <button
        @click="loginWithGoogle"
        class="bg-blueGray-800 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
        type="button"
      >
        Sign In
      </button>
    </div> -->
  </form>
  <p>New to our tracker? Register <a class="cursor-pointer" href="/auth/register">here</a></p>
  <p>Forgot your password? <a class="cursor-pointer" href="/auth/forgot-password">Reset it here</a></p>
</div>

          <div class="mt-10">
            <div class="relative">
              <div class="absolute inset-0 flex items-center" aria-hidden="true">
                <div class="w-full border-t border-gray-200" />
              </div>
              <div class="relative flex justify-center text-sm/6 font-medium">
                <span class="bg-white px-6 text-gray-900">Staff sign in here!</span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-2 gap-4">
              <a href="#" class="flex w-full items-center justify-center gap-3 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus-visible:ring-transparent">
                <svg class="h-5 w-5" aria-hidden="true" viewBox="0 0 24 24">
                  <path d="M12.0003 4.75C13.7703 4.75 15.3553 5.36002 16.6053 6.54998L20.0303 3.125C17.9502 1.19 15.2353 0 12.0003 0C7.31028 0 3.25527 2.69 1.28027 6.60998L5.27028 9.70498C6.21525 6.86002 8.87028 4.75 12.0003 4.75Z" fill="#EA4335" />
                  <path d="M23.49 12.275C23.49 11.49 23.415 10.73 23.3 10H12V14.51H18.47C18.18 15.99 17.34 17.25 16.08 18.1L19.945 21.1C22.2 19.01 23.49 15.92 23.49 12.275Z" fill="#4285F4" />
                  <path d="M5.26498 14.2949C5.02498 13.5699 4.88501 12.7999 4.88501 11.9999C4.88501 11.1999 5.01998 10.4299 5.26498 9.7049L1.275 6.60986C0.46 8.22986 0 10.0599 0 11.9999C0 13.9399 0.46 15.7699 1.28 17.3899L5.26498 14.2949Z" fill="#FBBC05" />
                  <path d="M12.0004 24.0001C15.2404 24.0001 17.9654 22.935 19.9454 21.095L16.0804 18.095C15.0054 18.82 13.6204 19.245 12.0004 19.245C8.8704 19.245 6.21537 17.135 5.2654 14.29L1.27539 17.385C3.25539 21.31 7.3104 24.0001 12.0004 24.0001Z" fill="#34A853" />
                </svg>
                <span class="text-sm/6 font-semibold">Google</span>
              </a>
            </div>
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

export default {
  name: "Login",
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
        error.value = err.message;
      }
    }

    return { logo, email, password, error, router, submit };
  },
};
</script>
