import React from 'react'
import { Link } from 'gatsby'

const Game = ({path, pageContext}) => {
  const { gameId, date, home, visitor, homeAbbreviation, visitorAbbreviation, isNeutralSite, homeTeam, visitorTeam } = pageContext;
  console.log(pageContext)

  const visitorImage = visitorTeam && (<img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${visitorTeam.id}.png&h=50`} alt={visitorTeam.location}/>)
  const homeImage = homeTeam && (<img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${homeTeam.id}.png&h=50`} alt={homeTeam.location}/>)

  return (
    <li key={gameId}>
      <div className="border border-gray-500 px-2 py-4 flex">
        { visitorImage }
        <Link to={path}>
        {`${visitor} (${visitorAbbreviation}) ${isNeutralSite ? 'vs.' : 'at'} ${home} (${homeAbbreviation}) - ${date ? date : 'TBD'}`}
        </Link>
        { homeImage }
      </div>
    </li>
  )
};

export default Game;