<template>
  <nav class="navbar" v-if="$store.state.width > 500">
    <header class="header">
      <h1 v-if="!searching">Messenger</h1>
      <div class="flex right" v-if="!searching">
        <button class="button" @click="searching = true">
          <img src="../resources/search.svg" />
        </button>
        <button class="button user" @click="popup = true">
          <img
            class="avatar"
            :src="$store.state.users[$store.state.currentId].avatar"
            alt="your avatar"
          />
        </button>
      </div>
      <div class="flex" v-else>
        <button class="button" @click="searching = false">
          <img src="../resources/back.svg" />
        </button>
        <input class="input" v-model="searchBy" placeholder="Search chats" />
      </div>
    </header>
    <div class="chats">
      <router-link
        class="user"
        v-for="chat in getChats()"
        :key="chat.id"
        :to="{ path: '/chat/' + chat.id }"
      >
        <img class="avatar" :src="chat.avatar" alt="user's avatar" />
        <div class="link">
          <h3 class="name">{{ chat.name }}</h3>
          <div class="flex">
            <p class="last">{{ chat.lastMessage }}</p>
            <p class="last">{{ $parent.getTime(chat.lastTime) }}</p>
          </div>
        </div>
      </router-link>
    </div>
    <div v-if="popup" class="overlay" @click="popup = false">
      <div class="menu">
        <button class="button">Profile</button>
        <button class="button">Settings</button>
        <button class="button">Add contact</button>
        <button class="button">Logout</button>
      </div>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      searchBy: '',
      searching: false,
      popup: false
    }
  },
  methods: {
    getChats() {
      let chats = []
      this.$store.state.messages.map(
        (message) =>
          message.receiverId === this.$store.state.currentId &&
          chats.push(this.$store.state.users[message.senderId])
      )
      this.$store.state.messages.map(
        (message) =>
          message.senderId === this.$store.state.currentId &&
          chats.push(this.$store.state.users[message.receiverId])
      )
      if (this.searchBy) {
        chats = chats.filter((chat) =>
          chat.name.toLowerCase().includes(this.searchBy.toLowerCase())
        )
      }
      chats.map((chat) => {
        chat.lastMessage = this.$parent.getMessages(chat.id)[length].text
        chat.lastTime = this.$parent.getMessages(chat.id)[length].time
      })
      return chats.filter((value, index, self) => self.indexOf(value) === index)
    }
  }
}
</script>
<style scoped>
.navbar {
  width: 30%;
  max-width: 500px;
  border-right: 1px solid gainsboro;
  position: relative;
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
    max-width: 100%;
  }
}
</style>
