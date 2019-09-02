import React, { useState } from 'react';
import { prop, map, pathEq, filter, ifElse, identity, equals, T, isNil, not, and, pipe, anyPass } from 'ramda';

import { isConferenceGame, isFinal } from '../utils/game-utils'

import Game from './game';
import Final from './final';

const GameWeek = (props) => {
  const [showGames, setShowGames] = useState(false);

  const handleShowGames = () => setShowGames(!showGames)

  const { week, weekYear, gamesForWeek, filters } = props;
  const { selectedNetwork, confGamesOnly, selectedTeam, selectedConference } = filters;

  const games = map(prop('node'), gamesForWeek);

  const isHomeTeam = pathEq(['context', 'homeTeam', 'id'], selectedTeam)
  const isVisitorTeam = pathEq(['context', 'visitorTeam', 'id'], selectedTeam)
  const isSelectedNetwork = pathEq(['context', 'network'], selectedNetwork);
  const isTeamInGame = anyPass([isHomeTeam, isVisitorTeam])
  const isHomeTeamInConference = pathEq(['context', 'homeTeam', 'conference', 'id'], selectedConference)
  const isVisitorTeamInConference = pathEq(['context', 'visitorTeam', 'conference', 'id'], selectedConference)
  const isConferenceInGame = anyPass([isHomeTeamInConference, isVisitorTeamInConference])

  const isAnyConferenceSelected = () => and(not(isNil(selectedConference)), not(equals(selectedConference, '-- All --')))
  const isAnyNetworkSelected = () => not(equals(selectedNetwork, '-- All --'));
  const isAnyTeamSelected = () => and(not(isNil(selectedTeam)), not(equals(selectedTeam, '-- All Teams --')));
  const isConfGameOnlySelected = () => equals(confGamesOnly, T());

  const completedGames = games.filter((game) => {
    return isFinal(prop('context', game))
  })
  const scheduledGames = games.filter((game) => {
    return !isFinal(prop('context', game))
  })

  const filterGamesForNetwork = ifElse(
    isAnyNetworkSelected,
    filter(isSelectedNetwork),
    identity
  );

  const filterGamesForTeam = ifElse(
    isAnyTeamSelected,
    filter(isTeamInGame),
    identity
  );

  const filterGamesForConferenceOnly = ifElse(
    isConfGameOnlySelected,
    filter(
      pipe(
        prop('context'),
        isConferenceGame
      )
    ),
    identity
  );

  const filterGamesForSelectedConference = ifElse(
    isAnyConferenceSelected,
    filter(isConferenceInGame),
    identity
  );

  const filteredGamesForWeek = pipe(
    filterGamesForNetwork,
    filterGamesForTeam,
    filterGamesForSelectedConference,
    filterGamesForConferenceOnly
  )(scheduledGames);

  const filteredCompletedGames = pipe(
    filterGamesForNetwork,
    filterGamesForTeam,
    filterGamesForSelectedConference,
    filterGamesForConferenceOnly
  )(completedGames);

  const noGamesFinal = equals(0, completedGames.length)

  return (
    <div className="max-w-5xl mx-auto my-6">
      <a name={`week-${week}`}>
        <h2 className="font-raleway text-2xl md:text-3xl">{ `Week ${week}` }</h2>
      </a>
      <div className={`flex items-center justify-between border border-gray-300 px-4 py-3 rounded ${noGamesFinal ? 'hidden' : ''}`}>
        <span className="text-sm font-extrabold">{`${completedGames.length}/${games.length} Games Completed ${filteredCompletedGames.length < completedGames.length ? '(Filtered)' : '' }`}</span>
        <button
          onClick={handleShowGames}
          type="button"
          className="border border-gray-400 text-sm rounded bg-gray-200 font-bold px-3 py-2 hover:bg-gray-300 w-32"
          >{showGames ? `Hide Games` : `Show Games`}</button>
      </div>
      <div className={`flex flex-wrap justify-center ${showGames ? '' : 'hidden'}`}>
        {
          filteredCompletedGames.map((game) => (
            <Final key={game.context.gameId} game={game.context} home={game.context.homeTeam} visitor={game.context.visitorTeam} />
          ))
        }
      </div>
      {
        filteredGamesForWeek.length === 0 &&
        (
          <h4>No games currently scheduled this week for given filters.</h4>
        )
      }
      <ul>
      {
        filteredGamesForWeek.map((game) => {
          return (
            <div key={game.context.gameId} className="my-4">
              <Game pageContext={game.context} path={game.path} selectedNetwork={selectedNetwork} />
            </div>
          );
        })
      }
      </ul>
    </div>
  );
};

export default GameWeek;