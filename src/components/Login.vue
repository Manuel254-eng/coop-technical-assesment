<template>
    <div class="login-container">
      <!-- Left Section -->
      <div class="login-left">
        <div class="content">
          <img src="../assets/images/farmer.png" alt="Farmer" class="farmer-image" />
        </div>
      </div>
  
      <!-- Right Section -->
      <div class="login-right">
        <div class="login-box">
          <h2>Welcome to</h2>
          <h3>Inua Mkulima - Subsidy Program</h3>
          <p v-if="step === 1">Enter your username to continue</p>
          <p v-if="step === 2">Enter your password to continue</p>
          
          <form @submit.prevent="handleSubmit">
            <!-- Username Field -->
            <div v-if="step === 1" class="form-group">
              <label for="username">Username</label>
              <input
                type="text"
                id="username"
                v-model="username"
                placeholder="Enter your username"
                class="input-field"
                required
              />
              <!-- Error Message for Username -->
              <p v-if="usernameError" class="error-message">{{ usernameError }}</p>
            </div>
            
            <!-- Password Field -->
            <div v-if="step === 2" class="form-group">
              <label for="password">Password</label>
              <div class="input-wrapper">
                <input
                  :type="passwordVisible ? 'text' : 'password'"
                  id="password"
                  v-model="password"
                  placeholder="********"
                  class="input-field"
                  required
                />
                <button type="button" class="toggle-password" @click="togglePasswordVisibility">
                  <span>{{ passwordVisible ? 'Hide' : 'Show' }}</span>
                  <i :class="passwordVisible ? 'fas fa-eye-slash' : 'fas fa-eye'"></i>
                </button>
              </div>
              <!-- Error Message for Password -->
              <p v-if="passwordError" class="error-message">{{ passwordError }}</p>
            </div>
            
            <!-- Submit Button -->
            <button type="submit" class="login-button">{{ step === 1 ? 'Next' : 'Sign In' }}</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script>

  
  export default {
  name: "LoginVue",
  data() {
    return {
      step: 1, // Step 1: Username, Step 2: Password
      username: '',
      password: '',
      passwordVisible: false,
      usernameError: '',
      passwordError: '',
    };
  },
  methods: {
    // Handle form submission
    handleSubmit() {
      // Reset error messages
      this.usernameError = '';
      this.passwordError = '';

      if (this.step === 1) {
        // Validate username
        if (this.username.trim() === '') {
          this.usernameError = "Username can't be empty";
        } else {
          this.step = 2; // Move to the password step
        }
      } else {
        // Validate password
        if (this.password.trim() === '') {
          this.passwordError = "Password can't be empty";
        } else {
          // Use the fetch API for login
          fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: this.username,
                password: this.password,
                expiresInMins: 30,
            }),
            })
            .then((res) => res.json())
            .then((data) => {
            console.log('Login successful:', data);
            localStorage.setItem('access_token', data.token);
            localStorage.setItem('firstName', data.firstName);
            this.$router.push('/dashboard');
            })
            .catch((error) => {
            console.error('Login failed:', error);
            this.passwordError = 'An error occurred. Please try again later.';
            });

        }
      }
    },
    
    // Toggle password visibility
    togglePasswordVisibility() {
      this.passwordVisible = !this.passwordVisible;
    }
  }
};

  </script>
  
  <style scoped>
  .error-message {
    color: red;
    font-size: 0.875rem;
    margin-top: 5px;
  }
  .input-wrapper {
    position: relative;
  }
  
  .toggle-password {
    position: absolute;
    right: 10px;
    top: 50%;
    transform: translateY(-50%);
    background: transparent;
    border: none;
    cursor: pointer;
  }
  
  .toggle-password i {
    font-size: 1.2rem;
  }
  
  .toggle-password span {
    margin-right: 5px;
  }
  </style>
  