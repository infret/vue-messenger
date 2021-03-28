<template>
  <div class="chat">
    <header class="header">
      <router-link v-if="!searching" class="button mobile" to="/" exact>
        <img src="../resources/back.svg" />
      </router-link>
      <div class="user" v-if="!searching" @click="profile = id">
        <img class="avatar" :src="$store.state.users[id].avatar" alt="user's avatar" />
        <h2 class="name">{{ $store.state.users[id].name }}</h2>
      </div>
      <div class='flex right' v-if="!searching">
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
      <div class="message" v-for="message in $parent.getMessages(id)" :key="message.id">
        <div
          class="bubble"
          :class="message.senderId === $store.state.currentId && 'bubble_current'"
        >
          {{ message.text }}
          <p class="text_dimmed">
            {{ $parent.getTime(message.time) }}
          </p>
        </div>
      </div>
    </div>
    <form class="form" @submit.prevent="addMessage(value, id)">
      <input class="input" type="text" v-model="value" placeholder="Enter message" />
      <button type="submit" class="button">
        <img src="../resources/send.svg" />
      </button>
    </form>
    <div v-if="popup" class="overlay" @click="popup = false"></div>
    <div v-if="popup" class="menu">
      <button class="button" @click="clearChat(id)">Clear chat</button>
      <button class="button">Select messages</button>
    </div>
    <div v-if="profile >= 0" class="overlay" @click="profile = -1">
      <div class="profile">
        <img class="avatar_big" :src="$store.state.users[id].avatar" alt="user's avatar" />
        <h2 class="name">{{ $store.state.users[id].name }}</h2>
        <p class="text_dimmed">id{{ $store.state.users[id].id }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: '',
      searching: false,
      profile: -1,
      popup: false
    }
  },
  methods: {
    addMessage(text, id) {
      this.$store.commit('addMessage', { text, id })
      this.value = ''
    },
    clearChat(id) {
      this.$store.commit('clearChat', { id })
      this.$store.commit('toggleOverlay')
    }
  },
  computed: {
    id: function() {
      return parseInt(
        window.location.pathname.substring(window.location.pathname.lastIndexOf('/') + 1)
      )
    }
  }
}
</script>
<style scoped>
.chat {
  height: 100%;
  width: 70%;
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

.profile {
  width: 300px;
  height: 400px;
  margin: auto;
  background-color: white;
  border: 1px solid gainsboro;
}

.avatar_big {
  height: 300px;
  width: 300px;
  object-fit: cover;
}
</style>
