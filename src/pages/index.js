import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GameWeek from "../components/gameweek"
import Game from "../components/game"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query GamesQuery {
      allSitePage(sort:{
        fields: [context___gameWeekYear, context___date],
        order: [ASC, ASC]
      }, filter: {
        context: { gameId: { ne: null }}
      }) {
        group(field: context___gameWeekYear) {
          fieldValue
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
    }
  `);

  const weekData = data.allSitePage.group;
  const weekNumber = x => (Number(x.split('-')[1]));
  weekData.sort((a, b) => {
    return weekNumber(a.fieldValue) - weekNumber(b.fieldValue)
  });

  return (
    <Layout>
      <SEO title="CFB Guide" />
      {
        weekData.map((data) => (
          <GameWeek key={data.fieldValue} week={weekNumber(data.fieldValue)}>
            {
              data.edges.map(({node: game}) => {
                return (
                  <div key={game.context.gameId} className="my-4">
                    <Game pageContext={game.context} path={game.path} />
                  </div>
                );
              })
            }
          </GameWeek>
        ))
      }
    </Layout>
  )
}

export default IndexPage
