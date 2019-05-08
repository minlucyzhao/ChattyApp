import React, {Component} from 'react';

class ChatBar extends Component {
    handleMessage = event => {
        if (event.key === "Enter") {
          console.log("entered message", event.target.value);
          this.props.sendMessage(event.target.value);
        }
    };

    render() {
        console.log("render() @ ChatBar.jsx");

        return(
        <footer className="chatbar">

          <input 
          className="chatbar-username" 
          placeholder="Your Name (Optional)" 
          defaultValue = {this.props.currentUser.name} //Bob
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