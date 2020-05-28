const calculateTimeFraction = (timeLeft, TIME_LIMIT) => {
    const rawTimeFraction = timeLeft / TIME_LIMIT;
    return rawTimeFraction;
};

export const setCircleDasharray = (timeLeft) => {
    const circleDasharray = `${(
        calculateTimeFraction(timeLeft, 60) * 283
    ).toFixed(0)} 283`;
    document
        .getElementById("base-timer-path-remaining")
        .setAttribute("stroke-dasharray", circleDasharray);
};