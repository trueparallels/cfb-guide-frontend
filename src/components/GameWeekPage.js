import React from 'react'
import { graphql } from 'gatsby';

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

export const query = graphql`
query GameWeekQuery($gameWeekYear: String) {
  allSitePage(sort:{
    fields: [context___date],
    order: [ASC]
  }, filter: {
    context: { gameWeekYear: { eq: $gameWeekYear }, gameId: { ne: null}}
  }) {
    edges {
      node {
        path
        context {
          gameId
          gameWeekYear
          date
          network
          home
          visitor
          homeAbbreviation
          visitorAbbreviation
          isNeutralSite
          homeTeam {
            id
            abbreviation
            alternateColor
            color
            displayName
            location
            name
            conference {
              id
              name
            }
          }
          visitorTeam {
            id
            abbreviation
            alternateColor
            color
            displayName
            location
            name
            conference {
              id
              name
            }
          }
        }
      }
    }
  }
}
`;

export default GameWeekPage;