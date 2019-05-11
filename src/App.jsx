import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [], // messages coming from the server will be stored here as they arrive
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Connected to Websocket Server');
    };

    this.socket.onmessage = (event) => {

      //data from server comes here
      const messageFromServer = JSON.parse(event.data);
      const allMessages = this.state.messages.concat(JSON.parse(event.data))
      //if incomingmessage, setstate for messages
      //if incomingNotification, setstate of currentUser as newName
      this.setState({ 
        messages: allMessages 
      })
    }
  }

  addMessage(msgInput) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: msgInput
    };
    console.log("JSON stringify test", JSON.stringify(newMessage));
    this.socket.send(JSON.stringify(newMessage));
  }

  changeUsername(newName, oldName) {
    const newUsername = {
      type: "postNotification",
      oldName: oldName,
      newName: newName
    };
    this.setState({ currentUser: {name: newName}}); //necessary to set user as newName
    this.socket.send(JSON.stringify(newUsername));
  }
  
  // passes states and props to children
  render() {
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList 
        messages = {this.state.messages} 
        />
        <ChatBar 
        addMessage = {this.addMessage}
        oldName= {this.state.currentUser.name}
        changeUsername = {this.changeUsername}
        />
      </div>
    );
  }
}

export default App;