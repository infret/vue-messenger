<template>
  <div id="app">
    <div class="messages">
      <div class="message" v-for="message in messages" :key="message">
        <div class="bubble">{{ message }}</div>
      </div>
    </div>
    <form class="form" @submit.prevent="addMessage(value)">
      <input class="input" type="text" v-model="value" />
      <button class="button" type="submit"><img src="../resources/send.svg" /></button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {},
  data() {
    return { messages: [] }
  },
  methods: {
    addMessage(text) {
      this.messages.push(text)
      this.value = ''
    }
  }
}
</script>

<style scoped>
#app {
  max-width: 800px;
  margin: 0 auto;
  height: 100vh;
  border-left: 1px solid gainsboro;
  border-right: 1px solid gainsboro;
}

.messages {
  border-bottom: 1px solid gainsboro;
  width: 100%;
  height: calc(100% - 50px);
  overflow-x: auto;
}

.message {
  width: 100%;
  margin: 10px;
  font-size: 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.bubble {
  border: 1px solid gainsboro;
  border-radius: 15px;
  max-width: 320px;
  padding: 10px 14px;
  margin: 2px 12px;
  word-break: break-word;
  white-space: pre-wrap;
}

.form {
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.input {
  height: 100%;
  width: 100%;
  padding: 12px;
}

.button {
}
</style>
