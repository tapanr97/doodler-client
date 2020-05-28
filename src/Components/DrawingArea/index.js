import React, {useEffect} from 'react';
import Canvas from "./Canvas";

const DrawingArea = ({
    sendLineCoordinates,
    brushColor,
    brushWidth,
    line,
    selectedTool,
    fillRegionMetaData,
    fillRegionForGuests,
    isAllowedToDraw,
    words,
    waitingMessage,
    wordHasBeenChosen,
    startGuessing,
    scoresAfterTurnIsOver,
    finalScores,
    startNextTurnForGuests,
    loggedInUser,
    clearCanvas,
    clearStateDataBeforeStartingNewTurn,
    isGameOver,
    currentRoundIsOver,
    setCurrentRoundIsOver,
    setCurrentRoundNo
}) => {

    let timeOut = null;

    useEffect(() => {
        if (words.length > 0) {
            const chooseTheWordDialog = document.getElementById('choose-the-word');
            chooseTheWordDialog.style.visibility = 'visible';
            chooseTheWordDialog.style.opacity = '1';
            console.log('Word choices: ', words);
            timeOut = setTimeout(() => {
                chooseTheWordDialog.style.visibility = 'hidden';
                chooseTheWordDialog.style.opacity = '0';
                const randomChosenWordIndex = Math.floor(Math.random() * (words.length));
                console.log("Chosen word: " + words[randomChosenWordIndex]);
                wordHasBeenChosen(words[randomChosenWordIndex]);
            }, 10000);
        }
    }, [words]);

    useEffect(() => {
        if (waitingMessage.length > 0) {
            console.log(waitingMessage);
            const chooseTheWordDialog = document.getElementById('waiting-dialog');
            chooseTheWordDialog.style.visibility = 'visible';
            chooseTheWordDialog.style.opacity = '1';
        }
    }, [waitingMessage]);

    useEffect(() => {
        if (startGuessing) {
            console.log("Start guessing : " + loggedInUser.name);
            const chooseTheWordDialog = document.getElementById('waiting-dialog');
            chooseTheWordDialog.style.visibility = 'hidden';
            chooseTheWordDialog.style.opacity = '0';
        }
    }, [startGuessing]);

    useEffect(() => {
        const scoreCardAfterTurn = document.getElementById('score-card-after-turn');
        if (finalScores) {
            const finalScoreCard = document.getElementById('final-score-card');
            scoreCardAfterTurn.style.visibility = 'visible';
            scoreCardAfterTurn.style.opacity = '1';
            console.log('Final Score');
            setTimeout(() => {
                scoreCardAfterTurn.style.visibility = 'hidden';
                scoreCardAfterTurn.style.opacity = '0';
                finalScoreCard.style.visibility = 'visible';
                finalScoreCard.style.opacity = '1';
                setTimeout(() => {
                    finalScoreCard.style.visibility = 'hidden';
                    finalScoreCard.style.opacity = '0';
                }, 5000)
            }, 5000)
        } else if (scoresAfterTurnIsOver) {
            console.log('Turn is Over for ' + loggedInUser.name);
            scoreCardAfterTurn.style.visibility = 'visible';
            scoreCardAfterTurn.style.opacity = '1';

            setTimeout(() => {
                scoreCardAfterTurn.style.visibility = 'hidden';
                scoreCardAfterTurn.style.opacity = '0';
                clearCanvas();
                if(currentRoundIsOver) {
                    setCurrentRoundNo(currentRoundNo => currentRoundNo + 1);
                    setCurrentRoundIsOver(false);
                }
                if (loggedInUser.isHost && !isGameOver) {
                    console.log('Starting next Turn by ' + loggedInUser.name);
                    startNextTurnForGuests();
                } else {
                    clearStateDataBeforeStartingNewTurn();
                }
            }, 5000)
        }
    }, [scoresAfterTurnIsOver, finalScores]);

    const onWordClick = (e) => {
        const selectedWord = e.target.getAttribute('dataword');
        console.log(selectedWord);
        const chooseTheWordDialog = document.getElementById('choose-the-word');
        if (chooseTheWordDialog) {
            chooseTheWordDialog.style.visibility = 'hidden';
            chooseTheWordDialog.style.opacity = '0';
        }
        if (timeOut) {
            clearTimeout(timeOut);
        }
        wordHasBeenChosen(selectedWord);
    };

    return (
        <div id={'canvas-view'} className={'canvas-view'}>
            <div id={'choose-the-word'}>
                {
                    words.map((word, i) => <div key={i} className={'word'} dataword={word} onClick={onWordClick}>{word}</div>)
                }
            </div>
            <div id={'waiting-dialog'}>
                {console.log(waitingMessage + " ++++++")}
                {waitingMessage}
            </div>
            <div id={'score-card-after-turn'}>
                <div style={{display: 'table', width: 'auto'}}>
                    {
                        scoresAfterTurnIsOver &&
                        scoresAfterTurnIsOver.map((scoreDetails, i) => <div key={i}>{scoreDetails.name}:
                            +{scoreDetails.score}</div>)
                    }
                </div>
            </div>
            <div id={'final-score-card'}>
                <div style={{display: 'table', width: 'auto'}}>
                    {
                        finalScores &&
                        finalScores.map((scoreDetails, i) => <p key={i}>{scoreDetails.name}:
                            +{scoreDetails.score}</p>)
                    }
                </div>
            </div>
            <Canvas sendLineCoordinates={sendLineCoordinates}
                    fillRegionForGuests={fillRegionForGuests}
                    brushColor={brushColor}
                    brushWidth={brushWidth}
                    selectedTool={selectedTool}
                    line={line}
                    fillRegionMetaData={fillRegionMetaData}
                    isAllowedToDraw={isAllowedToDraw}
            />

        </div>
    )
};

export default DrawingArea;