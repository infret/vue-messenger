<template>
  <div v-if="$store.state.isContactOpen" class="overlay" @click="$store.commit('toggleContact')">
    <div class="popup" @click.stop>
      <h1>Add new contact by id</h1>
      <form class="form spacer" @submit.prevent="addContact(value)">
        <input class="input" type="number" v-model.number="value" placeholder="Enter contact id" />
        <button type="submit" class="button">
          <svg xmlns="http://www.w3.org/2000/svg" height="50" viewBox="0 0 24 24" width="25">
            <path d="M0 0h24v24H0z" fill="none" />
            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" fill="currentColor" />
          </svg>
        </button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { value: null }
  },
  methods: {
    addContact(value) {
      this.$parent.setCompanion(value)
      this.$store.commit('toggleContact')
    }
  }
}
</script>
