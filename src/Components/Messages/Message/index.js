import React from 'react';

const Message = ({message: {text, messageOwner, messageColor}, loggedInUser, messageContainerColor}) => {

    // console.log(messageOwner.name + " " + loggedInUserName);
    // const trimmedName = loggedInUserName.trim().toLowerCase();

    return (
        messageOwner.id === '-1'
            ?
            (<div className={'message'} style={{background: messageContainerColor}}>
                <div style={{color: messageColor}}>{text}</div>
            </div>)
            :
            (<div className={'message'} style={{background: messageContainerColor}}>
                <div className={'message-sender'} style={{color: messageColor}}>{messageOwner.name}:</div>
                <div>{text}</div>
            </div>)
    )

};

export default Message;