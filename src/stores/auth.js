import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'

const API_KEY = import.meta.env.VITE_API_KEY

export const useAuthStore = defineStore('auth', () => {
  //-------- state
  const token = ref(null)
  const tokenExpiration = ref(null)
  const userId = ref(null)

  // -------- getters
  const isAuthenticated = computed(() => !!token.value)

  //-------- actions
  const setUser = function (data) {
    token.value = data.token
    userId.value = data.userId
    tokenExpiration.value = data.tokenExpiration
  }

  const login = async function (formInput) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: formInput.email,
          password: formInput.password,
          returnSecureToken: true
        })
      }
    )

    const responseData = await response.json()
    console.log(responseData)

    if (!response.ok) {
      console.log(responseData)
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      )
      throw error
    }

    setUser({
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })
  }

  const signup = async function (formInput) {
    const response = await fetch(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
      {
        method: 'POST',
        body: JSON.stringify({
          email: formInput.email,
          password: formInput.password,
          returnSecureToken: true
        })
      }
    )

    const responseData = await response.json()
    console.log(responseData)

    if (!response.ok) {
      console.log(responseData)
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      )
      throw error
    }

    setUser({
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })
  }

  const logout = function () {
    setUser({
      token: null,
      userId: null,
      tokenExpiration: null
    })
  }

  // Firebase Method Authentication -- harus initialize dulu di main.js
  const signupWithFirebaseMethod = function (formInput) {
    const auth = getAuth()
    createUserWithEmailAndPassword(auth, formInput.email, formInput.password)
      .then((userCredential) => {
        console.log('Successfully Registered', userCredential)
        console.log(auth.currentUser)
        this.$router.push('/coaches')
      })
      .catch((error) => {
        console.error(error.code)
        alert(error.message)
        // ..
      })
  }

  const loginWithFirebaseMethod = function (formInput) {
    const errMsg = ref()

    const auth = getAuth()
    signInWithEmailAndPassword(auth, formInput.email, formInput.password)
      .then((userCredential) => {
        console.log('Successfully Signed In', userCredential)
        console.log(auth.currentUser)
        this.$router.push('/coaches')
      })
      .catch((error) => {
        console.error(error.code)
        switch (error.code) {
          case 'auth/invalid-email':
            errMsg.value = 'Invalid email address format.'
            break
          case 'auth/user-not-found':
            errMsg.value = 'User not found.'
            break
          case 'auth/wrong-password':
            errMsg.value = 'Invalid password.'
            break
          default:
            errMsg.value = 'An error occurred.'
        }
      })
  }

  return {
    userId,
    isAuthenticated,
    login,
    signup,
    logout,
    signupWithFirebaseMethod,
    loginWithFirebaseMethod
  }
})
