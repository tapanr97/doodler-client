import React from 'react';
import Input from "../Input";
import Messages from "../Messages";

const ChatArea = ({message, messages, setMessage, sendMessage, loggedInUser}) => {

    return (
        <div id={'chat-area'}>
            <div id={'chat-viewer'}>
                <Messages messages={messages} loggedInUser={loggedInUser}/>
            </div>
            <Input message={message} setMessage={setMessage} sendMessage={sendMessage}/>
        </div>
    )
};

export default ChatArea;