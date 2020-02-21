import React, { useState } from "react"
import { useStaticQuery, graphql } from "gatsby"
import { reject, prepend } from 'ramda'

import Layout from "../components/layout"
import Filters from "../components/filters"
import JumpToWeek from "../components/JumpToWeek"
import BackToTopButton from "../components/BackToTopButton"
import SEO from "../components/seo"
import GameWeek from "../components/gameweek"

import { isFCSTeam, sortTeamsByName } from '../utils/team-utils'
import { allGamesFinalForWeek } from '../utils/game-utils'

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
        conference {
          id
          name
        }
      }
      allSitePage(sort: {fields: context___year}, filter: {context: {contentType: {eq: "year"}}}) {
        nodes {
          context {
            contentType
            year
          }
        }
      }
    }
  `);

  const [selectedNetwork, setSelectedNetwork] = useState('-- All --');
  const [confGamesOnly, setConfGamesOnly] = useState(false);
  const [tvNotScheduled, setTvNotScheduled] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);

  const weekData = data.allSitePage.group;
  const weekNumber = x => (Number(x.split('-')[1]));
  weekData.sort((a, b) => {
    return weekNumber(a.fieldValue) - weekNumber(b.fieldValue)
  });

  const conferences = data.cfbApi.conference.sort((a, b) => a.name.localeCompare(b.name));
  const networks = data.cfbApi.networks.map(n => n.name).sort();
  const fbsTeams = prepend({ id: null, displayName: '-- All Teams --'}, sortTeamsByName(reject(isFCSTeam, data.cfbApi.teams)));

  const finishedWeeks = weekData.filter(w => allGamesFinalForWeek(w))
  const incompleteWeeks = weekData.filter(w => !allGamesFinalForWeek(w))


  return (
    <Layout>
      <SEO title="CFB Guide" />
      <JumpToWeek weeks={weekData.map(week => week.fieldValue)} />
      <Filters
        networks={networks}
        teams={fbsTeams}
        conferences={conferences}
        setNetwork={setSelectedNetwork}
        setConfGamesOnly={setConfGamesOnly}
        setSelectedTeam={setSelectedTeam}
        setSelectedConference={setSelectedConference}
        setTvNotScheduled={setTvNotScheduled}
      />
      {
        finishedWeeks.map(({fieldValue, edges: gamesForWeek}) => (
          <GameWeek
            key={fieldValue}
            gamesForWeek={gamesForWeek}
            filters={ { selectedNetwork, confGamesOnly, selectedTeam, selectedConference, tvNotScheduled } }
            week={weekNumber(fieldValue)}
            weekYear={fieldValue}
          />
        ))
      }
      {
        incompleteWeeks.map(({fieldValue, edges: gamesForWeek}) => (
          <GameWeek
            key={fieldValue}
            gamesForWeek={gamesForWeek}
            filters={ { selectedNetwork, confGamesOnly, selectedTeam, selectedConference, tvNotScheduled } }
            week={weekNumber(fieldValue)}
            weekYear={fieldValue}
          />
        ))
      }
      <BackToTopButton />
    </Layout>
  )
}

export default IndexPage
