import React from 'react';
import Message from "./Message";

const Messages = ({messages, loggedInUser}) => {
    return (
        <div id={'messages'}>
            {messages.map((message, i) => <Message key={i}
                                                   message={message}
                                                   loggedInUser={loggedInUser}
                                                   messageContainerColor={i % 2 ? 'white' : '#F2F4F4'}
                />
                )}
        </div>
    )
};

export default Messages;