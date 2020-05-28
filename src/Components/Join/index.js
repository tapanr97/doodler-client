import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {v4 as uuidV4} from 'uuid';

const getRoomNavigatorButton = (buttonText, roomId, name) => {
   return (
       <Link className={'button-link'} onClick={(e) => (!name) ? e.preventDefault() : null}
             to={{
                 pathname: '/room',
                 search: `?roomId=${roomId}`,
                 aboutProps: {
                     username: name,
                     roomId
                 }
             }}>
           <button className={'login-submit'} type={"submit"}>{buttonText}</button>
       </Link>
   )
} ;

const Join = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const roomId = uuidV4();
    return (
        <div className={'join'}>
            <div className={'login-box'}>
                <h1 className={'login-header'}>Join Sketcher</h1>
                <div>
                    <input placeholder="Name" className="login-input" type="text" onChange={(event) => setName(event.target.value)}/>
                </div>
                {/*<div>*/}
                {/*    <input placeholder="Room" className="login-input" type="text" onChange={(event) => setRoom(event.target.value)} />*/}
                {/*</div>*/}
                {/*<div id={'choose-avatar'}>*/}
                {/*    */}
                {/*</div>*/}
                { props.roomId &&
                    getRoomNavigatorButton("Join the room!", props.roomId, name)
                }
                <br/>
                {
                    getRoomNavigatorButton("Create a Private Room!", roomId, name)
                }
            </div>
        </div>
    )
};

export default Join;