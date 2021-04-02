<template>
  <div v-if="$store.state.openedProfile >= 0" class="overlay" @click="$parent.openProfile(-1)">
    <div class="popup">
      <img
        class="avatar_big"
        :src="$store.state.users[$store.state.openedProfile].avatar"
        alt="user's avatar"
      />
      <div class="desc">
        <div class="flex">
          <h2 class="name">{{ $store.state.users[$store.state.openedProfile].name }}</h2>
          <p class="dim">id{{ $store.state.users[$store.state.openedProfile].id }}</p>
        </div>
        <p class="name">{{ $store.state.users[$store.state.openedProfile].status }}</p>
      </div>
    </div>
  </div>
</template>
<style scoped>


.avatar_big {
  height: 300px;
  width: 300px;
  object-fit: cover;
}

.desc {
  padding: 10px 0;
  display: grid;
  grid-auto-flow: row;
  gap: 5px;
}
</style>
