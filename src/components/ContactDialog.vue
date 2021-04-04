<template>
  <div v-if="$store.state.openedContact" class="overlay" @click="$parent.toggleContactDialog()">
    <div class="popup" @click.stop>
      <h1>Add new contact by id</h1>
      <form class="form spacer" @submit.prevent="$parent.setCompanion(value)">
        <input class="input" type="text" v-model="value" placeholder="Enter contact id" />
        <button type="submit" class="button">
          <img src="../resources/send.svg" />
        </button>
      </form>
    </div>
  </div>
</template>
