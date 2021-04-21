import Vue from 'vue'
import store from './store'
import App from './components/App.vue'

Vue.config.productionTip = false

new Vue({
  store,
  created() {
    window.addEventListener('resize', this.setWidth)
  },
  destroyed() {
    window.removeEventListener('resize', this.setWidth)
  },
  methods: {
    setWidth() {
      this.$store.state.width = window.innerWidth
    }
  },
  render: (h) => h(App)
}).$mount('#app')
