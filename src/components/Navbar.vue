<template>
  <nav
    class="navbar"
    v-if="($store.state.width < 500 && $store.state.companionId < 0) || $store.state.width > 500"
  >
    <header class="header">
      <h1 v-if="!searching">Chats</h1>
      <div class="flex" v-if="!searching">
        <button class="button" @click="searching = true">
          <img src="../resources/search.svg" />
        </button>
        <button class="button user">
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
      <button
        class="user"
        v-for="chat in getChats()"
        :key="chat.id"
        @click="$parent.setCompanion(chat.id)"
      >
        <img class="avatar" :src="chat.avatar" alt="user's avatar" />
        <h3 class="name">{{ chat.name }}</h3>
      </button>
    </div>
  </nav>
</template>
<script>
export default {
  data() {
    return {
      searchBy: '',
      searching: false
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
      return chats.filter((value, index, self) => self.indexOf(value) === index)
    }
  }
}
</script>
<style scoped>
.navbar {
  width: 100%;
  max-width: 300px;
  border-right: 1px solid gainsboro;
}
.chats {
  height: calc(100% - 50px);
  overflow-y: auto;
}

@media (max-width: 500px) {
  .navbar {
    max-width: 100%;
  }
}
</style>
