<template>
  <div v-if="$store.state.isSettingsOpen" class="overlay" @click="toggleSettings">
    <div class="popup" @click.stop>
      <p class="label">Username:</p>
      <form class="form spacer">
        <input class="input" type="text" v-model="currentUser.name" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="50"
          viewBox="0 0 24 24"
          width="25"
          fill="currentColor"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
        </svg>
      </form>

      <p class="label">Status:</p>
      <form class="form spacer">
        <input class="input" type="text" v-model="currentUser.status" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="50"
          viewBox="0 0 24 24"
          width="25"
          fill="currentColor"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
        </svg>
      </form>

      <p class="label">Avatar:</p>
      <form class="form spacer">
        <input class="input" type="text" v-model="currentUser.avatar" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="50"
          viewBox="0 0 24 24"
          width="25"
          fill="currentColor"
        >
          <path d="M0 0h24v24H0z" fill="none" />
          <path
            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
          />
        </svg>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleSettings() {
      this.$store.commit('toggleSettings')
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.users[this.$store.state.currentId]
    }
  }
}
</script>
<style lang="scss">
.label {
  margin: 10px 0 0 10px;
}
</style>
