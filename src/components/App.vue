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

.flex {
  display: flex;
  align-items: center;
}

.user {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.name {
  margin-left: 10px;
}

.avatar {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  object-fit: cover;
}

.header {
  height: 50px;
  display: grid;
  grid-auto-flow: column;
  border-bottom: 1px solid gainsboro;
  align-items: center;
  justify-content: space-between;
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
  height: 50px;
  padding: 0 10px;
}

.overlay {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 100;
}

.menu {
  background-color: white;
  border: 1px solid gainsboro;
  width: 200px;
  margin: 10px 10px 10px auto;
}

@media (min-width: 500px) {
  .mobile {
    display: none;
  }
}
</style>
