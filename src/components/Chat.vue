<template>
  <div class="chat" v-if="$store.state.companionId >= 0">
    <header class="header spacer">
      <button v-if="!searching" class="button mobile" @click="$parent.setCompanion(-1)">
        <img src="../resources/back.svg" />
      </button>
      <button class="user" v-if="!searching" @click="$parent.openProfile($store.state.companionId)">
        <img
          class="avatar"
          :src="$store.state.users[[$store.state.companionId]].avatar"
          alt="user's avatar"
        />
        <h2 class="name">{{ $store.state.users[[$store.state.companionId]].name }}</h2>
      </button>
      <div class="buttons" v-if="!searching">
        <button class="button" @click="searching = true">
          <img src="../resources/search.svg" />
        </button>
        <button class="button" @click="popup = true">
          <img src="../resources/more.svg" />
        </button>
      </div>
      <div class="flex" v-else>
        <button class="button" @click="searching = false">
          <img src="../resources/back.svg" />
        </button>
        <input class="input" v-model="$store.state.searchMessages" placeholder="Search messages" />
      </div>
    </header>
    <div class="messages">
      <div
        class="message"
        v-for="message in $parent.getMessages($store.state.companionId)"
        :key="message.id"
      >
        <div
          class="bubble"
          :class="message.senderId === $store.state.currentId && 'bubble_current'"
        >
          {{ message.text }}
          <p class="dim">
            {{ $parent.getTime(message.time) }}
          </p>
        </div>
      </div>
    </div>
    <form
      class="form spacer"
      @submit.prevent="
        addMessage(
          $store.state.chats.filter((chat) => chat.id === $store.state.companionId)[0].draft
        )
      "
    >
      <input
        class="input"
        type="text"
        v-model="$store.state.chats.filter((chat) => chat.id === $store.state.companionId)[0].draft"
        placeholder="Enter message"
      />
      <button type="submit" class="button">
        <img src="../resources/send.svg" />
      </button>
    </form>
    <div v-if="popup" class="overlay" @click="popup = false"></div>
    <div v-if="popup" class="menu">
      <button class="button" @click="clearChat()">Clear chat</button>
      <button class="button">Select messages</button>
    </div>
  </div>
  <div v-else class="flex">
    <h2 class="center">Select chat</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searching: false,
      profile: -1,
      popup: false,
    }
  },
  methods: {
    addMessage(text) {
      text && this.$store.commit('addMessage', { text })
      this.$store.commit('setDraft', { text: '' })
      console.log(this.$store.state.chats)
    },
    clearChat() {
      this.$store.commit('clearChat')
      this.$store.commit('toggleOverlay')
    }
  },
}
</script>
<style scoped>
.chat {
  height: 100%;
  width: 70%;
  overflow: hidden;
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
  padding: 10px 5px 10px 10px;
  margin: 2px 12px;
  word-break: break-word;
  white-space: pre-wrap;
  display: grid;
  grid-auto-flow: column;
  gap: 3px;
}

.bubble_current {
  margin-left: auto;
  background-color: #f1f1f1;
}
</style>
