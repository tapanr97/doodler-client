import React, {useEffect, useRef} from 'react';
import {setCircleDasharray} from "../../services/timerUtilityServices";

const Timer = ({seconds, setSeconds, startTimer, setStartTimer, turnIsOver, isAllowedToDraw, setShowTheWord}) => {
    let interval = null;
    const ref = useRef({interval});

    useEffect(() => {
        if (startTimer && seconds > 0) {
            ref.current.interval = setInterval(() => {
                setSeconds(seconds => seconds - 1);
            }, 1000);
        } else if (!startTimer) {
            clearInterval(ref.current.interval);
        } else if (seconds === 0) {
            clearInterval(ref.current.interval);
            setStartTimer(false);
        }
        return () => clearInterval(ref.current.interval);
    }, [startTimer]);

    useEffect(() => {
        setCircleDasharray(seconds - 1);
        if (seconds === 0) {
            clearInterval(ref.current.interval);
            console.log("Time is over");
            setStartTimer(false);
            if (isAllowedToDraw) {
                console.log("Fetch scores");
                turnIsOver();
            } else {
                setShowTheWord(true);
            }
        }
    }, [seconds]);

    return (
        <div id={'timer-container'}>
            {/*<div id={'timer'}>{seconds}s</div>*/}
            <div className={'base-timer'}>
                <svg className="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                    <g className="base-timer__circle">
                        <circle className="base-timer__path-elapsed" cx="50" cy="50" r="45"/>
                        <path
                            id="base-timer-path-remaining"
                            strokeDasharray="90 283"
                            className="base-timer__path-remaining"
                            d="
                                  M 50, 50
                                  m -45, 0
                                  a 45,45 0 1,0 90,0
                                  a 45,45 0 1,0 -90,0
                                "
                        />
                    </g>
                </svg>
                <span className="base-timer__label">{seconds}s</span>
            </div>
        </div>
    )
};

export default Timer;