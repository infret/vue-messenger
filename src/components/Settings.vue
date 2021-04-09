<template>
  <div
    v-if="$store.state.isSettingsOpen"
    class="overlay"
    @click="toggleSettings"
  >
    <div class="popup" @click.stop>
      <p class="label">Username:</p>
      <form class="form spacer">
        <input class="input" type="text" v-model="currentUser.name" />
        <img src="../resources/edit.svg" class="button" />
      </form>

      <p class="label">Status:</p>
      <form class="form spacer">
        <input class="input" type="text" v-model="currentUser.status" />
        <img src="../resources/edit.svg" class="button" />
      </form>

      <p class="label">Avatar:</p>
      <form class="form spacer">
        <input class="input" type="text" v-model="currentUser.avatar" />
        <img src="../resources/edit.svg" class="button" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    toggleSettings() {
      this.$store.commit('toggleSettings');
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.users[this.$store.state.currentId];
    }
  }
};
</script>

<style scoped>
.label {
  margin: 10px 0 0 10px;
}
</style>
