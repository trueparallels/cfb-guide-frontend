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
  const { game, home, visitor } = props;
  const { visitorAbbreviation, homeAbbreviation } = game;

  return (
    <React.Fragment>
      <div className="w-full flex items-center justify-between">
        <div className={`flex flex-grow min-w-40 items-center justify-around ${visitorWinner ? 'font-extrabold' : 'text-gray-600'}`}>
          <span className="inline sm:hidden">{ visitorAbbreviation }</span>
          <span className="hidden sm:inline">{ getVisitorTeamLocation(game) }</span>
          <TeamImage team={visitor} isSmall={true} />
          <span>{ visitorFinalScore(game) }</span>
        </div>
        <div className="px-1">
          <span className="font-extrabold text-lg text-gray-900">Final</span>
        </div>
        <div className={`flex flex-grow min-w-40 items-center justify-around ${homeWinner ? 'font-extrabold' : 'text-gray-600'}`}>
          <span>{ homeFinalScore(game) }</span>
          <TeamImage team={home} isSmall={true} />
          <span className="inline sm:hidden">{ homeAbbreviation }</span>
          <span className="hidden sm:inline">{ getHomeTeamLocation(game) }</span>
        </div>
      </div>
    </React.Fragment>
  )
}

export default Final;