import React, {Component} from 'react';
import Message from './Message.jsx';

class MessageList extends Component {

    render() {
        console.log("RENDER MESSAGELIST.JSX")
        console.log(this.props.messages)
        // console.log("render() @ MessageList.jsx");
        let messagesDelivered = this.props.messages
        let messageContent = messagesDelivered.map(message => {
            if(message.type === "incomingMessage") {
                return (
                    <Message 
                        key={message.id}
                        username={message.username}
                        content={message.content}
                    />
                )
            } else {
                return (
                    <div className="message system" key={message.id}>
                        <span className='notification-content'>
                            {message.oldName} changed their name to {message.newName}
                        </span>
                    </div>
                );
            }
        });

        return (
        <main className="messages">
            {messageContent}
        </main>
        );
    }
}

export default MessageList;