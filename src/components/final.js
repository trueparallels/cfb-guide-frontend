import React from 'react'

import TeamImage from './TeamImage';

import {
  visitorWinner,
  homeWinner,
  visitorFinalScore,
  homeFinalScore,
  getVisitorTeamLocation,
  getHomeTeamLocation
} from '../utils/game-utils'

const Final = (props) => {
  // console.log(props)
  const { game, home, visitor } = props;
  const { visitorAbbreviation, homeAbbreviation } = game;
  
  return (
    <div className="border border-gray-800 px-5 py-4 mx-3 my-3">
      <div className={`flex items-center w-24 sm:w-56 text-xs sm:text-base justify-between mb-1 ${visitorWinner(game) ? 'font-extrabold' : 'text-gray-500'}`}>
        <TeamImage team={visitor} isSmall={true} />
        <span className="inline sm:hidden">{ visitorAbbreviation }</span>
        <span className="hidden sm:inline">{ getVisitorTeamLocation(game) }</span>
        <span>{ visitorFinalScore(game) }</span>
      </div>
      <div className={`flex items-center w-24 sm:w-56 text-xs sm:text-base justify-between ${homeWinner(game) ? 'font-extrabold' : 'text-gray-500'}`}>
        <TeamImage team={home} isSmall={true} />
        <span className="inline sm:hidden">{ homeAbbreviation }</span>
        <span className="hidden sm:inline">{ getHomeTeamLocation(game) }</span>
        <span>{ homeFinalScore(game) }</span>
      </div>
    </div>
  )
}

export default Final;