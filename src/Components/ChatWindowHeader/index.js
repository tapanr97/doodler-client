import React, {useState} from 'react';

const ChatWindowHeader = (props) => {
    const [isChatAreaExpanded, toggleChatArea] = useState(false);

    const expandChatArea = () => {
        const chatAreaDOMElement = document.getElementById('chat-area');
        if(isChatAreaExpanded) {
            chatAreaDOMElement.style.height = '0';
        } else {
            chatAreaDOMElement.style.height = '400px';
        }
        toggleChatArea(!isChatAreaExpanded);
    };

    return (
        <div id={'chat-window-header'} onClick={expandChatArea}>
            {props.title}
        </div>
    )
};

export default ChatWindowHeader;