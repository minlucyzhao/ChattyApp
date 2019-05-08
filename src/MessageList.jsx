import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {
    render() {
        //messagesDelivered contains messages from App.jsx
        let messagesDelivered = this.props.messages
        // console.log("This is test to see if it entered Message List", messageDelivered);
        let messageContent = messagesDelivered.map(message => {
            return (
                <Message 
                    username={message.username}
                    content={message.content}
                />
            )
        });
        return (
        <main className="messages">
            {messageContent}
            {/* <div className="message system">
              Anonymous1 changed their name to nomnom.
            </div> */}
        </main>
        );
    }
}

export default MessageList;