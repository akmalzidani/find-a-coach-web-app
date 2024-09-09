import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { defineStore } from 'pinia'
import { computed, ref } from 'vue'

const API_KEY = import.meta.env.VITE_API_KEY
let timer

export const useAuthStore = defineStore('auth', () => {
  //-------- state
  const token = ref(null)
  const userId = ref(null)
  const didAutoLogout = ref(false)

  // -------- getters
  const isAuthenticated = computed(() => !!token.value)

  //-------- actions
  const setUser = function (data) {
    token.value = data.token
    userId.value = data.userId
    didAutoLogout.value = false
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

    const expiresIn = +responseData.expiresIn * 1000
    const expirationDate = new Date().getTime() + expiresIn

    localStorage.setItem('token', responseData.idToken)
    localStorage.setItem('userId', responseData.localId)
    localStorage.setItem('tokenExpiration', expirationDate)

    timer = setTimeout(autoLogout, expiresIn)

    setUser({
      token: responseData.idToken,
      userId: responseData.localId
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
    const tokenExpiration = localStorage.getItem('tokenExpiration')

    const expiresIn = +tokenExpiration - new Date().getTime()

    if (expiresIn < 0) {
      return
    }

    timer = setTimeout(autoLogout, expiresIn)

    if (token && userId) {
      setUser({
        token: token,
        userId: userId
      })
    }
  }

  const logout = function () {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('tokenExpiration')

    clearTimeout(timer)

    setUser({
      token: null,
      userId: null
    })
  }

  const autoLogout = function () {
    logout()
    didAutoLogout.value = true
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
    didAutoLogout,
    login,
    signup,
    logout,
    autoLogin,
    signupWithFirebaseMethod,
    loginWithFirebaseMethod
  }
})
