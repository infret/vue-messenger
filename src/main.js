import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

Vue.config.productionTip = false

new Vue({
  store,
  beforeCreate() {
    this.$store.commit('initState')
    window.addEventListener('resize', this.setWidth)
  },
  created() {
    window.addEventListener('beforeunload', this.setStore)
  },
  methods: {
    setWidth() {
      this.$store.state.width = window.innerWidth
    },
    setStore() {
      localStorage.setItem('store', JSON.stringify(this.$store.state))
      console.log('hui')
      window.removeEventListener('resize', this.setWidth)
    }
  },
  render: (h) => h(App)
}).$mount('#app')
