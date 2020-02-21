import React from 'react'

import Layout from "./layout";
import SEO from "./seo";
import Game from "./game";

const GameWeekPage = (props) => {
  const { path, pageContext, data } = props;
  const { week } = pageContext;
  const { edges: games } = data.allSitePage;

  return (
    <Layout>
      <SEO title="CFB Guide" />
      <div className="mx-4 font-opensans">
        <h2 className="font-raleway text-3xl">Week { week }</h2>
        <ul>
          {
            games.map((game) => (
              <div key={game.node.context.gameId} className="mb-4">
                <Game pageContext={game.node.context} path={`${path}/${game.node.context.gameId}`} />
              </div>
            ))
          }
        </ul>
      </div>
    </Layout>
  )
};

export default GameWeekPage;