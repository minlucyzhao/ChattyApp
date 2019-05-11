import React, {Component} from 'react';

class ChatBar extends Component { 
    handleUsername = event => {
      let oldName = this.props.oldName;
      if (event.key === "Enter") {
        // console.log("entered new name", event.target.value);
        let newName = event.target.value;
        console.log("newName at ChatBar.jsx", newName);
        console.log("oldName at ChatBar.jsx", oldName);
        this.props.changeUsername(newName, oldName);
    };
    }

    handleMessage = event => {
        if (event.key === "Enter") {
          console.log("entered message", event.target.value);
          this.props.addMessage(event.target.value);
          event.target.value= "";
        }
    };

    render() {
        console.log("render() @ ChatBar.jsx");

        return(
        <footer className="chatbar">

          <input 
          className="chatbar-username" 
          placeholder="Name" 
          // defaultValue = {this.props.currentUser.name}
          // onBlur = {this.handleUsername}
          // onKeyDown = {this.handleUsernameChange} 
          onKeyDown = {this.handleUsername} 
          />

          <input className="chatbar-message" 
          placeholder="Type Message & Hit Enter"
          onKeyDown = {this.handleMessage}
          />

        </footer>
        );
    }
}

export default ChatBar;