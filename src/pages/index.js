import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"
import GameWeek from "../components/gameweek"

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
                const { gameId, date, home, visitor, homeAbbreviation, visitorAbbreviation, isNeutralSite } = game.context;

                return (
                  <li key={gameId}>
                    <Link to={game.path}>
                    {`${visitor} (${visitorAbbreviation}) ${isNeutralSite ? 'vs.' : 'at'} ${home} (${homeAbbreviation}) - ${date ? date : 'TBD'}`}
                    </Link>
                  </li>
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
