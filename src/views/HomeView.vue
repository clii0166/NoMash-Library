<template>
 
  <div class="row">
    <!-- center the form on large screens -->
    <div class="col-md-8 offset-md-2">
      <h1 class="text-center">W5. Library Registration Form</h1>
      
      <p class="text-center text-muted mb-4">
        Let's build some more advanced features into our form.
      </p>

      <!-- form: prevent native submit, we handle it in submitForm() -->
      <form @submit.prevent="submitForm">
        <!-- Row 1: Username / Gender -->
        <div class="row mb-3">
          <!-- Use 12 columns on xs, 6 columns from >= sm to ensure 2-up at 600px and 900px -->
          <div class="col-12 col-sm-6">
            <label for="username" class="form-label">Username</label>
            <input
              type="text"
              class="form-control"
              id="username"
              v-model="formData.username"
              @blur="() => validateName(true)"
              @input="() => validateName(false)"
            />
            <!-- username error -->
            <div v-if="errors.username" class="text-danger mt-1">
              {{ errors.username }}
            </div>
          </div>

          <div class="col-12 col-sm-6">
            <label for="gender" class="form-label">Gender</label>
            <select id="gender" class="form-select" v-model="formData.gender">
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <!-- Row 2: Password / Confirm password -->
        <div class="row mb-3">
          <div class="col-12 col-sm-6">
            <label for="password" class="form-label">Password</label>
            <input
              type="password"
              class="form-control"
              id="password"
              v-model="formData.password"
              @blur="() => validatePassword(true)"
              @input="() => validatePassword(false)"
            />
            <!-- password error -->
            <div v-if="errors.password" class="text-danger mt-1">
              {{ errors.password }}
            </div>
          </div>

          <!-- Confirm password (blur only) -->
          <div class="col-12 col-sm-6">
            <label for="confirm-password" class="form-label">Confirm password</label>
            <input
              type="password"
              class="form-control"
              id="confirm-password"
              v-model="formData.confirmPassword"
              @blur="() => validateConfirmPassword(true)"
            />
            <!-- confirm password error -->
            <div v-if="errors.confirmPassword" class="text-danger mt-1">
              {{ errors.confirmPassword }}
            </div>
          </div>
        </div>

        <!-- Row 3: Resident -->
        <div class="row mb-3">
          <div class="col-12 col-sm-6">
            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                id="isAustralian"
                v-model="formData.isAustralian"
              />
              <label class="form-check-label" for="isAustralian"> Australian Resident? </label>
            </div>
          </div>
        </div>

        <!-- Row 4: Reason -->
        <div class="mb-3">
          <label for="reason" class="form-label">Reason for joining</label>
          <textarea
            class="form-control"
            id="reason"
            rows="3"
            v-model="formData.reason"
            @blur="() => validateReason(true)"
            @input="() => validateReason(false)"
          ></textarea>

          <!-- red error (min length) -->
          <div v-if="errors.reason" class="text-danger mt-1">{{ errors.reason }}</div>
          <!-- green success (contains 'friend') -->
          <div v-if="reasonFeedback" class="text-success mt-1">{{ reasonFeedback }}</div>
        </div>

        <!-- Row 5: Suburb (one-way binding demo: :value instead of v-model) -->
        <div class="mb-3">
          <label for="suburb" class="form-label">Suburb</label>
          <input
            id="suburb"
            type="text"
            class="form-control"
            :value="formData.suburb"
          />
        </div>

        <!-- Buttons: centered on all sizes -->
        <div class="d-flex justify-content-center gap-2 flex-wrap">
          <button type="submit" class="btn btn-primary">Submit</button>
          <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
        </div>
      </form>

    
      <p class="mt-4 fw-semibold">This is a Primevue Datatable.</p>

      <!-- PrimeVue DataTable -->
      <DataTable
        v-if="submittedRows.length"
        :value="submittedRows"
        class="datatable-full"
        tableStyle="width: 100%; min-width: 0"
        size="small"
      >
        <Column field="username" header="Username" />
        <Column field="password" header="Password" />
        <Column field="isAustralian" header="Australian Resident" />
        <Column field="gender" header="Gender" />
        <Column field="reason" header="Reason" />
      </DataTable>
      <!-- /PrimeVue DataTable -->
    </div>
  </div>
</template>

<script setup>
// Vue reactivity
import { ref } from 'vue'

// PrimeVue components (local registration)
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

// reactive form model
const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',   // NEW: confirm password
  isAustralian: false,
  reason: '',
  gender: '',
  suburb: 'Clayton',     // NEW FIELD for one-way binding demo
})

// submitted rows for DataTable
const submittedRows = ref([])

// error messages (null = no error)
const errors = ref({
  username: null,
  password: null,
  confirmPassword: null, // NEW: confirm password error
  resident: null,
  gender: null,
  reason: null,
})

// green success line for "friend"
const reasonFeedback = ref('')

/**
 * Validate username
 * - at least 3 characters
 */
const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

/**
 * Validate password with common rules:
 * - at least 8 chars, contains upper/lower/number/special
 */
const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*()_+.,?:"{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur) errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur) errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur) errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur) errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur) errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

/**
 * Validate confirm password
 * - blur only: must equal password
 */
const validateConfirmPassword = (blur) => {
  if (!blur) return
  if (formData.value.password !== formData.value.confirmPassword) {
    errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

/**
 * Validate reason:
 * - on input: show green message if it contains 'friend' (case-insensitive)
 * - on blur: show red error if length < 10
 */
const validateReason = (blur) => {
  const txt = formData.value.reason || ''

  // green success whenever it contains 'friend'
  if (/friend/i.test(txt)) {
    reasonFeedback.value = 'Great to have a friend'
  } else {
    reasonFeedback.value = ''
  }

  // red error only when leaving the field
  if (blur) {
    if (txt.trim().length < 10) {
      errors.value.reason = 'Reason must be at least 10 characters'
    } else {
      errors.value.reason = null
    }
  }
}

/**
 * Submit handler:
 * - run all validations (as blur)
 * - push a row when everything is valid
 */
const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateReason(true)

  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.reason
  ) {
    submittedRows.value.push({ ...formData.value })
    clearForm()
  }
}

/** Clear only the form inputs (not the submitted rows) */
const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isAustralian: false,
    reason: '',
    gender: '',
    // NOTE: suburb intentionally omitted to keep only requested two changes
  }
  errors.value.username = null
  errors.value.password = null
  errors.value.confirmPassword = null
  errors.value.reason = null
  reasonFeedback.value = ''
}
</script>

<style scoped>
/* Make DataTable fill the container and avoid horizontal scroll */
.datatable-full {
  width: 100%;
}
/* PrimeVue wrapper sometimes adds overflow-x; relax it for this page */
:deep(.p-datatable-wrapper) {
  overflow-x: visible;
}
/* Optional cosmetic header for any Bootstrap cards you might keep later */
.card-header {
  background-color: #275fda;
  color: #fff;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}
</style>
