import React from 'react';
import { prop, map, pathEq, filter, ifElse, identity, equals, not } from 'ramda';

import Game from './game';

const GameWeek = (props) => {
  const { week, weekYear, gamesForWeek, filters } = props;
  const { selectedNetwork } = filters;

  const [year, weekNo] = weekYear.split('-');
  const weekYearHref = `/${year}/week-${weekNo.padStart(2, '0')}`;

  const games = map(prop('node'), gamesForWeek);
  const isSelectedNetwork = pathEq(['context', 'network'], selectedNetwork);
  const isAnyNetworkSelected = () => not(equals(selectedNetwork, '-- All --'));
  const filteredGamesForWeek = ifElse(
    isAnyNetworkSelected,
    filter(isSelectedNetwork),
    identity
  )(games);

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