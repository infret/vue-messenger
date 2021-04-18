<template>
  <nav
    class="navbar"
    v-if="($store.state.width < 500 && $store.state.companionId < 0) || $store.state.width > 500"
  >
    <header class="header spacer">
      <div class="flex" v-if="!searching">
        <button class="button user" @click="popup = true">
          <img src="../resources/menu.svg" />
          <h1>Messenger</h1>
        </button>
      </div>
      <button v-if="!searching" class="button" @click="searching = true">
        <img src="../resources/search.svg" />
      </button>
      <div class="flex" v-else>
        <button class="button" @click="searching = false">
          <img src="../resources/back.svg" />
        </button>
        <input class="input" v-model="$store.state.searchChats" placeholder="Search chats" />
      </div>
    </header>
    <div class="chats">
      <button
        class="user"
        v-for="chat in getChats()"
        :key="chat.id"
        @click="$parent.setCompanion(chat.id)"
      >
        <img class="avatar" :src="chat.avatar" alt="user's avatar" />
        <div class="link">
          <h3 class="name">{{ chat.name }}</h3>
          <div class="flex">
            <p class="last">{{ chat.lastMessage }}</p>
            <p class="last">{{ $parent.getTime(chat.lastTime) }}</p>
          </div>
        </div>
      </button>
    </div>
    <div v-if="popup" class="overlay" @click="popup = false">
      <div class="menu menu_left">
        <button class="button" @click="$parent.openProfile($store.state.currentId)">
          Profile
        </button>
        <button class="button" @click="$store.commit('toggleSettings')">
          Settings
        </button>
        <button class="button" @click="$store.commit('toggleContact')">
          Add contact
        </button>
        <button class="button" @click="$store.commit('loginUser', -1)">
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      searching: false,
      popup: false
    }
  },
  methods: {
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
        const messages = this.$parent.getMessages(chat.id)
        if (messages.length > 0) {
          const lastMessage = messages[messages.length - 1]
          chat.lastMessage = lastMessage.text || '[Resent message]'
          chat.lastTime = lastMessage.time
        }
      })

      return Array.from(new Set(chats))
    }
  }
}
</script>
<style scoped>
.navbar {
  width: 30%;
  min-width: 300px;
  border-right: 1px solid gainsboro;
}

.menu_left {
  position: relative;
  left: calc(-50% + 110px);
  top: calc(-50% + 110px);
}

.chats {
  height: calc(100% - 50px);
  overflow-y: auto;
}

.link {
  display: flex;
  flex-direction: column;
}

.last {
  color: grey;
  margin-left: 10px;
  font-size: 15px;
}
@media (max-width: 500px) {
  .navbar {
    width: 100%;
  }
}
</style>
