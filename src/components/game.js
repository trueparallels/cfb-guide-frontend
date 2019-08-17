import React from 'react'
import { Link } from 'gatsby'

import { isConferenceGame, getTeamConferenceName } from '../utils/game-utils'

const formatGameDate = (date) => {
  const timeZoneName = Intl.DateTimeFormat().resolvedOptions.timeZone;

  return Intl.DateTimeFormat('en-US', { 
    month: 'numeric',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    timeZone: timeZoneName,
    timeZoneName: 'short'
  }).format(date);
};

const Game = ({path, pageContext}) => {
  const { gameId, date, home, visitor, homeAbbreviation, visitorAbbreviation, isNeutralSite, homeTeam, visitorTeam } = pageContext;
  //console.log(pageContext)

  const visitorImage = visitorTeam && (<img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${visitorTeam.id}.png&h=50`} alt={visitorTeam.location}/>)
  const homeImage = homeTeam && (<img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${homeTeam.id}.png&h=50`} alt={homeTeam.location}/>)
  const gameDateAndTime = date ? formatGameDate(new Date(date)) : 'TBD'
  const [gameDate, gameTime] = gameDateAndTime.split(', ')

  // const placeholderTeamImage = (<img src="http://placehold.it/50x50" />)
  const hexColor = (colorCode) => `#${colorCode}`

  return (
    <li key={gameId}>
      <div className="flex">
        <div style={ {backgroundColor: hexColor(visitorTeam.color), height: '20px', width: '50%'}}></div>
        <div style={ {backgroundColor: hexColor(homeTeam.color), height: '20px', width: '50%'}}></div>
      </div>
      
      <div className="border border-gray-500 px-2 py-4 flex items-center justify-between">
        <div className="flex flex-col align-center">
          { visitorImage }
          <span className="text-sm font-semibold text-center">{visitorAbbreviation}</span>
        </div>
        <div className="flex flex-col">
          <Link to={path}>
            <div className="text-center mb-3 font-raleway">{`${visitor} ${isNeutralSite ? 'vs.' : 'at'} ${home}`}</div>
            <div className="text-center text-lg font-raleway font-extrabold">{ gameTime }</div>
            <div className="text-center">{ gameDate }</div>
            <div className="text-center">{ `${getTeamConferenceName(visitorTeam)} vs. ${getTeamConferenceName(homeTeam)}` }</div>
            <div className="text-center">{ isConferenceGame(visitorTeam, homeTeam) ? 'Conference' : 'Non-Con' }</div>
          </Link>
        </div>
        <div className="flex flex-col align-center">
          { homeImage }
          <span className="text-sm font-semibold text-center">{homeAbbreviation}</span>
        </div>
      </div>

      <div className="flex border-b">
        <div style={ {backgroundColor: hexColor(visitorTeam.alternateColor), height: '3px', width: '50%'}}></div>
        <div style={ {backgroundColor: hexColor(homeTeam.alternateColor), height: '3px', width: '50%'}}></div>
      </div>
    </li>
  )
};

export default Game;