import React from 'react';

const CurrentPlayers = ({users, currentRankings, drawer}) => {
    // console.log("Rankings: " + currentRankings);
    return (
        <div id={'current-players'}>
            {/*<div id={'rankings-board-header'}>Players</div>*/}
            {
                users.map((user, i) => <div key={i} className={'current-score-card'}>
                        {/*<div className={'avatar'}/>*/}
                        <div className={'player-rankings'}>
                            #{currentRankings ? currentRankings[user.id].rank : (i + 1)}
                        </div>
                        <div className={'player-info'}>
                            <div className={'player-name'}>{user.isHost && <i className={'fas fa-crown crown-icon'}/>}{user.name}</div>
                            <div
                                className={'player-score'}>Score: {currentRankings ? currentRankings[user.id].aggrScore : 0}</div>
                        </div>
                        {
                            (drawer && user.id === drawer.id) && <div className={'pencil'}/>
                        }
                    </div>
                )
            }
        </div>
    )
};

export default CurrentPlayers;