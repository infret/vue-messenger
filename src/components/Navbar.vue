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
        v-for="chat in $parent.getChats()"
        :key="chat.id"
        @click="$parent.setCompanion(chat.id)"
      >
        <img class="avatar" :src="chat.avatar" alt="user's avatar" />
        <div class="link">
          <h3 class="name">{{ chat.name }}</h3>
          <div class="flex">
            <p class="last">{{ chat.lastMessage }}</p>
            <p class="last">{{ lastTime(chat.lastTime) }}</p>
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
    lastTime(time) {
      let date = this.$parent.getDate(time)
      if (date !== this.$parent.getDate(Date.now())) {
        return date
      } else {
        return this.$parent.getTime(time)
      }
    }
  }
}
</script>
<style lang="scss">
.navbar {
  width: 30%;
  min-width: 300px;
  border-right: 1px solid gainsboro;
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
