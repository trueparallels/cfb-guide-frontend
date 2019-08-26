import React from 'react'
import { Link } from 'gatsby'

import { isConferenceGame, getTeamConferenceName } from '../utils/game-utils'

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

const Game = ({path, pageContext: game}) => {
  const { gameId, date, home, visitor, homeAbbreviation, visitorAbbreviation, isNeutralSite, homeTeam, visitorTeam, network } = game;

  const visitorImage = visitorTeam && (<img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${visitorTeam.id}.png&h=80`} alt={visitorTeam.location}/>)
  const homeImage = homeTeam && (<img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${homeTeam.id}.png&h=80`} alt={homeTeam.location}/>)
  const placeholderTeamImage = (<img src="http://placehold.it/80x80" alt="placeholder" />)
  
  const gameDateAndTime = date ? formatGameDate(new Date(date)) : 'TBD'
  const [gameDayOfWeek, gameDate, gameTime] = gameDateAndTime.split(', ')

  const hexColor = (colorCode) => `#${colorCode}`

  return (
    <div key={gameId}>
      <div className="flex">
        <div style={ {backgroundColor: hexColor(visitorTeam.color), height: '20px', width: '50%'}}></div>
        <div style={ {backgroundColor: hexColor(homeTeam.color), height: '20px', width: '50%'}}></div>
      </div>
      
      <div className="border border-gray-500 px-2 py-4 flex items-center justify-around sm:justify-between flex-wrap sm:flex-no-wrap">
        <div className="flex flex-col align-center order-none sm:order-first">
          { visitorImage || 
          placeholderTeamImage }
          <span className="text-sm font-semibold text-center">{visitorAbbreviation}</span>
        </div>
        <div className="flex flex-col align-center order-none sm:order-last">
          { homeImage || 
            placeholderTeamImage }
          <span className="text-sm font-semibold text-center">{homeAbbreviation}</span>
        </div>
        <div className="flex flex-col min-w-full sm:min-w-40">
          <Link to={path}>
            <div className="text-center text-base sm:text-xl mb-3 font-raleway">{`${visitor} ${isNeutralSite ? 'vs.' : 'at'} ${home}`}</div>
            <div className="text-center text-sm sm:text-lg font-raleway font-extrabold">{ gameTime }</div>
            <div className="text-center text-sm sm:text-base">{ `${gameDayOfWeek} ${gameDate ? gameDate : ''}` }</div>
            <div className="text-center text-base sm:text-xl font-raleway">{ network }</div>
            <div className="text-center text-sm sm:text-base">{ `${getTeamConferenceName(visitorTeam)} vs. ${getTeamConferenceName(homeTeam)}` }</div>
            <div className="text-center text-sm sm:text-base">{ isConferenceGame(game) ? 'Conference' : 'Non-Con' }</div>
          </Link>
        </div>
      </div>
    </div>
  )
};

export default Game;