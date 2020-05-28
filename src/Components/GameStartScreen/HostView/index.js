import React, {useEffect, useState} from 'react';
import {Button, Form, FormGroup, Input, Label} from "reactstrap";
import SketcherWindow from "../../SketcherWindow";

const colorPaletteForUsers = [
    '#800000',
    '#808000',
    '#008080',
    '#0000FF',
    '#000080',
    '#FF00FF',
    '#800080',
    '#F5B041',
    '#F1C40F',
    '#3498DB'
];

const HostView = ({
    users,
    loggedInUser,
    startGame,
    startGameForGuests,
    socket,
    messages,
    setMessages,
}) => {
    // console.log(loggedInUser);

    const [totalRounds, setTotalRounds] = useState(2);
    const [secondsPerTurn, setSecondsPerTurn] = useState(60);
    const [noOfChoices, setNoOfChoices] = useState(4);

    const onRoundsChange = (e) => {
        console.log(e.target.value);
        setTotalRounds(parseInt(e.target.value));
    };

    const onSecondsPerTurnChange = (e) => {
        setSecondsPerTurn(parseInt(e.target.value));
    };

    const onNoOfChoicesChange = (e) => {
        setNoOfChoices(parseInt(e.target.value));
    };

    useEffect(() => {
        return () => {
            console.log('Leaving the room');
            socket.disconnect();
        }
    }, []);

    return (
        <div>
            {!startGame ?
                <div id={'start-screen-outer-container'}>
                    <Form style={{width: '50%', padding: '2%'}}>
                        <FormGroup>
                            <Label>Rounds</Label>
                            <Input type="select" id="select-rounds" onChange={onRoundsChange} value={totalRounds.toString()}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Draw Time in Seconds</Label>
                            <Input type="select" id="select-draw-time" onChange={onSecondsPerTurnChange} value={secondsPerTurn.toString()}>
                                <option>60</option>
                                <option>80</option>
                                <option>100</option>
                                <option>120</option>
                                <option>140</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Number of Choices per Turn</Label>
                            <Input type="select" id="select-draw-time" onChange={onNoOfChoicesChange} value={noOfChoices.toString()}>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                                <option>4</option>
                                <option>5</option>
                            </Input>
                        </FormGroup>
                        <FormGroup>
                            <Label>Language</Label>
                            <Input type="select" id="select-draw-time">
                                <option>English</option>
                            </Input>
                        </FormGroup>
                        <Button color={'primary'}
                                style={{
                                    width: '100%',
                                    cursor: ((loggedInUser && !loggedInUser.isHost)) ? 'not-allowed' : 'pointer'
                                }}
                                onClick={
                                    ((loggedInUser && !loggedInUser.isHost))
                                        ?
                                        (e) => e.preventDefault()
                                        :
                                        () => {
                                            startGameForGuests(totalRounds, noOfChoices, secondsPerTurn)
                                        }
                                }>
                            Start Game
                        </Button>
                    </Form>

                    <div id={'divider'}/>

                    <div id={'joined-players-outer-container'}>
                        <h3>Players</h3>
                        <div id={'joined-players-inner-container'}>
                            {
                                users.map((user, i) => {
                                    return (
                                        <div key={i} id={'joined-player'}
                                             style={{background: user.isHost ? 'green' : 'beige'}}>{user.name}</div>
                                    )
                                })
                            }
                        </div>
                    </div>
                </div>
                :
                <SketcherWindow socket={socket} users={users} startGame={true} messages={messages}
                                setMessages={setMessages} loggedInUser={loggedInUser}
                                totalRounds={totalRounds}
                                secondsPerTurn={secondsPerTurn}
                />
            }
        </div>
    )
};

export default HostView;