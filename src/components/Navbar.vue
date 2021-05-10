<template>
  <nav
    class="navbar"
    v-if="($store.state.width <= 600 && $store.state.companionId < 0) || $store.state.width > 600"
  >
    <header class="header spacer">
      <div class="flex" v-if="!searching">
        <button class="button user" @click="popup = true">
          <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="25">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" fill="currentColor" />
          </svg>
          <h1>Messenger</h1>
        </button>
      </div>
      <button v-if="!searching" class="button" @click="searching = true">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="50" width="25">
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
            fill="currentColor"
          />
        </svg>
      </button>
      <div class="flex" v-else>
        <button class="button" @click="searching = false">
          <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="25">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="currentColor"
            />
          </svg>
        </button>
        <input class="input" v-model="$store.state.searchChats" placeholder="Search chats" />
      </div>
    </header>
    <div class="chats">
      <button
        class="link"
        v-for="chat in $parent.getChats()"
        :key="chat.id"
        @click="$parent.setCompanion(chat.id)"
      >
        <img class="avatar" :src="chat.avatar" alt="user's avatar" />
        <div class="column">
          <h3 class="name">{{ chat.name }}</h3>
          <div class="flex spacer">
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
  border-right: 1px solid var(--border-color);
}

.chats {
  height: calc(100% - 50px);
  overflow-x: hidden;
}

.link {
  height: 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  width: 100%;
}

.last {
  color: var(--dim-color);
  margin-left: 10px;
  font-size: 15px;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}

@media (max-width: 600px) {
  .navbar {
    width: 100%;
  }
}
</style>
