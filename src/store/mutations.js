export function addMessage(state, { text }) {
  state.messages.push({
    senderId: state.currentId,
    receiverId: state.companionId,
    text,
    time: Date.now()
  });
}

export function loginUser(state, { id }) {
  state.currentId = id;
}

export function registerUser(state, { name }) {
  const id = state.users.length;

  state.users.push({
    id,
    name: name,
    avatar: '',
    status: ''
  });

  state.currentId = id + 1;
}

export function setCompanion(state, { id }) {
  state.companionId = id;
  state.chats.push({ id, draft: '', selected: [] });
}

export function toggleSettings(state) {
  state.isSettingsOpen = !state.isSettingsOpen;
}

export function toggleContact(state) {
  state.isContactOpen = !state.isContactOpen;
}

export function openProfile(state, { id }) {
  state.openedProfile = id;
}

export function clearChat(state) {
  state.messages = state.messages.filter(
    ({ senderId, receiverId }) =>
      !(senderId === state.currentId && receiverId === state.companionId) &&
      !(senderId === state.companionId && receiverId === state.currentId)
  );
  state.setCompanion(-1);
}

export function setDraft(state, { text }) {
  let chat = state.chats.find(chat => chat.id === state.companionId);
  if (!chat) {
    state.chats.push({ draft: '', selected: [] });
  }
  chat.draft = text;
}

export function selectMessage(state, { message }) {
  let chat = state.chats.find(chat => chat.id === state.companionId);
  if (!chat) {
    state.chats.push({ draft: '', selected: [] });
  }
  chat.selected.push(message);
}
