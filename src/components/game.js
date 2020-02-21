import React from 'react'

import Final from './final'
import TeamImage from './TeamImage'


import {
  isConferenceGame,
  getTeamConferenceName,
  isFinal,
  getTeamColor
} from '../utils/game-utils'

const formatGameDate = (date) => {
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions.timeZone;

  return Intl.DateTimeFormat('en-US', { 
    weekday: 'long',
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: timeZoneName,
    timeZoneName: 'short'
  }).format(date);
};

const Game = ({game}) => {
  const { gameId, date, home, visitor, homeAbbreviation, visitorAbbreviation, isNeutralSite, homeTeam, visitorTeam, network, headline } = game;

  const gameDateAndTime = date ? formatGameDate(new Date(date)) : 'TBD'
  const [gameDayOfWeek, gameDate, gameTime] = gameDateAndTime.split(', ')

  const hexColor = (colorCode) => `#${colorCode}`

  try {
    if (isFinal(game)) {
      return (<Final game={game} home={homeTeam} visitor={visitorTeam} />);
    }

    const teamsDefined = homeTeam && visitorTeam

    return (
      <div key={gameId} className="shadow-md bg-white">
        <div className="flex">
          <div style={ {backgroundColor: hexColor(getTeamColor(visitorTeam)), height: '20px', width: '50%'}}></div>
          <div style={ {backgroundColor: hexColor(getTeamColor(homeTeam)), height: '20px', width: '50%'}}></div>
        </div>
        <div className="border border-gray-500 px-2 py-4 flex items-center justify-around sm:justify-between flex-wrap sm:flex-no-wrap">
          <div className="flex flex-col align-center order-none sm:order-first">
            <TeamImage team={visitorTeam} />
            {
              teamsDefined ? 
                <span className="text-sm font-semibold text-center">{visitorAbbreviation}</span>
                : null
            }
          </div>
          <div className="flex flex-col align-center order-none sm:order-last">
            <TeamImage team={homeTeam} />
            {
              teamsDefined ?
                <span className="text-sm font-semibold text-center">{homeAbbreviation}</span>
                : null
            }
          </div>
          <div className="flex flex-col min-w-full sm:min-w-40">
            <div className="text-center text-base sm:text-xl mb-3 font-raleway">{`${visitor} ${isNeutralSite ? 'vs.' : 'at'} ${home}`}</div>
            <div className="text-center text-sm sm:text-lg font-raleway font-extrabold">{ gameTime }</div>
            <div className="text-center text-sm sm:text-base">{ `${gameDayOfWeek} ${gameDate ? gameDate : ''}` }</div>
            <div className="text-center text-base sm:text-xl font-raleway">{ network }</div>
            {
              teamsDefined ?
                <div className="text-center text-sm sm:text-base">{ `${getTeamConferenceName(visitorTeam)} vs. ${getTeamConferenceName(homeTeam)}` }</div>
                : null
            }
            {
              teamsDefined ?
                <div className="text-center text-sm sm:text-base">{ isConferenceGame(game) ? 'Conference' : 'Non-Con' }</div> 
                : null
            }
            {
              headline ?
                <div className="text-center text-base sm:text-md mt-3 font-raleway">{ headline }</div>
                : null
            }
          </div>
        </div>
      </div>
    )
  } catch (e) {
    return (
      <div>An error has occured in the Game component: {e.message}</div>
    )
  }

  
};

export default Game;