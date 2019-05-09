import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'TO BE EMPTIED'},
      messages: [] // messages coming from the server will be stored here as they arrive
      //messages: [] format
      // {
      //   id: 1,
      //   username: "Bob",
      //   content: "Hello this is Bob"
      // }
    };
    this.addMessage = this.addMessage.bind(this);
    this.addUsername = this.addUsername.bind(this);
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    this.socket.onopen = () => {
      console.log('Connected to Websocket Server');
    };

    this.socket.onmessage = (event) => {
      console.log("event arrived at app.jsx", event.data);
      // on receiving a message, add it to the list of messages
      const message = JSON.parse(event.data)
      //append it to the state
      const messages = this.state.messages.concat(message)
      this.setState({ currentUser: event.data.username });
      this.setState({ messages: messages })
    }
    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   this.setState({ messages: messages })
    // }, 3000);

    // this.onclose = () => {
    //   console.log('Disconnected from Websocket Server');
    // };
  }

  addUsername(nameInput) {
    console.log(nameInput);
    const newMessage = {
      // id: this.state.messages.length + 1,
      username: nameInput,
      content: "This is an automatically generated message."
    };
    this.socket.send(JSON.stringify(newMessage));
  }

  addMessage(msgInput) {
    const newMessage = {
      // id: this.state.messages.length + 1,
      username: this.state.currentUser,
      content: msgInput
    };
    // const newMessages = this.state.messages.concat(newMessage)
    // this.setState({ messages: newMessages });
    this.socket.send(JSON.stringify(newMessage));
    // console.log("JSON stringify test", JSON.stringify(newMessage));
  }
  
  render() {
    console.log("render() @ App.jsx");
    console.log("all messages", this.state.messages);
    return (
      <div>
        <nav className="navbar">
          <a href="/" className="navbar-brand">Chatty</a>
        </nav>
        <MessageList messages = {this.state.messages} />
        <ChatBar 
        addMessage = {this.addMessage}
        addUsername = {this.addUsername}
        />
      </div>
    );
  }
}

export default App;
