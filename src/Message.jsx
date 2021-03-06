import React, {Component} from 'react';

class Message extends Component {
    render() {
        // console.log("render() @ Message.jsx");
        return(
            <div className="message">
                <span className="message-username">
                    {/* Based from MessageList.jsx  */}
                    {this.props.username}  
                </span>
                <span className="message-content">
                    {this.props.content}
                </span>
            </div>
        );
    }
}

export default Message;
