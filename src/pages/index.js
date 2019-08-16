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
        (
          <ul>
            {
              weekData.map((data) => (
                <li className="inline mr-2" key={data.fieldValue}>
                  <a href={`#week-${data.fieldValue.replace('2019-', '')}`}>{ `Week ${data.fieldValue.replace('2019-', '')}` }</a>
                </li>
              ))
            }
          </ul>
        )
      }
      {
        weekData.map((data) => (
          <GameWeek key={data.fieldValue} week={weekNumber(data.fieldValue)}>
            {
              data.edges.map(({node: game}) => {
                return (
                  <Game key={game.context.gameId} pageContext={game.context} path={game.path} />
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
