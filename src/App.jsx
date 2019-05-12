import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: 'Anonymous'},
      messages: [], // messages coming from the server will be stored here as they arrive
      numUsers: 0
    };
    this.addMessage = this.addMessage.bind(this);
    this.changeUsername = this.changeUsername.bind(this);
    this.socket = new WebSocket('ws://localhost:3001');
  }

  componentDidMount() {
    this.socket.onopen = () => {
      console.log('Connected to Websocket Server');
    };

    //Broadcast to all clients
    this.socket.onmessage = (event) => {
      const parsedData = JSON.parse(event.data);
      if(parsedData.numUsers) {
        this.setState({
          numUsers: parsedData.numUsers
        })
      } else {
        const allMessages = this.state.messages.concat(JSON.parse(event.data))
        this.setState({ 
          messages: allMessages 
        })
      }
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
    this.setState({ currentUser: {name: newName}}); //change state of the specific client
    this.socket.send(JSON.stringify(newUsername));
  }
  
  // passes states and props to children
  render() {
    return (
      <div>
        <nav className="navbar">
          <img className="navbar-logo" src="./img/peach.png" alt="fruity chatty" />
          <a href="/" className="navbar-brand">Chatty</a>
          <span className="navbar-users">Active Users: {this.state.numUsers} </span>
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