<template>
  <div v-if="$store.state.openedSettings" class="overlay" @click="$parent.toggleSettings()">
    <div class="popup" @click.stop>
      <p class="label">Username:</p>

      <form class="form spacer">
        <input
          class="input"
          type="text"
          v-model="$store.state.users[$store.state.currentId].name"
        />
        <img src="../resources/edit.svg" class="button" />
      </form>
      <p class="label">Status:</p>
      <form class="form spacer">
        <input
          class="input"
          type="text"
          v-model="$store.state.users[$store.state.currentId].status"
        />
        <img src="../resources/edit.svg" class="button" />
      </form>
      <p class="label">Avatar:</p>
      <form class="form spacer">
        <input
          class="input"
          type="text"
          v-model="$store.state.users[$store.state.currentId].avatar"
        />
        <img src="../resources/edit.svg" class="button" />
      </form>
    </div>
  </div>
</template>

<style scoped>
.label {
  margin: 10px 0 0 10px;
}
</style>
