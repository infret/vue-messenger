<template>
  <main>
    <Navbar />
    <Chat />
  </main>
</template>

<script>
import Navbar from './Navbar'
import Chat from './Chat'
export default {
  created() {
    window.addEventListener('resize', () => (this.$store.state.width = window.innerWidth))
  },
  destroyed() {
    window.removeEventListener('resize', () => (this.$store.state.width = window.innerWidth))
  },
  name: 'App',
  components: { Navbar, Chat },
  methods: {
    setCompanion(id) {
      this.$store.commit('setCompanion', { id })
    }
  }
}
</script>

<style>
* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
  background: transparent;
  font-size: 16px;
  font-family: sans-serif;
}

h1 {
  margin: 10px;
}
button {
  cursor: pointer;
}

main {
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  border-left: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
  display: flex;
}

.user {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.avatar {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  object-fit: cover;
  margin-right: 10px;
}

.header {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid gainsboro;
}

.form {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input {
  height: 100%;
  width: 100%;
  padding: 10px;
}

.button {
  width: 50px;
  height: 50px;
}

@media (min-width: 500px) {
  .mobile {
    display: none;
  }
}
</style>
