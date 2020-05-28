import React from 'react';
import _ from 'lodash';
import ChatArea from "../ChatArea";

const AnswerWindow = ({
    isAllowedToDraw,
    chosenWord,
    messages,
    message,
    setMessage,
    sendMessage,
    loggedInUser,
    showTheWord
}) => {
    return (
        <div className={'answer-window'}>
            {/*{*/}
            {/*    isAllowedToDraw && <div id={'chosen-word'}>{chosenWord}</div>*/}
            {/*}*/}
            {
                <div id={'hint-box'}>
                    {
                        chosenWord.length > 0 && _.times(chosenWord.length, (i) => <div key={i}
                                                               id={`char-${i}`}
                                                               className={'char-place-holder'}
                                                               style={{
                                                                   margin: showTheWord ? '0' : '1%',
                                                                   width: showTheWord ? (chosenWord[i] === ' ' ? '1vw' : 'auto') : '1vw',
                                                                   borderBottom: (showTheWord || chosenWord[i] === ' ' || chosenWord[i] === '-') ? '' : '3px solid black'
                                                               }}>
                            {(showTheWord || chosenWord[i] === '-') ? chosenWord[i] : ''}
                        </div>)
                    }
                </div>
            }
            <div id={'answer-input-container'}>
                <div id={'chat-window'}>
                    <div id={'chat-window-header'}>
                        {'Let the Hustle Begin!!'}
                    </div>
                    <ChatArea message={message}
                              messages={messages}
                              setMessage={setMessage}
                              sendMessage={sendMessage}
                              loggedInUser={loggedInUser}/>
                </div>
                {/*<input id={'answer-input'} placeholder={'Guess the word'} type={'text'}/>*/}
            </div>
        </div>
    )
};

export default AnswerWindow;