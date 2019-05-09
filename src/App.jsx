import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bob"},
      messages: [
        {
          id: 1,
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          id: 2,
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    };
    this.addMessage = this.addMessage.bind(this);
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    this.socket.onopen = () => {
      console.log('Connected to Websocket Server');
    };

    // setTimeout(() => {
    //   console.log("Simulating incoming message");
    //   const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    //   const messages = this.state.messages.concat(newMessage)
    //   this.setState({ messages: messages })
    // }, 3000);

    this.onclose = () => {
      console.log('Disconnected from Websocket Server');
    };
  }

  addMessage(msgInput) {
    //user's message and re-render by changing state
    const newMessage = {
      id: this.state.messages.length + 1,
      username: this.state.currentUser.name,
      content: msgInput
    };
    // const newMessages = this.state.messages.concat(newMessage)
    // this.setState({ messages: newMessages });
    this.socket.send(JSON.stringify(newMessage));
    console.log("JSON stringify test", JSON.stringify(newMessage));
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
        currentUser = {this.state.currentUser} 
        addMessage = {this.addMessage}
        />
      </div>
    );
  }
}

export default App;
