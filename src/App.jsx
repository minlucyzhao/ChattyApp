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
      console.log("componentDidMount()", event.data);

      //data from server comes here
      const messageFromServer = JSON.parse(event.data)
      
      //if incomingmessage, setstate for messages
      //if incomingNotification, setstate of currentUser as newName
      switch(messageFromServer.type) {
        case "incomingMessage":
          const allMessages = this.state.messages.concat(JSON.parse(event.data))
          this.setState({ 
            currentUser: {name: messageFromServer.username},
            messages: allMessages 
          })
          console.log("111111 messages", this.state.messages)
          break;

        case "incomingNotification":
          const everyMessages = this.state.messages.concat(JSON.parse(event.data))
          console.log("333333333")
          this.setState({ 
          currentUser: { name: messageFromServer.newName },
          messages: everyMessages 
          })
         console.log("222222 currentUser", this.state.currentUser)
          break;
      }
    }
  }

  addMessage(msgInput) {
    const newMessage = {
      type: "postMessage",
      username: this.state.currentUser.name,
      content: msgInput
    };
    console.log("addMessage username", this.state.currentUser.name)
    this.socket.send(JSON.stringify(newMessage));
    // console.log("JSON stringify test", JSON.stringify(newMessage));
  }

  changeUsername(newName, oldName) {
    const newUsername = {
      type: "postNotification",
      // content: this.state.currentUser.name + " has been changed to " + nameInput + ".",
      oldName: oldName,
      newName: newName
      };
      console.log("oldName at changeUsername()", oldName);
      console.log("newName at changeUsername()", newName);
      console.log("currentUser name at changeUsername()", this.state.currentUser.name);
      this.setState({ currentUser: {name: newName}}); //necessary to set user as newName
      this.socket.send(JSON.stringify(newUsername));
  }
  
  // passes states and props to children
  render() {
    console.log("render() @ App.jsx");
    console.log("all messages", this.state.messages);
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