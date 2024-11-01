<template>
  <div class="container mx-auto px-4 h-full">
    <div class="flex content-center items-center justify-center h-full">
      <div class="w-full lg:w-4/12 px-4">
        <div
          class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-200 border-0"
        >
          <!-- <div class="rounded-t mb-0 px-6 py-6">
            <div class="text-center mb-3">
              <h6 class="text-blueGray-500 text-sm font-bold">
                Sign in with
              </h6>
            </div>
            <div class="btn-wrapper text-center">
              <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." class="w-5 mr-1" :src="github" />
                Github
              </button>
              <button
                class="bg-white active:bg-blueGray-50 text-blueGray-700 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
                type="button"
              >
                <img alt="..." class="w-5 mr-1" :src="google" />
                Google
              </button>
            </div>
            <hr class="mt-6 border-b-1 border-blueGray-300" />
          </div> -->
          <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
            <!-- <div class="text-blueGray-400 text-center mb-3 font-bold">
              <small>Or sign in with credentials</small>
            </div> -->
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
                  class="border-0 px-3 py-3 text-white font-bold bg-red-700 rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  
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
            <p>New to our tracker? Register <a href="/auth/register" class="font-bold underline">here</a></p>
          </div>
        </div>
        <div class="flex flex-wrap mt-6 relative">
          <div class="w-1/2">
            <a href="javascript:void(0)" class="text-blue-200">
              <small>Forgot password?</small>
            </a>
          </div>
          <div class="w-1/2 text-right">
            <router-link to="/auth/register" class="text-blue-200">
              <small>Create new account</small>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
import { auth, signInWithEmailAndPassword, getDoc, db, doc } from "@/firebase";
import { useRouter } from "vue-router";
import mondayService from "../../../services/mondayService";

export default {
  name: "Login",
  setup() {
    const email = ref("");
    const password = ref("");
    const error = ref("");
    const router = useRouter();

    

    return {
      email,
      password,
      error,
      router
    };
  },
  methods: {
    submit: async function () {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, this.email, this.password);
        console.log("Authenticated User:", userCredential.user);
        const userId = userCredential.user.uid;

        // Fetch the Monday.com ID from Firestore
        const userDoc = await getDoc(doc(db, "users", userId));
        if (userDoc.exists()) {
          console.log("User document found:", userDoc.data());

          const userData = userDoc.data();
          const apprenticeId = userData.apprenticeId;

          console.log(apprenticeId);

          if (!apprenticeId) {
            throw new Error("Apprentice ID missing in Firestore document");
          }

          // Make API request to Monday.com to verify the ID
          const response = await mondayService.getBoardData(apprenticeId);
          if (response) {
            this.router.push("/admin/dashboard");
          } else {
            this.error = "Invalid Monday.com ID. Please contact support.";
          }
        } else {
          console.log("No document found for this user in Firestore.");
          this.error = "No record found for the user. Please contact support.";
        }
      } catch (err) {
        this.error = err.message;
      }
    }
  }
    
  };
</script>

