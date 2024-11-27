
<template>

    <div class="flex min-h-screen flex-1">
      <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div class="mx-auto w-full max-w-sm lg:w-96">
          <div>
            <img class="h-10 w-auto" :src="logo" alt="Apprenticeship Tracker App from The Coders Guild" />
            <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Forgotten Your Password?</h2>
            <p>Enter your email and if you are registered we will send an email with further instructions</p>
          </div>
          <div class="mt-10">
            <div class="flex-auto py-10 pt-0">
                <form @submit.prevent="handleForgotPassword" class="py-10 flex flex-col gap-4 items-start">
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

                <input
                    type="submit"
                    class="border-0 px-3 py-3 text-white bg-blue-200 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                    
                />
            
                <div class="relative w-full mb-3" v-if="error" >
                    <p>{{error}}</p>
                </div>
            
                </form>
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
  import { getAuth, sendPasswordResetEmail } from "firebase/auth"; // Import your reset function
  import { ref } from "vue";

  
  export default {
    name: "ForgotPassword",
    setup() {
      const email = ref("");
      const error = ref("");

      const handleForgotPassword = async () => {
      if (!email.value) {
        error.value = "Please enter your email address.";
        return;
      }

      const auth = getAuth();

      try {
        await sendPasswordResetEmail(auth, email.value);
        error.value = "Check your inbox for a password reset email.";
      } catch (error) {
        error.value = error.message;
      }
    }
     
      return { logo, email, handleForgotPassword, error };
    },
  }; 
  </script>
  