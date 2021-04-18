<template>
  <div v-if="$store.state.isResendOpen" class="overlay" @click="$store.commit('toggleResend')">
    <div class="popup" @click.stop>
      <h1>Select who to resend</h1>
      <button
        class="user"
        v-for="chat in $parent.getChats()"
        :key="chat.id"
        @click="resendMessage(chat.id)"
      >
        <img class="avatar" :src="chat.avatar" alt="user's avatar" />
        <div class="link">
          <h3 class="name">{{ chat.name }}</h3>
        </div>
      </button>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    resendMessage(id) {
      this.$store.commit('resendMessages', { id })
      this.$parent.setCompanion(id)
      this.$store.commit('toggleResend')
    }
  }
}
</script>
