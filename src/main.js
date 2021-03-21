import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  store: new Vuex.Store({
    state: {
      currentId: 0,
      companionId: 1,
      users: [
        { id: 0, name: 'infret' },
        { id: 1, name: 'ryancooper' }
      ],
      messages: [
        { senderId: 1, receiverId: 0, text: 'Hi' },
        { senderId: 0, receiverId: 1, text: 'Sup' }
      ]
    },
    mutations: {
      addMessage(state, { text }) {
        state.messages.push({ senderId: state.currentId, receiverId: state.companionId, text })
      }
    }
  }),
  render: (h) => h(App)
}).$mount('#app')
