import {computed, observable, action} from 'mobx';

class ChatRoom {
  @observable name;
  id;

  constructor(data) {
    this.name = data.name;
    this.id = data.id;
  }
}

export class Page2State {
  @observable text = '';

  @action setText(text) {
    this.text = text;
  }

  @action resetText() {
    this.text = '';
  }
}


class AppState {
  horizon;
  @observable userName;
  @observable roomName;
  @observable chatRooms = [];
  @observable loading = false;
  @observable messages = [];
  @observable newMessage = false;

  constructor(horizon) {
    this.horizon = horizon;
    this.chatRooms = [];
  }

  @computed get lastAuthor() {
    if (this.messages.length === 0) {
      return '';
    }

    return this.messages[this.messages.length - 1].author;
  }

  @action setMessages(data) {
    this.messages = data;
  }

  @action hideMessageNotification() {
    this.newMessage = false;
  }

  @action showMessageNotification() {
    if (this.newMessage) return;
    this.newMessage = true;
    setTimeout(() => this.newMessage = false, 2000);
  }

  @action setChatRoom(data) {
    this.chatRooms = data.map((el) => new ChatRoom(el));
  }
}

export default AppState;
