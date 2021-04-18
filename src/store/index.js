import Vue from 'vue'
import Vuex from 'vuex'
import * as mutations from './mutations'

Vue.use(Vuex)

const users = [
  {
    id: 0,
    name: 'infret',
    avatar:
      'https://images.unsplash.com/photo-1503212556734-c0ca0c49c8b0?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjF8fHNpbGhvdWV0dGV8ZW58MHwyfDB8&auto=format&fit=crop&w=400&q=60',
    status: 'The creator'
  },
  {
    id: 1,
    name: 'sophielee',
    avatar:
      'https://images.unsplash.com/photo-1581197326868-51cafbd1a169?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTJ8fHNpbGhvdWV0dGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    status: 'Busy nowadays'
  },
  {
    id: 2,
    name: 'juliebean',
    avatar:
      'https://images.unsplash.com/photo-1559219276-b32ba1bf5bad?ixid=MXwxMjA3fDB8MHxzZWFyY2h8Mjh8fHNpbGhvdWV0dGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    status: 'New out there!'
  },
  {
    id: 3,
    name: 'roangardener',
    avatar:
      'https://images.unsplash.com/photo-1578977826019-5141d8ff5870?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTh8fHNpbGhvdWV0dGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    status: ''
  },
  {
    id: 4,
    name: 'bobsmith',
    avatar:
      'https://images.unsplash.com/photo-1603239699774-885100e49753?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTd8fHNpbGhvdWV0dGV8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=60',
    status: 'Sleeping'
  }
]

const messages = [
  { senderId: 1, receiverId: 0, text: 'Hi', time: 1616434910000 },
  { senderId: 0, receiverId: 1, text: 'Sup', time: 1616450000000 },
  { senderId: 2, receiverId: 0, text: 'Hello', time: 1616434920000 },
  {
    senderId: 0,
    receiverId: 3,
    text: 'Good morning',
    time: 1616434923000
  },
  { senderId: 4, receiverId: 0, text: 'Hola', time: 1616434914000 },
  {
    senderId: 0,
    receiverId: 1,
    messages: [
      { senderId: 1, receiverId: 0, text: 'Hi', time: 1616434910000 },
      { senderId: 0, receiverId: 1, text: 'Sup', time: 1616450000000 }
    ],
    time: 1618753690500
  }
]

export default new Vuex.Store({
  state: {
    currentId: 0,
    companionId: 1,
    openedProfile: -1,
    isSettingsOpen: false,
    isContactOpen: false,
    width: window.innerWidth,
    searchChats: '',
    searchMessages: '',
    users,
    messages,
    chats: [{ id: 1, draft: '', selected: [] }]
  },
  mutations
})
