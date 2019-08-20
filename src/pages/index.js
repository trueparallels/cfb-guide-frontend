import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { reject, prepend } from 'ramda'

import Layout from "../components/layout"
import Filters from "../components/filters"
import SEO from "../components/seo"
import GameWeek from "../components/gameweek"

import { isFCSTeam, sortTeamsByName } from '../utils/team-utils'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query GamesQuery {
      cfbApi {
        networks {
          name
        }
        teams {
          id
          displayName
          conference {
            name
          }
        }
      }
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

  const [selectedNetwork, setSelectedNetwork] = useState('-- All --');
  const [confGamesOnly, setConfGamesOnly] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);

  const weekData = data.allSitePage.group;
  const weekNumber = x => (Number(x.split('-')[1]));
  weekData.sort((a, b) => {
    return weekNumber(a.fieldValue) - weekNumber(b.fieldValue)
  });

  const networks = data.cfbApi.networks.map(n => n.name).sort();
  const fbsTeams = prepend({ id: null, displayName: '-- All Teams --'}, sortTeamsByName(reject(isFCSTeam, data.cfbApi.teams)));

  return (
    <Layout>
      <SEO title="CFB Guide" />
      <Filters
        networks={networks}
        teams={fbsTeams}
        setNetwork={setSelectedNetwork}
        setConfGamesOnly={setConfGamesOnly}
        setSelectedTeam={setSelectedTeam}
      />
      {
        weekData.map(({fieldValue, edges: gamesForWeek}) => (
          <GameWeek
            key={fieldValue}
            gamesForWeek={gamesForWeek}
            filters={ { selectedNetwork, confGamesOnly, selectedTeam } }
            week={weekNumber(fieldValue)}
            weekYear={fieldValue}
          />
        ))
      }
    </Layout>
  )
}

export default IndexPage
