<template>
  <div>
    <main v-if="$store.state.currentId >= 0">
      <Navbar />
      <Chat />
      <Profile />
      <Settings />
      <ContactDialog />
      <ResendDialog />
    </main>
    <Login v-else />
  </div>
</template>

<script>
import Navbar from './Navbar'
import Chat from './Chat'
import Profile from './Profile'
import Settings from './Settings'
import ContactDialog from './ContactDialog'
import ResendDialog from './ResendDialog'
import Login from './Login'

export default {
  name: 'App',
  components: { Navbar, Chat, Profile, Settings, ContactDialog, Login, ResendDialog },
  created() {
    this.storeChat()
  },
  methods: {
    setCompanion(id) {
      this.$store.commit('setCompanion', { id })
    },
    openProfile(id) {
      this.$store.commit('openProfile', { id })
    },
    getTime(ms) {
      const time = new Date(ms)
      return time
        .toLocaleString('en-GB', {
          hour: 'numeric',
          minute: '2-digit'
        })
        .split(' ')
        .pop()
    },
    getDate(ms) {
      const time = new Date(ms)
      return time.toLocaleString('en-GB', { month: 'short', day: 'numeric' })
    },
    getMessages(id) {
      let messages = []
      const { currentId, messages: storeMessages } = this.$store.state

      storeMessages.forEach((message) => {
        if (message.senderId === currentId && message.receiverId === id) {
          messages.push(message)
        }
      })

      storeMessages.forEach((message) => {
        if (message.receiverId === currentId && message.senderId === id) {
          messages.push(message)
        }
      })

      if (messages.length > 0) {
        if (this.$store.state.searchMessages) {
          messages = messages.filter((message) =>
            message.text.toLowerCase().includes(this.$store.state.searchMessages.toLowerCase())
          )
        }

        messages.sort((a, b) => a.time - b.time)

        let lastDate = this.getDate(messages[0].time)
        let chunks = [lastDate]

        for (let i = 0; i < messages.length; i++) {
          if (this.getDate(messages[i].time) === lastDate) {
            chunks.push(messages[i])
          } else {
            lastDate = this.getDate(messages[i].time)
            chunks.push(lastDate, messages[i])
          }
        }
        return chunks
      }
    },
    storeChat() {
      let chat = this.$store.state.chats.find((chat) => chat.id === this.$store.state.companionId)
      if (!chat) {
        this.$store.state.chats.push({ id: this.$store.companionId, draft: '', selected: [] })
      }
    },
    getChats() {
      let chats = []
      const { messages, users, currentId, searchChats } = this.$store.state

      messages.forEach(({ receiverId, senderId }) => {
        if (receiverId === currentId) chats.push(users[senderId])
        if (senderId === currentId) chats.push(users[receiverId])
      })

      if (searchChats) {
        chats = chats.filter((chat) => chat.name.toLowerCase().includes(searchChats.toLowerCase()))
      }

      chats.map((chat) => {
        const messages = this.getMessages(chat.id)
        if (messages.length > 0) {
          const lastMessage = messages[messages.length - 1]
          chat.lastMessage = lastMessage.text || '[Resent message]'
          chat.lastTime = lastMessage.time
        }
      })

      return Array.from(new Set(chats)).sort((a, b) => b.lastTime - a.lastTime)
    }
  }
}
</script>

<style lang="scss">
:root {
  --fg-color: #333;
  --border-color: gainsboro;
  --bg-color: white;
  --accent-color: #0086ff;
}

@media (prefers-color-scheme: dark) {
  :root {
    --fg-color: #eee;
    --border-color: #555;
    --bg-color: #222;
  }
}

* {
  margin: 0;
  padding: 0;
  border: none;
  outline: none;
  box-sizing: border-box;
  background: transparent;
  font-size: 16px;
  font-family: sans-serif;
  color: var(--fg-color);
  text-decoration: none;
}

h1 {
  margin: 0 10px;
}

button,
.checkbox > input {
  cursor: pointer;
}

input {
  -moz-appearance: textfield;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

main {
  height: 100vh;
  border-left: 1px solid var(--border-color);
  border-right: 1px solid var(--border-color);
  display: flex;
  position: relative;
  background-color: var(--bg-color);
}

.user {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.name {
  margin: 0 10px;
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
  border-bottom: 1px solid var(--border-color);
  align-items: center;
  width: 100%;
}

.flex {
  display: flex;
  align-items: center;
}

.column {
  display: flex;
  flex-direction: column;
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
  background-color: var(--bg-color);
  border: 1px solid var(--border-color);
  width: 200px;
  position: absolute;
  display: flex;
  flex-direction: column;
  align-items: start;
  top: 10px;
  right: 10px;
  z-index: 20;

  &_left {
    left: 10px;
    top: 10px;
  }
}

.dim {
  color: var(--dim-color);
  font-size: 13px;
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
  background-color: #00000055;
  display: flex;
  justify-content: center;
  align-items: center;
}

.popup {
  width: 300px;
  background-color: var(--bg-color);
}

@media (min-width: 600px) {
  .mobile {
    display: none;
  }
}

@media (max-width: 600px) {
  .desktop {
    display: none;
  }
}
</style>
