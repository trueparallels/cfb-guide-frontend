import React from 'react';
import { prop, map, pathEq, filter, ifElse, identity, equals, T, isNil, not, and, pipe, anyPass } from 'ramda';

import { isConferenceGame } from '../utils/game-utils'

import Game from './game';

const GameWeek = (props) => {
  const { week, weekYear, gamesForWeek, filters } = props;
  const { selectedNetwork, confGamesOnly, selectedTeam } = filters;

  const [year, weekNo] = weekYear.split('-');
  const weekYearHref = `/${year}/week-${weekNo.padStart(2, '0')}`;

  const games = map(prop('node'), gamesForWeek);

  const isHomeTeam = pathEq(['context', 'homeTeam', 'id'], selectedTeam)
  const isVisitorTeam = pathEq(['context', 'visitorTeam', 'id'], selectedTeam)
  const isSelectedNetwork = pathEq(['context', 'network'], selectedNetwork);
  const isTeamInGame = anyPass([isHomeTeam, isVisitorTeam])

  const isAnyNetworkSelected = () => not(equals(selectedNetwork, '-- All --'));
  const isAnyTeamSelected = () => and(not(isNil(selectedTeam)), not(equals(selectedTeam, '-- All Teams --')));
  const isConfGameOnlySelected = () => equals(confGamesOnly, T());

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

  const filteredGamesForWeek = pipe(
    filterGamesForNetwork,
    filterGamesForTeam,
    filterGamesForConferenceOnly
  )(games);

  try {
  } catch (e) {
    return (
      <div>
        <h4>Error retrieving length of filtered games</h4>
        <pre class="border">{e.message}</pre>
      </div>
    )
  }

  return (
    <div className="max-w-5xl mx-auto my-6">
      <a href={`${weekYearHref}`} name={`week-${week}`}>
        <h2 className="font-raleway text-2xl md:text-3xl">{ `Week ${week}` }</h2>
      </a>
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