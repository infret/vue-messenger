<template>
  <div class="login">
    <h2>Login</h2>
    <form class="login_field" @submit.prevent="loginUser()">
      <input class="input" type="text" v-model="loginName" placeholder="Enter username" />
      <button type="submit" class="button">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="50" viewBox="0 0 24 24" width="25" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g></svg>
      </button>
    </form>
    <h2>Register</h2>
    <form class="login_field" @submit.prevent="registerUser()">
      <input class="input" type="text" v-model="registerName" placeholder="Enter username" />
      <button type="submit" class="button">
        <svg xmlns="http://www.w3.org/2000/svg" enable-background="new 0 0 24 24" height="50" viewBox="0 0 24 24" width="25" fill="currentColor"><g><rect fill="none" height="24" width="24"/></g><g><path d="M11,7L9.6,8.4l2.6,2.6H2v2h10.2l-2.6,2.6L11,17l5-5L11,7z M20,19h-8v2h8c1.1,0,2-0.9,2-2V5c0-1.1-0.9-2-2-2h-8v2h8V19z"/></g></svg>
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
  border: 1px solid var(--border-color);
  padding: 20px;
  width: 300px;
  margin: 20vh auto auto auto;

  &_field {
    border: 1px solid var(--border-color);
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
