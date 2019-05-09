import React, {Component} from 'react';

class ChatBar extends Component {
    handleUsername = event => {
      if (event.key === "Enter") {
        // console.log("entered message", event.target.value);
        this.props.addUsername(event.target.value);
      }
    };

    handleMessage = event => {
        if (event.key === "Enter") {
          // console.log("entered message", event.target.value);
          this.props.addMessage(event.target.value);
        }
    };

    render() {
        console.log("render() @ ChatBar.jsx");

        return(
        <footer className="chatbar">

          <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          // defaultValue = {this.props.currentUser.name}
          onKeyDown = {this.handleUsername}
          />

          <input className="chatbar-message" 
          placeholder="Type a message and hit ENTER"
          onKeyDown = {this.handleMessage}
          />

        </footer>
        );
    }
}

export default ChatBar;