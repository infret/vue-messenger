<template>
  <div class="login">
    <h2>Login</h2>
    <form class="login_field" @submit.prevent="loginUser()">
      <input class="input" type="text" v-model="loginName" placeholder="Enter username" />
      <button type="submit" class="button">
        <img src="../resources/login.svg" />
      </button>
    </form>
    <h2>Register</h2>
    <form class="login_field" @submit.prevent="registerUser()">
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
    <a href="https://pechkin.dev" class="login_link"><i>by infret</i></a>
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
      let name = this.loginName.toLowerCase()
      let user = this.$store.state.users.find((user) => user.name === name)

      if (user) {
        this.$store.commit('loginUser', { id: user.id })
      } else {
        alert('Wrong username')
      }
    },
    registerUser() {
      let name = this.registerName.toLowerCase()
      let user = this.$store.state.users.find((user) => user.name === name)

      if (user) {
        alert('User already exists')
      } else {
        this.$store.commit('registerUser', { name })
      }
    }
  }
}
</script>
<style lang="scss">
.login {
  border: 1px solid gainsboro;
  padding: 20px;
  width: 300px;
  margin: 20vh auto auto auto;

  &_field {
    border: 1px solid gainsboro;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0 20px 0;
  }

  &_link {
    margin: 20px 0 10px 0;
    text-align: center;
    display: block;
  }
}
</style>
