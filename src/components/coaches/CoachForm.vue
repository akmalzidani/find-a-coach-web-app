<script setup>
import { ref } from 'vue'

const formValues = ref({
  firstName: '',
  lastName: '',
  description: '',
  rate: null,
  areas: []
})

const emit = defineEmits(['save-data'])

const submitForm = () => {
  const formData = {
    first: formValues.value.firstName,
    last: formValues.value.lastName,
    desc: formValues.value.description,
    rate: formValues.value.rate,
    areas: formValues.value.areas
  }

  emit('save-data', formData)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control">
      <label for="firstname">Firstname</label>
      <input type="text" id="firstname" v-model.trim="formValues.firstName" />
    </div>
    <div class="form-control">
      <label for="lastname">Lastname</label>
      <input type="text" id="lastname" v-model.trim="formValues.lastName" />
    </div>
    <div class="form-control">
      <label for="description">Description</label>
      <textarea type="text" id="description" rows="5" v-model.trim="formValues.description" />
    </div>
    <div class="form-control">
      <label for="rate">Hourly Rate</label>
      <input type="number" id="rate" v-model.number="formValues.rate" />
    </div>
    <div class="form-control">
      <h3>Areas of Expertise</h3>
      <div>
        <input type="checkbox" v-model="formValues.areas" id="frontend" value="frontend" />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input type="checkbox" v-model="formValues.areas" id="backend" value="backend" />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input type="checkbox" v-model="formValues.areas" id="career" value="career" />
        <label for="career">Career Advisory</label>
      </div>
    </div>
    <BaseButton>Register</BaseButton>
  </form>
</template>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}

.invalid label {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
