
<template>

  <div class="flex min-h-full flex-1">
    <div class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img class="h-10 w-auto" :src="logo" alt="Apprenticeship Tracker App from The Coders Guild" />
          <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Register your new Apprenticeship Account</h2>
        </div>

        <div class="mt-4">
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <form class="py-10" @submit.prevent="register">

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
    required
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
    required
  />
</div>

<div class="relative w-full mb-3">
  <label
    class="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    htmlFor="grid-apprenticeId"
  >
  ID Number - this will be in your joining email
  </label>
  <input
    v-model="apprenticeId"
    type="text"
    class="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    placeholder="Apprentice ID"
    required
  />
</div>

<div>
  <label class="inline-flex items-center cursor-pointer">
    <input
      id="customCheckLogin"
      type="checkbox"
      class="form-checkbox rounded text-blueGray-700 ml-1 w-5 h-5 ease-linear transition-all duration-150"
      required
    />
    <span class="ml-2 text-sm font-semibold text-blueGray-600">
      I agree with the
      <a href="https://thecodersguild.org.uk/privacy" class="text-blue-200">
        Privacy Policy
      </a>
    </span>
  </label>
</div>

        <div class="text-center mt-6">
          <button
            class="bg-blue-200 text-white active:bg-blueGray-600 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150"
          type="submit"
          >
            Create Account
          </button>
        </div>

        <div class="mt-6 text-red-500" v-if="error">{{ error }}</div>
        </form>
          <p>Already signed up? Login <a href="/auth/login">here</a></p>
        </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img class="absolute inset-0 h-full w-full object-cover" src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80" alt="" />
    </div>
  </div>
</template>

<script>
import logo from '@/assets/img/logo/TCG_Square_Logo_Blue.svg';
import { ref } from "vue";
import { auth, createUserWithEmailAndPassword, db, setDoc, doc } from "@/firebase";
import { useRouter } from "vue-router";
import registrationService from "../../../services/registrationService";

export default {
  name: "Register",
  setup() {
    const email = ref("");
    const password = ref("");
    const apprenticeId = ref("");
    const error = ref("");
    const router = useRouter();

    const register = async () => {
      try {

        //to do - check the apprenticeid matches the email stored for that id. ie. if I log in as ash, will i get ash's data back
        const isRegistrationValid = await registrationService(email.value, apprenticeId.value);
        if(!isRegistrationValid) {
          throw new Error("Incorrect apprentice ID or email.")
        }

        const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
        const userId = userCredential.user.uid;

        console.log("User created with ID:", userId);

        if (!apprenticeId.value) {
          throw new Error("Apprentice ID is required");
        }

        console.log("Saving apprentice ID to Firestore:", apprenticeId.value);

        


        // Store Monday.com ID in Firestore with the user ID
        await setDoc(doc(db, "users", userId), {
          email: email.value,
          apprenticeId: apprenticeId.value,
        });

        

        router.push("/admin/dashboard");
      } catch (err) {
        
        error.value = err.message;
      }
    };

    return {
      logo,
      email,
      password,
      apprenticeId,
      error,
      register,
    };
  },
};
</script>

