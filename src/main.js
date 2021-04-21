import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

Vue.config.productionTip = false

new Vue({
  store,
  beforeCreate() {
    window.addEventListener('resize', this.setWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.setWidth)
  },
  mounted() {
    if (localStorage.getItem('state')) {
      this.$store.commit('initStore')
    }
    this.setState()
    setInterval(this.setState, 6 * 1000)
  },
  methods: {
    setWidth() {
      this.$store.state.width = window.innerWidth
    },
    setState() {
      localStorage.setItem('state', JSON.stringify(this.$store.state))
      console.log('Saving state', JSON.stringify(this.$store.state))
    }
  },
  render: (h) => h(App)
}).$mount('#app')
