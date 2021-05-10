<template>
  <div class="chat" v-if="$store.state.companionId >= 0">
    <header class="header spacer">
      <div class="flex">
        <button v-if="!searching" class="button mobile" @click="$parent.setCompanion(-1)">
          <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="25">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button
          class="user"
          v-if="!searching"
          @click="$parent.openProfile($store.state.companionId)"
        >
          <img
            class="avatar"
            :src="$store.state.users[[$store.state.companionId]].avatar"
            alt="user's avatar"
          />
          <h2 class="name">
            {{ $store.state.users[[$store.state.companionId]].name }}
          </h2>
        </button>
      </div>
      <div class="buttons" v-if="!searching">
        <button
          v-if="
            selecting &&
              $store.state.chats.find((chat) => chat.id === $store.state.companionId).selected
                .length > 0
          "
          class="button"
          @click="toggleResend()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="50"
            viewBox="0 0 24 24"
            width="25"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0V0z" fill="none" />
            <path d="M10 9V5l-7 7 7 7v-4.1c5 0 8.5 1.6 11 5.1-1-5-4-10-11-11z" />
          </svg>
        </button>
        <button
          v-if="
            selecting &&
              $store.state.chats.find((chat) => chat.id === $store.state.companionId).selected
                .length > 0
          "
          class="button"
          @click="deleteMessages()"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="50"
            viewBox="0 0 24 24"
            width="25"
            fill="currentColor"
          >
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"
            />
          </svg>
        </button>
        <button class="button" @click="searching = true">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" height="50" width="25">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              fill="currentColor"
            />
          </svg>
        </button>
        <button class="button" @click="popup = true">
          <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="25">
            <path d="M0 0h24v24H0z" fill="none" />
            <path
              d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
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
        <input class="input" v-model="$store.state.searchMessages" placeholder="Search messages" />
      </div>
    </header>
    <div class="messages">
      <div
        class="message"
        v-for="(message, index) in $parent.getMessages($store.state.companionId)"
        :key="index"
      >
        <input
          class="checkbox"
          @click="$store.commit('selectMessage', { message })"
          :class="{ checkbox_checked: isSelected(message) }"
          v-if="typeof message !== 'string' && selecting"
          type="checkbox"
        />
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
            'bubble bubble_resent',
            { bubble_current: message.senderId === $store.state.currentId }
          ]"
        >
          <div v-for="(resent, index) in message.messages" :key="index" class="message_resent">
            <div class="flex">
              <img
                class="avatar"
                :src="$store.state.users[resent.senderId].avatar"
                alt="user's avatar"
              />
              <div class="margin">
                <button @click="$parent.setCompanion(resent.senderId)">
                  {{ $store.state.users[resent.senderId].name }}
                </button>
                <p class="dim time">
                  {{ $parent.getDate(resent.time) + ' ' + $parent.getTime(resent.time) }}
                </p>
              </div>
            </div>
            <p class="margin">{{ resent.text }}</p>
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
        <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="25">
          <path d="M0 0h24v24H0z" fill="none" />
          <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
        </svg>
      </button>
    </form>
    <div v-if="popup" class="overlay" @click="popup = false"></div>
    <div v-if="popup" class="menu">
      <button class="button" @click="clearChat()">Clear chat</button>
      <button class="button" @click="toggleSelect()">Select messages</button>
    </div>
  </div>
  <div v-else class="flex desktop">
    <h2>Select chat</h2>
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
    toggleResend() {
      this.$store.commit('toggleResend')
      this.toggleSelect()
    }
  },
  computed: {
    draft: {
      get() {
        let chat = this.$parent.storeChat()
        let result = ''
        if (chat) {
          let draft = chat.draft
          if (draft) {
            result = draft
          }
        }
        return result
      },
      set(text) {
        this.$store.commit('setDraft', { text })
      }
    }
  }
}
</script>
<style lang="scss">
.chat {
  height: 100%;
  width: 70%;
  overflow: hidden;
}

.messages {
  border-bottom: 1px solid var(--border-color);
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

  &_resent {
    width: 100%;
    border-left: 3px solid white;
    padding: 0 10px;
    margin: 5px 0;

    * {
      color: white;
    }
  }
}

.bubble {
  background-color: var(--border-color);
  border-radius: 15px 15px 15px 0;
  max-width: 320px;
  padding: 10px 5px 10px 10px;
  margin: 2px 12px;
  word-break: break-word;
  white-space: pre-wrap;
  display: flex;

  &_resent {
    flex-direction: column;
  }

  &_current {
    margin-left: auto;
    background-color: var(--accent-color);
    color: white;
    border-radius: 15px 15px 0 15px;
  }
}

.margin {
  margin: 2px 5px;
}

.checkbox {
  display: inline-flex;
  align-items: center;
  position: relative;
  height: 20px;
  width: 20px;
  appearance: none;
  border: 2px solid var(--border-color);
  border-radius: 50%;
  margin-left: 10px;

  &_checked {
    background-color: var(--dim-color);
  }
}

.date {
  text-align: center;
  width: 100%;
  margin: 10px 0;
  color: var(--dim-color);
}

.time {
  align-self: end;
}

@media (max-width: 600px) {
  .chat {
    width: 100%;
  }
}
</style>
