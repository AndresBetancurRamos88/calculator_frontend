<template>
  <div>
    <div class="d-flex flex-wrap align-items-center fixed-top justify-content-center justify-content-lg-start navbar bg-dark" >
      <div class="container">
        <router-link class="navbar-brand text-white" to="/">
          <img src="@/assets/calculator.png" alt="Logo" width="30" height="30" class="d-inline-block align-text-top" />
          Calculator games
        </router-link>
      
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
          <li><router-link to="/" class="nav-link px-2 text-white" href="#">Home</router-link></li>
          <li v-if="this.isLoggedIn"><router-link to="/play" class="nav-link px-2 text-white" href="#">Play</router-link></li>
          <li v-if="this.isLoggedIn"><router-link to="/dashboard" class="nav-link px-2 text-white" href="#">Dashboard</router-link></li>
        </ul>
        
        <div class="text-end d-flex align-items-center">
          <router-link v-if="this.isLoggedIn" to="/" class="dropdown-item text-white me-3">{{ this.getUsername }}</router-link>
          <router-link v-if="!this.isLoggedIn" to="/login" class="btn btn-outline-light me-2">Login</router-link>
          <router-link v-if="this.isLoggedIn" to="/logout" class="btn btn-warning" >Logout</router-link>
        </div>
      </div>
    </div>
  </div>

  <div class="container-fluid mb-5" style="padding-top: 80px; padding-bottom: 40px;">
    <router-view></router-view>
  </div>

  <div>
      <footer>
          <div class="container">
              <p class="text-center">Copyright &copy; 2023 Calculator games
              <br> All rights reserved.</p>
          </div>
      </footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters(['isLoggedIn']),
    getUsername() {
      return this.$store.getters.getUsername;
    },
  }
}
</script>


<style>
footer {
    position: fixed;
    height: 70px;
    bottom: 0;
    width: 100%;
    background-color:  black;
    color: white;
}
</style>
