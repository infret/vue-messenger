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
    window.addEventListener('resize', this.setWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.setWidth)
  },
  name: 'App',
  components: { Navbar, Chat },
  methods: {
    setWidth() {
      this.$store.state.width = window.innerWidth
    },
    setCompanion(id) {
      this.$store.commit('setCompanion', { id })
    },
    getTime(time) {
      const date = new Date(time * 1000)
      return date.toLocaleString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit'
      })
    },
    getDate() {}
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
  height: 100vh;
  border-left: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
  display: flex;
  position: relative;
}

.flex {
  display: flex;
  align-items: center;
  width: 100%;
}

.center {
  margin: auto;
}

.user {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.name {
  margin: 10px;
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

.menu {
  background-color: white;
  border: 1px solid gainsboro;
  width: 200px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  top: 10px;
  right: 10px;
  z-index: 20;
}

.text_dimmed {
  color: grey;
  font-size: 13px;
  justify-self: end;
  align-self: end;
}

.overlay {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
}

@media (min-width: 500px) {
  .mobile {
    display: none;
  }
}
</style>
