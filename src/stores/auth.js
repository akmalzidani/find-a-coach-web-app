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

  const auth = async function (mode, formInput) {
    const modeAuth = mode
    let url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`
    if (modeAuth === 'signup') {
      url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`
    }

    const response = await fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: formInput.email,
        password: formInput.password,
        returnSecureToken: true
      })
    })

    const responseData = await response.json()

    if (!response.ok) {
      const error = new Error(
        responseData.message || 'Failed to authenticate. Check your login data.'
      )
      throw error
    }

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)

    setUser({
      token: responseData.idToken,
      userId: responseData.localId,
      tokenExpiration: responseData.expiresIn
    })
  }

  const login = async function (formInput) {
    return auth('login', formInput)
  }

  const signup = async function (formInput) {
    return auth('signup', formInput)
  }

  const autoLogin = function () {
    const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')

    if (token && userId) {
      setUser({
        token: token,
        userId: userId,
        tokenExpiration: null
      })
    }
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
    autoLogin,
    signupWithFirebaseMethod,
    loginWithFirebaseMethod
  }
})
