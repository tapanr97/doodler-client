import React from 'react';
import ChatWindowHeader from "../ChatWindowHeader";
import ChatArea from "../ChatArea";

const ChatWindow = ({message, messages, name, setMessage, sendMessage}) => {
    return (
        <div className={'chat-window'}>
            <ChatWindowHeader title={'Let the Hustle begin!!'}/>
            <ChatArea message={message} messages={messages} name={name} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
};

export default ChatWindow;