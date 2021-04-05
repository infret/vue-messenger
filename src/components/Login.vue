<template>
  <div class="container">
    <h2>Login</h2>
    <form class="field" @submit.prevent="loginUser()">
      <input class="input" type="text" v-model="loginName" placeholder="Enter username" />
      <button type="submit" class="button">
        <img src="../resources/login.svg" />
      </button>
    </form>
    <h2>Register</h2>
    <form class="field">
      <input class="input" type="text" v-model="registerName" placeholder="Enter username" />
      <button type="submit" class="button">
        <img src="../resources/login.svg" />
      </button>
    </form>
    <p>
      This website is not real. Users are fictional, photos are copyright-free. All changes aren't
      sent anywhere and exist only in your browser. You can log in without password with any
      existing username (try
      <b>infret</b>) or register a new one.
    </p>
    <a href="https://pechkin.dev" class="links"><i>by infret</i></a>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginName: '',
      registerName: ''
    }
  },
  methods: {
    loginUser() {
      let user = this.$store.state.users.filter((user) => user.name === this.loginName)[0]
      if (user) {
        this.$parent.loginUser(user.id)
      } else {
        alert('Wrong username')
      }
    }
  }
}
</script>

<style scoped>
.container {
  border: 1px solid gainsboro;
  padding: 20px;
  width: 300px;
  margin: 20vh auto auto auto;
}

.field {
  border: 1px solid gainsboro;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 10px 0 20px 0;
}

.links {
  margin: 20px 0 10px 0;
  text-align: center;
  display: block;
}
</style>
