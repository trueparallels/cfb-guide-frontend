import React, { useState } from 'react'
import { reject, prepend } from 'ramda'
import { graphql } from 'gatsby'
import scrollTo from 'gatsby-plugin-smoothscroll'

import Layout from "./layout"
import SEO from "./seo"
import Filters from "./filters"
import JumpToWeek from "./jumptoweek"
import GameWeek from "./gameweek"
import BackToTopButton from "./backtotopbutton"

import { isFCSTeam, sortTeamsByName } from '../utils/team-utils'
import { allGamesFinalForWeek, groupGamesByWeek, weekNumber } from '../utils/game-utils'

const YearPage = (props) => {
  const { pageContext, data } = props
  const { year, games } = pageContext

  const { conference: conferencesFromQuery, teams: teamsFromQuery, networks: networksFromQuery } = data.cfbApi

  const [selectedNetwork, setSelectedNetwork] = useState('-- All --')
  const [confGamesOnly, setConfGamesOnly] = useState(false)
  const [tvNotScheduled, setTvNotScheduled] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState(null)
  const [selectedConference, setSelectedConference] = useState(null)
  const [selectedWeek, setSelectedWeek] = useState(null)

  const handleSelectedWeek = (value) => {
    if (value && value !== selectedWeek) {
      setSelectedWeek(value)
      scrollTo(value)
    }
  }

  const handleBackToTop = (event) => {
    setSelectedWeek(null)
    window.scrollTo(0,0)
  }

  const gamesGroupedByWeek = groupGamesByWeek(games)
  const allWeeksKeys = Object.keys(gamesGroupedByWeek)

  allWeeksKeys.sort((a, b) => {
    return weekNumber(a) - weekNumber(b)
  })

  const conferences = conferencesFromQuery.sort((a, b) => a.name.localeCompare(b.name))
  const networks = networksFromQuery.map(n => n.name).sort()
  const fbsTeams = prepend({ id: null, displayName: '-- All Teams --'}, sortTeamsByName(reject(isFCSTeam, teamsFromQuery)))

  const finishedWeeks = allWeeksKeys.filter(w => allGamesFinalForWeek(gamesGroupedByWeek[w]))
  const incompleteWeeks = allWeeksKeys.filter(w => !allGamesFinalForWeek(gamesGroupedByWeek[w]))

  return (
    <Layout>
      <SEO title="CFB Guide" />
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
      <JumpToWeek weeks={allWeeksKeys} year={year} handleSelectedWeek={handleSelectedWeek} />
      <div className="mx-4">
        {
          finishedWeeks.map((weekNo) => (
              <GameWeek
                key={weekNo}
                gamesForWeek={gamesGroupedByWeek[weekNo]}
                filters={ { selectedNetwork, confGamesOnly, selectedTeam, selectedConference, tvNotScheduled } }
                week={weekNo}
                weekYear={year}
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
                weekYear={year}
              />
            )
          )
        }
      </div>
      <BackToTopButton handleBackToTop={handleBackToTop} />
    </Layout>
  )
}

export const query = graphql`
  query {
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
    }
`

export default YearPage