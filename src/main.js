import Vue from 'vue'
import Vuex from 'vuex'
import App from './components/App.vue'
Vue.config.productionTip = false
Vue.use(Vuex)

new Vue({
  store: new Vuex.Store({
    state: {
      currentId: 0,
      companionId: 0,
      width: window.innerWidth,
      searchMessages: '',
      users: [
        {
          id: 0,
          name: 'infret',
          avatar:
            'https://images.unsplash.com/photo-1503212556734-c0ca0c49c8b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHNpbGhvdWV0dGV8ZW58MHwyfDB8&auto=format&fit=crop&w=400&q=60'
        },
        {
          id: 1,
          name: 'sophielee',
          avatar:
            'https://images.unsplash.com/photo-1581197326868-51cafbd1a169?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNpbGhvdWV0dGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        },
        {
          id: 2,
          name: 'juliebean',
          avatar:
            'https://images.unsplash.com/photo-1559219276-b32ba1bf5bad?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjh8fHNpbGhvdWV0dGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        },
        {
          id: 3,
          name: 'roangardener',
          avatar:
            'https://images.unsplash.com/photo-1578977826019-5141d8ff5870?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbGhvdWV0dGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        },
        {
          id: 4,
          name: 'bobsmith',
          avatar:
            'https://images.unsplash.com/photo-1603239699774-885100e49753?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fHNpbGhvdWV0dGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60'
        }
      ],
      messages: [
        { senderId: 1, receiverId: 0, text: 'Hi', time: 1616434910 },
        { senderId: 0, receiverId: 1, text: 'Sup', time: 1616434926 },
        { senderId: 2, receiverId: 0, text: 'Hello', time: 1616434920 },
        { senderId: 0, receiverId: 3, text: 'Good morning', time: 1616434923 },
        { senderId: 4, receiverId: 0, text: 'Hola', time: 1616434914 }
      ]
    },
    mutations: {
      addMessage(state, { text }) {
        state.messages.push({
          senderId: state.currentId,
          receiverId: state.companionId,
          text,
          time: Date.now() / 1000
        })
      },
      setCompanion(state, { id }) {
        state.companionId = id
      },
      clearChat(state) {
        state.messages = state.messages.filter(
          ({ senderId, receiverId }) =>
            !(senderId === state.currentId && receiverId === state.companionId) &&
            !(senderId === state.companionId && receiverId === state.currentId)
        )
      }
    }
  }),
  render: (h) => h(App)
}).$mount('#app')
