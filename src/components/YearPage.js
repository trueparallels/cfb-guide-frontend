import React, { useState } from 'react'
import { reject, prepend } from 'ramda'
import { useStaticQuery, graphql } from 'gatsby'

import Layout from "./layout"
import SEO from "./seo"
import Filters from "./filters"
import JumpToWeek from "./JumpToWeek"
import GameWeek from "./gameweek"
import BackToTopButton from "./BackToTopButton"

import { isFCSTeam, sortTeamsByName } from '../utils/team-utils'
import { allGamesFinalForWeek, groupGamesByWeek } from '../utils/game-utils'

const YearPage = (props) => {
  const { pageContext } = props
  const { games } = pageContext;
  
  const data = useStaticQuery(graphql`
    query YearPageQuery {
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
    }`)

  const { conference: conferencesFromQuery, teams: teamsFromQuery, networks: networksFromQuery } = data.cfbApi

  const [selectedNetwork, setSelectedNetwork] = useState('-- All --');
  const [confGamesOnly, setConfGamesOnly] = useState(false);
  const [tvNotScheduled, setTvNotScheduled] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [selectedConference, setSelectedConference] = useState(null);

  const gamesGroupedByWeek = groupGamesByWeek(games)
  const allWeeksKeys = Object.keys(gamesGroupedByWeek)
  const weekData = []
  
  const weekNumber = x => (Number(x.split('-')[1]));
  allWeeksKeys.sort((a, b) => {
    return weekNumber(a) - weekNumber(b)
  });

  // allWeeksKeys.forEach(x => (console.log(gamesGroupedByWeek[x])))

  const conferences = conferencesFromQuery.sort((a, b) => a.name.localeCompare(b.name));
  const networks = networksFromQuery.map(n => n.name).sort();
  const fbsTeams = prepend({ id: null, displayName: '-- All Teams --'}, sortTeamsByName(reject(isFCSTeam, teamsFromQuery)));

  // const finishedWeeks = weekData.filter(w => allGamesFinalForWeek(w))
  // const incompleteWeeks = weekData.filter(w => !allGamesFinalForWeek(w))
  const finishedWeeks = allWeeksKeys.filter(w => allGamesFinalForWeek(gamesGroupedByWeek[w]))
  const incompleteWeeks = allWeeksKeys.filter(w => !allGamesFinalForWeek(gamesGroupedByWeek[w]))

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
        finishedWeeks.map((weekNo) => (
            <GameWeek
              key={weekNo}
              gamesForWeek={gamesGroupedByWeek[weekNo]}
              filters={ { selectedNetwork, confGamesOnly, selectedTeam, selectedConference, tvNotScheduled } }
              week={weekNo}
              weekYear={2020}
            />

          )
        )
      }
      {
        incompleteWeeks.map((weekNo) => (
            <GameWeek
              key={weekNo}
              gamesForWeek={gamesGroupedByWeek[weekNo]}
              filters={ { selectedNetwork, confGamesOnly, selectedTeam, selectedConference, tvNotScheduled } }
              week={weekNo}
              weekYear={2020}
            />
          )
        )
      }
      <BackToTopButton />
    </Layout>
  )
};

export default YearPage;