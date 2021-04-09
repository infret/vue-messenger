<template>
  <div v-if="$store.state.openedContact" class="overlay" @click="$store.commit('toggleContact')">
    <div class="popup" @click.stop>
      <h1>Add new contact by id</h1>
      <form class="form spacer" @submit.prevent="addContact(value)">
        <input class="input" type="number" v-model.number="value" placeholder="Enter contact id" />
        <button type="submit" class="button">
          <img src="../resources/send.svg" />
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
