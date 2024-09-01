<script setup>
import { ref } from 'vue'

const formValues = ref({
  firstName: {
    val: '',
    isValid: true
  },
  lastName: {
    val: '',
    isValid: true
  },
  description: {
    val: '',
    isValid: true
  },
  rate: {
    val: null,
    isValid: true
  },
  areas: {
    val: [],
    isValid: true
  },
  formIsValid: true
})

const emit = defineEmits(['save-data'])

const clearValidity = (field) => {
  formValues.value[field].isValid = true
}

const validateForm = () => {
  formValues.value.formIsValid = true
  if (formValues.value.firstName.val.trim() === '') {
    formValues.value.firstName.isValid = false
    formValues.value.formIsValid = false
  }
  if (formValues.value.lastName.val.trim() === '') {
    formValues.value.lastName.isValid = false
    formValues.value.formIsValid = false
  }
  if (formValues.value.description.val.trim() === '') {
    formValues.value.description.isValid = false
    formValues.value.formIsValid = false
  }
  if (
    formValues.value.rate.val === null ||
    formValues.value.rate.val < 0 ||
    !formValues.value.rate.val
  ) {
    formValues.value.rate.isValid = false
    formValues.value.formIsValid = false
  }
  if (formValues.value.areas.val.length === 0) {
    formValues.value.areas.isValid = false
    formValues.value.formIsValid = false
  }
}

const submitForm = () => {
  validateForm()

  if (!formValues.value.formIsValid) {
    return
  }

  const formData = {
    first: formValues.value.firstName.val,
    last: formValues.value.lastName.val,
    desc: formValues.value.description.val,
    rate: formValues.value.rate.val,
    areas: formValues.value.areas.val
  }

  emit('save-data', formData)
}
</script>

<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !formValues.firstName.isValid }">
      <label for="firstname">Firstname</label>
      <input
        type="text"
        id="firstname"
        v-model.trim="formValues.firstName.val"
        @input="clearValidity('firstName')"
      />
      <p v-if="!formValues.firstName.isValid">Firstname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !formValues.lastName.isValid }">
      <label for="lastname">Lastname</label>
      <input
        type="text"
        id="lastname"
        v-model.trim="formValues.lastName.val"
        @input="clearValidity('lastName')"
      />
      <p v-if="!formValues.lastName.isValid">Lastname must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !formValues.description.isValid }">
      <label for="description">Description</label>
      <textarea
        type="text"
        id="description"
        rows="5"
        v-model.trim="formValues.description.val"
        @input="clearValidity('description')"
      />
      <p v-if="!formValues.description.isValid">Description must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !formValues.rate.isValid }">
      <label for="rate">Hourly Rate</label>
      <input
        type="number"
        id="rate"
        v-model.number="formValues.rate.val"
        @input="clearValidity('rate')"
      />
      <p v-if="!formValues.rate.isValid">Rate must be greater than 0.</p>
    </div>
    <div class="form-control" :class="{ invalid: !formValues.areas.isValid }">
      <h3>Areas of Expertise</h3>
      <div>
        <input
          type="checkbox"
          v-model="formValues.areas.val"
          @change="clearValidity('areas')"
          id="frontend"
          value="frontend"
        />
        <label for="frontend">Frontend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          v-model="formValues.areas.val"
          @change="clearValidity('areas')"
          id="backend"
          value="backend"
        />
        <label for="backend">Backend Development</label>
      </div>
      <div>
        <input
          type="checkbox"
          v-model="formValues.areas.val"
          @change="clearValidity('areas')"
          id="career"
          value="career"
        />
        <label for="career">Career Advisory</label>
      </div>
      <p v-if="!formValues.areas.isValid">At least one expertise must be selected.</p>
    </div>
    <p v-if="!formValues.formIsValid">Please fix the above errors and submit again.</p>
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
