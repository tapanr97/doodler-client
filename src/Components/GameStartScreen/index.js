import React, {useState, useEffect} from 'react';
import io from 'socket.io-client';
import HostView from "./HostView";
import Join from "../Join";
import queryString from 'query-string';

const socket = io('https://doodler-server.herokuapp.com/');

const GameStartScreen = (props) => {
    const [users, setUsers] = useState([]);
    const [loggedInUser, setLoggedInUser] = useState('');
    const [startGame, setStartGame] = useState(false);
    const [messages, setMessages] = useState([]);
    const {roomId} = queryString.parse(props.location.search);

    if(socket.disconnected) {
        socket.connect();
    }

    useEffect(() => {
        if (props.location.aboutProps) {
            socket.emit('join', {
                name: props.location.aboutProps.username,
                room: props.location.aboutProps.roomId
            }, (error) => {
                if (error) {
                    alert(error);
                }
            });

            socket.on('newUserJoined', ({users, message}) => {
                setUsers(users);
                setMessages(messages => [...messages, message]);
            });

            socket.on('requestedUserJoined', ({currentUser}) => {
                setLoggedInUser(currentUser);
            })
        }
    }, [props.location.search, props.location.aboutProps]);

    useEffect(() => {
        socket.on('userLeft', ({users, message}) => {
            setUsers(users);
            setMessages(messages => [...messages, message]);
        });

        socket.on('startGame', () => {
            // console.log("StartGameForGuests");
            setStartGame(true)
        });
    }, []);

    const startGameForGuests = (rounds, noOfChoices, secondsPerTurn) => {
        console.log(rounds + " " + noOfChoices + " " + secondsPerTurn);
        socket.emit('startGameForGuests', {rounds, noOfChoices, secondsPerTurn});
        setStartGame(true);
    };

    return (
        <div>
            {props.location.aboutProps
                ?
                <HostView
                    users={users}
                    loggedInUser={loggedInUser}
                    startGame={startGame}
                    startGameForGuests={startGameForGuests}
                    socket={socket}
                    messages={messages}
                    setMessages={setMessages}
                />
                :
                <Join roomId={roomId}/>}
        </div>
    )
};

export default GameStartScreen;