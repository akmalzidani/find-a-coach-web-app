<script setup>
import { useAuthStore } from '@/stores/auth'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const { login, signup } = authStore

const formInput = ref({
  email: '',
  password: '',
  formIsValid: true,
  mode: 'login'
})

const isLoading = ref(false)
const error = ref(null)

const submitButtonCaption = computed(() => (formInput.value.mode === 'login' ? 'Login' : 'Signup'))
const swithcModeButtonCaption = computed(() =>
  formInput.value.mode === 'login' ? 'Signup Instead' : 'Login Instead'
)

const submitForm = async () => {
  formInput.value.formIsValid = true
  if (
    formInput.value.email === '' ||
    !formInput.value.email.includes('@') ||
    formInput.value.password.length < 6
  ) {
    formInput.value.formIsValid = false
    return
  }

  isLoading.value = true

  try {
    if (formInput.value.mode === 'login') {
      await login(formInput.value)
    } else {
      await signup(formInput.value)
    }
    router.replace(`/${route.query.redirect || 'coaches'}`)
  } catch (err) {
    error.value = err.message || 'Failed to authenticate. Please try again!'
  }
  isLoading.value = false
}

const switchAuthMode = () => {
  formInput.value.mode = formInput.value.mode === 'login' ? 'signup' : 'login'
}

const handleError = () => {
  error.value = null
}
</script>

<template>
  <div>
    <BaseDialog :show="!!error" title="An error occured!" @close="handleError">
      <p>{{ error }}</p>
    </BaseDialog>
    <BaseDialog :show="isLoading" fixed title="Authenticating...">
      <BaseSpinner />
    </BaseDialog>
    <BaseCard>
      <form @submit.prevent="submitForm">
        <div class="form-control">
          <label for="email">E-mail</label>
          <input type="email" id="email" v-model.trim="formInput.email" />
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <input type="password" id="password" v-model.trim="formInput.password" />
        </div>
        <BaseButton>{{ submitButtonCaption }}</BaseButton>
        <BaseButton type="button" mode="flat" @click="switchAuthMode">{{
          swithcModeButtonCaption
        }}</BaseButton>
        <p v-if="!formInput.formIsValid">
          Please enter a valid email and password (must be at least 6 characaters long).
        </p>
      </form>
    </BaseCard>
  </div>
</template>

<style scoped>
form {
  margin: 1rem;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
</style>
