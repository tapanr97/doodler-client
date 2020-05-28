import React, {useEffect, useState} from 'react';
import DrawingArea from "../DrawingArea";
import AnswerWindow from "../AnswerWindow";
import Timer from "../Timer";
import ColorPicker from "../ColorPicker";
import BrushPicker from "../BrushPicker";
import CurrentPlayers from "../CurrentPlayers";
import {useMediaQuery} from 'react-responsive';

const SketcherWindow = ({socket, users, messages, setMessages, loggedInUser, totalRounds, secondsPerTurn}) => {
    // console.log(totalRounds + " aabkhdb " + secondsPerTurn);

    const isMobile = useMediaQuery({query: '(max-width: 600px'});

    const [message, setMessage] = useState('');
    const [line, setLine] = useState([]);
    const [selectedTool, setSelectedTool] = useState('brush');
    const [fillRegionMetaData, setFillRegionMetaData] = useState('');
    const [seconds, setSeconds] = useState(secondsPerTurn);
    const [startTimer, setStartTimer] = useState(false);

    const [brushColor, setBrushColor] = useState('#000000');
    const [brushWidth, setBrushWidth] = useState(5);

    const [isAllowedToDraw, setIsAllowedToDraw] = useState(false);
    const [words, setWords] = useState([]);
    const [waitingMessage, setWaitingMessage] = useState('');
    const [chosenWord, setChosenWord] = useState('');
    const [startGuessing, setStartGuessing] = useState(false);
    const [scoresAfterTurnIsOver, setScoresAfterTurnIsOver] = useState(null);
    const [finalScores, setFinalScores] = useState(null);
    const [currentRankings, setCurrentRankings] = useState(null);
    const [currentRoundNo, setCurrentRoundNo] = useState(1);
    const [showTheWord, setShowTheWord] = useState(false);
    const [isGameOver, setIsGameOver] = useState(false);
    const [drawer, setDrawer] = useState(null);
    const [currentRoundIsOver, setCurrentRoundIsOver] = useState(false);

    const clearCanvas = () => {
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    };

    useEffect(() => {
        socket.on('message', ({message}) => {
            console.log(message + " " + loggedInUser.name);
            setMessages(messages => [...messages, message]);
        });

        socket.on('drawLine', line => {
            console.log('line');
            setLine(line);
        });

        socket.on('clearCanvas', () => {
            clearCanvas();
            setLine([]);
        });

        socket.on('fillRegion', fillRegionMetaData => {
            setFillRegionMetaData(fillRegionMetaData);
        });

        socket.on('chooseTheWord', ({words}) => {
            console.log(words);
            setWords(words);
        });

        socket.on('playerIsChoosingWord', ({message}) => {
            setWaitingMessage(message);
        });

        socket.on('startDrawing', ({word, message, drawer}) => {
            setIsAllowedToDraw(true);
            setChosenWord(word);
            setShowTheWord(true);
            setSeconds(60);
            setStartTimer(true);
            setMessages(messages => [...messages, message]);
            setDrawer(drawer);
        });

        socket.on('startGuessing', ({word, message, drawer}) => {
            setChosenWord(word);
            setShowTheWord(false);
            setStartGuessing(true);
            setSeconds(60);
            setStartTimer(true);
            setMessages(messages => [...messages, message]);
            setDrawer(drawer);
        });

        socket.on('showScoresAfterTurnIsOver', ({scores, currentRankingsJson}) => {
            setScoresAfterTurnIsOver(scores);
            setCurrentRankings(currentRankingsJson);
        });

        socket.on('showScoresAfterRoundIsOver', ({scores, currentRankingsJson}) => {
            setScoresAfterTurnIsOver(scores);
            setCurrentRankings(currentRankingsJson);
            setCurrentRoundIsOver(true);
        });

        socket.on('showFinalScores', ({scores, currentRankingsJson, finalScores}) => {
            setIsGameOver(true);
            setScoresAfterTurnIsOver(scores);
            setFinalScores(finalScores);
            setCurrentRankings(currentRankingsJson);
        });
    }, []);

    const sendLineCoordinates = (line) => {
        socket.emit('sendLineCoordinates', line);
    };

    const sendMessage = (e) => {
        e.preventDefault();

        if (message) {
            console.log('sent');
            if (seconds > 0 && !isAllowedToDraw) {
                socket.emit('sendMessage', {message, remainingSeconds: seconds}, () => setMessage(''))
            } else {
                socket.emit('sendMessage', {message}, () => setMessage(''))
            }
        }
    };

    const clearCanvasForGuests = () => {
        socket.emit('clearCanvasForGuests');
        clearCanvas();
        setLine([]);
    };

    const fillRegionForGuests = fillRegionMetaData => {
        socket.emit('fillRegionForGuests', fillRegionMetaData);
    };

    const wordHasBeenChosen = word => {
        socket.emit('wordHasBeenChosen', word);
    };

    const turnIsOver = () => {
        console.log("turnIsOver");
        socket.emit('turnIsOver', () => {
            setIsAllowedToDraw(false);
            setShowTheWord(true);
        });

    };

    const clearStateDataBeforeStartingNewTurn = async () => {
        await setStartGuessing(false);
        await setWords([]);
        await setWaitingMessage('');
        await setChosenWord('');
        await setScoresAfterTurnIsOver(null);
    };

    const startNextTurnForGuests = async () => {
        console.log('startNextTurnForGuests');
        await clearStateDataBeforeStartingNewTurn();
        socket.emit('startNextTurnForGuests');
    };

    return (
        <div className={'sketcher-window'}>
            <div className={'application-header'}>Doodler.com</div>
            {!isMobile &&
            <div id={'sketcher-window-inner-container'}>
                <div id={'left-panel'}>
                    <div id={'timer-and-rounds'}>
                        <Timer seconds={seconds}
                               setSeconds={setSeconds}
                               startTimer={startTimer}
                               setStartTimer={setStartTimer}
                               turnIsOver={turnIsOver}
                               setShowTheWord={setShowTheWord}
                               isAllowedToDraw={isAllowedToDraw}
                        />
                        <div>Round {currentRoundNo} of {totalRounds}</div>
                    </div>
                    <CurrentPlayers users={users} currentRankings={currentRankings} drawer={drawer}/>
                </div>
                <DrawingArea sendLineCoordinates={sendLineCoordinates}
                             brushColor={brushColor}
                             brushWidth={brushWidth}
                             line={line}
                             selectedTool={selectedTool}
                             fillRegionMetaData={fillRegionMetaData}
                             fillRegionForGuests={fillRegionForGuests}
                             isAllowedToDraw={isAllowedToDraw}
                             words={words}
                             waitingMessage={waitingMessage}
                             wordHasBeenChosen={wordHasBeenChosen}
                             startGuessing={startGuessing}
                             scoresAfterTurnIsOver={scoresAfterTurnIsOver}
                             finalScores={finalScores}
                             startNextTurnForGuests={startNextTurnForGuests}
                             loggedInUser={loggedInUser}
                             clearCanvas={clearCanvas}
                             clearStateDataBeforeStartingNewTurn={clearStateDataBeforeStartingNewTurn}
                             isGameOver={isGameOver}
                             currentRoundIsOver={currentRoundIsOver}
                             setCurrentRoundIsOver={setCurrentRoundIsOver}
                             setCurrentRoundNo={setCurrentRoundNo}
                />
                <AnswerWindow isAllowedToDraw={isAllowedToDraw}
                              chosenWord={chosenWord}
                              messages={messages}
                              message={message}
                              setMessage={setMessage}
                              sendMessage={sendMessage}
                              loggedInUser={loggedInUser}
                              showTheWord={showTheWord}
                />
            </div>
            }
            {
                isMobile &&
                <div id={'sketcher-window-inner-container'}>
                    <DrawingArea sendLineCoordinates={sendLineCoordinates}
                                 brushColor={brushColor}
                                 brushWidth={brushWidth}
                                 line={line}
                                 selectedTool={selectedTool}
                                 fillRegionMetaData={fillRegionMetaData}
                                 fillRegionForGuests={fillRegionForGuests}
                                 isAllowedToDraw={isAllowedToDraw}
                                 words={words}
                                 waitingMessage={waitingMessage}
                                 wordHasBeenChosen={wordHasBeenChosen}
                                 startGuessing={startGuessing}
                                 scoresAfterTurnIsOver={scoresAfterTurnIsOver}
                                 finalScores={finalScores}
                                 startNextTurnForGuests={startNextTurnForGuests}
                                 loggedInUser={loggedInUser}
                                 clearCanvas={clearCanvas}
                                 clearStateDataBeforeStartingNewTurn={clearStateDataBeforeStartingNewTurn}
                                 isGameOver={isGameOver}
                                 currentRoundIsOver={currentRoundIsOver}
                                 setCurrentRoundIsOver={setCurrentRoundIsOver}
                                 setCurrentRoundNo={setCurrentRoundNo}
                    />

                    <div id={'bottom-panel'}>
                        <CurrentPlayers users={users} currentRankings={currentRankings} drawer={drawer}/>
                        <AnswerWindow isAllowedToDraw={isAllowedToDraw}
                                      chosenWord={chosenWord}
                                      messages={messages}
                                      message={message}
                                      setMessage={setMessage}
                                      sendMessage={sendMessage}
                                      loggedInUser={loggedInUser}
                                      showTheWord={showTheWord}
                        />
                    </div>
                </div>
            }
            {
                !isMobile &&
                <div style={{display: 'flex', width: '80%', margin: 'auto', marginBottom: '5%'}}>
                    <ColorPicker
                        setBrushColor={setBrushColor}
                    />
                    <BrushPicker
                        clearCanvasForGuests={clearCanvasForGuests}
                        setBrushWidth={setBrushWidth}
                        setSelectedTool={setSelectedTool}
                    />
                </div>
            }
        </div>
    )
};

export default SketcherWindow;