<template>
  <main>
    <Navbar />
    <Chat />
    <Profile />
    <Settings />
    <ContactDialog />
  </main>
</template>

<script>
import Navbar from './Navbar'
import Chat from './Chat'
import Profile from './Profile'
import Settings from './Settings'
import ContactDialog from './ContactDialog'
export default {
  created() {
    window.addEventListener('resize', this.setWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.setWidth)
  },
  name: 'App',
  components: { Navbar, Chat, Profile, Settings, ContactDialog },
  methods: {
    setWidth() {
      this.$store.state.width = window.innerWidth
    },
    setCompanion(id) {
      this.$store.commit('setCompanion', { id })
    },
    openProfile(id) {
      this.$store.commit('openProfile', { id })
    },
    toggleSettings() {
      this.$store.commit('toggleSettings')
    },
    toggleContactDialog() {
      this.$store.commit('toggleContactDialog')
    },
    getTime(seconds) {
      const time = new Date(seconds * 1000)
      return time
        .toLocaleString('en-GB', {
          hour: 'numeric',
          minute: '2-digit'
        })
        .split(' ')
        .pop()
    },
    getDate(seconds) {
      const time = new Date(seconds * 1000)
      return time.toLocaleString('en-GB', {
        hour: 'numeric',
        minute: '2-digit'
      })
    },
    getMessages(id) {
      let messages = []
      this.$store.state.messages.map(
        (message) =>
          message.senderId === this.$store.state.currentId &&
          message.receiverId === id &&
          messages.push(message)
      )
      this.$store.state.messages.map(
        (message) =>
          message.senderId === id &&
          message.receiverId === this.$store.state.currentId &&
          messages.push(message)
      )
      if (this.$store.state.searchMessages) {
        messages = messages.filter((message) =>
          message.text.toLowerCase().includes(this.$store.state.searchMessages.toLowerCase())
        )
      }
      return messages.sort((a, b) => b.time - a.time)
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
  color: black;
  text-decoration: none;
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
  margin-left: 10px;
  text-align: left;
  display: inline;
}

.avatar {
  border-radius: 50%;
  height: 30px;
  width: 30px;
  object-fit: cover;
}

.header {
  height: 50px;
  display: flex;
  border-bottom: 1px solid gainsboro;
  align-items: center;
  width: 100%;
}

.flex {
  display: flex;
  align-items: center;
  width: 100%;
}

.form {
  height: 50px;
  display: flex;
  align-items: center;
}

.input {
  height: 100%;
  width: 100%;
  padding: 10px;
  display: block;
}

.buttons {
  display: flex;
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

.dim {
  color: grey;
  font-size: 13px;
  margin-left: 10px;
}

.spacer {
  justify-content: space-between;
}

.overlay {
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00000055;
}

.popup {
  width: 300px;
  display: flex;
  flex-direction: column;
  background-color: white;
}

@media (min-width: 500px) {
  .mobile {
    display: none;
  }
}
</style>
