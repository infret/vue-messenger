<template>
  <div class="app">
    <nav class="navbar">
      <div class="header">Chats</div>
      <div class="messages">
        <div class="header" v-for="chat in getChats()" :key="chat">
          <div class="user">{{ chat.name }}</div>
        </div>
      </div>
    </nav>
    <main>
      <div class="header">{{ $store.state.users[$store.state.companionId].name }}</div>
      <div class="messages">
        <div class="message" v-for="message in getMessages()" :key="message">
          <div
            class="bubble"
            :class="message.senderId === $store.state.currentId && 'bubble_current'"
          >
            {{ message.text }}
          </div>
        </div>
      </div>
      <form class="form" @submit.prevent="addMessage(value)">
        <input class="input" type="text" v-model="value" placeholder="Enter message" />
        <button class="button" type="submit"><img src="../resources/send.svg" /></button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return {
      value: ''
    }
  },
  methods: {
    addMessage(text) {
      this.$store.commit('addMessage', { text })
      this.value = ''
    },
    getMessages() {
      let messages = []
      this.$store.state.messages.map(
        (message) =>
          message.senderId === this.$store.state.currentId &&
          message.receiverId === this.$store.state.companionId &&
          messages.push(message)
      )
      this.$store.state.messages.map(
        (message) =>
          message.senderId === this.$store.state.companionId &&
          message.receiverId === this.$store.state.currentId &&
          messages.push(message)
      )
      return messages
    },
    getChats() {
      let chats = []
      this.$store.state.messages.map(
        (message) =>
          message.senderId === this.$store.state.currentId ||
          (message.receiverId === this.$store.state.currentId &&
            chats.push(this.$store.state.users[message.senderId]))
      )
      return chats
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

.app {
  max-width: 1000px;
  margin: 0 auto;
  height: 100vh;
  border-left: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
  display: flex;
}

.navbar {
  width: 400px;
  border-right: 1px solid gainsboro;
}

.chat {
  height: 50px;
}

main {
  height: 100%;
  width: 100%;
}

.header {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
}

.messages {
  border-top: 1px solid gainsboro;
  border-bottom: 1px solid gainsboro;
  height: calc(100% - 100px);
  overflow-y: scroll;
  display: flex;
  flex-direction: column-reverse;
}

.message {
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.bubble {
  border: 1px solid gainsboro;
  border-radius: 15px;
  max-width: 320px;
  padding: 10px 14px;
  margin: 2px 12px;
  word-break: break-word;
  white-space: pre-wrap;
}

.bubble_current {
  margin-left: auto;
  background-color: #f1f1f1;
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
  margin: 10px;
}
</style>
