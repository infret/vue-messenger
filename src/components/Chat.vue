<template>
  <div class="chat" v-if="$store.state.companionId >= 0">
    <header class="header">
      <button v-if="!searching" class="button mobile" @click="$parent.setCompanion(-1)">
        <img src="../resources/back.svg" />
      </button>
      <div class="user" v-if="!searching">
        <img
          class="avatar"
          :src="$store.state.users[$store.state.companionId].avatar"
          alt="user's avatar"
        />
        <h2 class="name">{{ $store.state.users[$store.state.companionId].name }}</h2>
      </div>
      <div class="flex" v-if="!searching">
        <button class="button" @click="searching = true">
          <img src="../resources/search.svg" />
        </button>
        <button class="button" @click="overlay = true">
          <img src="../resources/more.svg" />
        </button>
      </div>
      <div class="flex" v-else>
        <button class="button" @click="searching = false">
          <img src="../resources/back.svg" />
        </button>
        <input class="input" v-model="searchBy" placeholder="Search messages" />
      </div>
    </header>
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
    <div class="form">
      <input class="input" type="text" v-model="value" placeholder="Enter message" />
      <button class="button" @click="addMessage(value)">
        <img src="../resources/send.svg" />
      </button>
    </div>
    <div v-if="overlay" class="overlay" @click="overlay = false">
      <div class="menu">
        <button class="button" @click="clearChat()">Clear chat</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      searchBy: '',
      searching: false,
      overlay: false
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
      if (this.searchBy) {
        messages = messages.filter((message) =>
          message.text.toLowerCase().includes(this.searchBy.toLowerCase)
        )
      }
      return messages.sort((a, b) => b.date - a.date)
    },
    clearChat() {
      this.$store.commit('clearChat')
    }
  }
}
</script>
<style scoped>
.chat {
  height: 100%;
  width: 100%;
  max-width: 700px;
  overflow: hidden;
  position: relative;
}
.messages {
  border-bottom: 1px solid gainsboro;
  height: calc(100% - 100px);
  overflow-y: auto;
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
</style>
