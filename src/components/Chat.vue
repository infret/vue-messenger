<template>
  <div class="chat" v-if="$store.state.companionId >= 0">
    <header class="header spacer">
      <button v-if="!searching" class="button mobile" @click="$parent.setCompanion(-1)">
        <img src="../resources/back.svg" />
      </button>
      <button class="user" v-if="!searching" @click="$parent.openProfile($store.state.companionId)">
        <img
          class="avatar"
          :src="$store.state.users[[$store.state.companionId]].avatar"
          alt="user's avatar"
        />
        <h2 class="name">
          {{ $store.state.users[[$store.state.companionId]].name }}
        </h2>
      </button>
      <div class="buttons" v-if="!searching">
        <button
          v-if="selecting || $parent.storeChat().selected.length > 0"
          class="button"
          @click="resendMessages()"
        >
          <img src="../resources/resend.svg" />
        </button>
        <button
          v-if="selecting || $parent.storeChat().selected.length > 0"
          class="button"
          @click="deleteMessages()"
        >
          <img src="../resources/delete.svg" />
        </button>
        <button class="button" @click="searching = true">
          <img src="../resources/search.svg" />
        </button>
        <button class="button" @click="popup = true">
          <img src="../resources/more.svg" />
        </button>
      </div>
      <div class="flex" v-else>
        <button class="button" @click="searching = false">
          <img src="../resources/back.svg" />
        </button>
        <input class="input" v-model="$store.state.searchMessages" placeholder="Search messages" />
      </div>
    </header>
    <div class="messages">
      <div
        class="message"
        v-for="(message, index) in $parent.getMessages($store.state.companionId)"
        :key="index"
      >
        <label
          class="checkbox"
          @click="$store.commit('selectMessage', { message })"
          :class="{ checkbox_checked: isSelected(message) }"
          v-if="typeof message !== 'string' && selecting"
        >
          <input type="checkbox" />
        </label>
        <div
          v-if="typeof message !== 'string' && !message.messages"
          :class="['bubble', { bubble_current: message.senderId === $store.state.currentId }]"
        >
          {{ message.text }}
          <p class="dim time">
            {{ $parent.getTime(message.time) }}
          </p>
        </div>
        <div
          v-if="typeof message !== 'string' && message.messages"
          :class="[
            'bubble_resent',

            { bubble_current: message.senderId === $store.state.currentId }
          ]"
        >
          <div v-for="(resent, index) in message.messages" :key="index" class="message_resent">
            <div class="flex">
              <img
                class="avatar avatar_resent"
                :src="$store.state.users[resent.senderId].avatar"
                alt="user's avatar"
              />
              <div>
                <button @click="$parent.setCompanion(resent.senderId)">
                  {{ $store.state.users[resent.senderId].name }}
                </button>
                <p class="dim time margin_resent">
                  {{ $parent.getDate(resent.time) + ' ' + $parent.getTime(resent.time) }}
                </p>
              </div>
            </div>
            <p class="margin_resent">{{ resent.text }}</p>
          </div>
          <p class="dim time">
            {{ $parent.getTime(message.time) }}
          </p>
        </div>
        <div v-if="typeof message === 'string'" class="date">
          {{ message }}
        </div>
      </div>
    </div>
    <form class="form spacer" @submit.prevent="addMessage(draft)">
      <input class="input" type="text" v-model="draft" placeholder="Enter message" />
      <button type="submit" class="button">
        <img src="../resources/send.svg" />
      </button>
    </form>
    <div v-if="popup" class="overlay" @click="popup = false"></div>
    <div v-if="popup" class="menu">
      <button class="button" @click="clearChat()">Clear chat</button>
      <button class="button" @click="toggleSelect()">Select messages</button>
    </div>
  </div>
  <div v-else class="flex">
    <h2 class="center">Select chat</h2>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searching: false,
      profile: -1,
      popup: false,
      selecting: false
    }
  },
  methods: {
    addMessage(text) {
      text && this.$store.commit('addMessage', { text })
      this.$store.commit('setDraft', { text: '' })
    },
    clearChat() {
      this.$store.commit('clearChat')
      this.popup = false
    },
    toggleSelect() {
      this.selecting = !this.selecting
      this.popup = false
    },
    isSelected(message) {
      let chat = this.$parent.storeChat()
      if (chat && chat.selected.includes(message)) {
        return true
      } else return false
    },
    deleteMessages() {
      this.$store.commit('deleteMessages')
      this.selecting = false
    },
    resendMessages() {
      this.$store.commit('resendMessages')
      this.selecting = false
    }
  },
  computed: {
    draft: {
      get() {
        return this.$parent.storeChat().draft
      },
      set(text) {
        this.$store.commit('setDraft', { text })
      }
    }
  }
}
</script>
<style scoped>
.chat {
  height: 100%;
  width: 70%;
  overflow: hidden;
}

.messages {
  border-bottom: 1px solid gainsboro;
  height: calc(100% - 100px);
  overflow-y: auto;
  display: flex;
  flex-direction: column;
}

.message {
  width: 100%;
  margin-bottom: 10px;
  font-size: 16px;
  display: flex;
  align-items: center;
}

.avatar_resent {
  margin-right: 10px;
}

.bubble_resent {
  border: 1px solid gainsboro;
  border-radius: 15px;
  max-width: 320px;
  padding: 10px 5px 10px 10px;
  margin: 2px 12px;
  display: flex;
  flex-direction: column;
}

.message_resent {
  width: 100%;
  border-left: 3px solid grey;
  padding: 0 10px;
  margin: 5px 0;
}

.margin_resent {
  margin-top: 5px;
}

.bubble {
  border: 1px solid gainsboro;
  border-radius: 15px;
  max-width: 320px;
  padding: 10px 5px 10px 10px;
  margin: 2px 12px;
  word-break: break-word;
  white-space: pre-wrap;
  display: grid;
  grid-auto-flow: column;
  gap: 3px;
}

.bubble_current {
  margin-left: auto;
  background-color: #f1f1f1;
}

.date {
  text-align: center;
  width: 100%;
  margin: 10px 0;
  color: grey;
}

.time {
  align-self: end;
}
</style>
