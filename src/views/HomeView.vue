<template>
  <div class="container my-5">
    <header class="text-center">
      <h1>Welcome to Calculator Game!</h1>
      <p class="lead">A math-based game that will help you learn!</p>
    </header>
    <main>
      <section class="my-5">
        <h2>About the Game</h2>
        <p>This game challenges you to solve increasingly complex math problems within a limited time frame. Each time you make a query, a value will be deducted from your credits.</p>
        <p>Join us now and we will give you 200 tokens as a welcome</p>
      </section>
    </main>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'HomeView',
  components: {
  },
  mounted() {
    this.auth();
  },
  methods: {
    auth(){
        if (localStorage.token) {
            this.$store.commit('setIsLoggedIn', true);
        }else{
            this.$store.commit('setIsLoggedIn', false);
        }
    }
  }
  
}
</script>