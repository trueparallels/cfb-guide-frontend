import React from 'react'

import Game from "./game";

const GameWeekPage = (props) => {
  const { path, pageContext } = props;
  const { games, week } = pageContext;

  return (
    <div class="mx-4 font-opensans">
      <h2>Week { week }</h2>
      <ul>
        {
          games.map((game) => (
            <React.Fragment key={game.gameId}>
              <Game pageContext={game} path={`${path}/${game.gameId}`} />
              <pre>
                {
                  JSON.stringify(game, null, 4)
                }
              </pre>
            </React.Fragment>
          ))
        }
      </ul>
    </div>
  )
};

export default GameWeekPage;