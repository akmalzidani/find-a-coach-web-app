<script setup>
import { ref } from 'vue'

const formValues = ref({
  email: {
    val: '',
    isValid: true
  },
  message: {
    val: '',
    isValid: true
  },
  formIsValid: true
})

const submitForm = () => {
  formValues.value.formIsValid = true
  if (
    formValues.value.email.val === '' ||
    !formValues.value.email.val.includes('@') ||
    formValues.value.message.val === ''
  ) {
    formValues.value.formIsValid = false
  }
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="email">Your E-Mail</label>
      <input type="email" id="email" v-model.trim="formValues.email.val" />
    </div>
    <div class="form-control">
      <label for="message">Message</label>
      <textarea
        name="message"
        id="message"
        rows="5"
        v-model.trim="formValues.message.val"
      ></textarea>
    </div>
    <p v-if="!formValues.formIsValid">Please enter a valid email and non-empty message.</p>
    <div class="actions">
      <BaseButton>Send Message</BaseButton>
    </div>
  </form>
</template>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
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

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>
