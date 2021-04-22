<template>
  <div v-if="isShown" class="overlay" @click="$parent.openProfile(-1)">
    <div class="popup">
      <img class="profile_avatar" :src="openedProfileUser.avatar" alt="user's avatar" />
      <div class="profile_desc">
        <div class="flex">
          <h2 class="name">{{ openedProfileUser.name }}</h2>
          <p class="dim">id{{ openedProfileUser.id }}</p>
        </div>
        <p class="name">{{ openedProfileUser.status }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    isShown() {
      return this.$store.state.openedProfile >= 0
    },
    openedProfileUser() {
      return this.$store.state.users[this.$store.state.openedProfile]
    }
  }
}
</script>