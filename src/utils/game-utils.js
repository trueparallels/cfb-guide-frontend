import { pipe, path, lensPath, juxt, view, compose } from 'ramda'
import { allIdentical } from 'ramda-adjunct'

export const getTeamConferenceName = path(['conference', 'name'])
export const homeTeamLens = lensPath(['homeTeam'])
export const visitorTeamLens = lensPath(['visitorTeam'])
export const getTeamConferenceLens = lensPath(['conference'])
export const getHomeTeamConferenceLens = compose(homeTeamLens, getTeamConferenceLens)
export const getVisitorTeamConferenceLens = compose(visitorTeamLens, getTeamConferenceLens)
export const getHomeTeamConferenceId = compose(getHomeTeamConferenceLens, lensPath(['id']))
export const getVisitorTeamConferenceId = compose(getVisitorTeamConferenceLens, lensPath(['id']))

// export const isConferenceGame = (visitorTeam, homeTeam) => (
//   pipe(
//     map(getTeamConferenceName),
//     allIdentical
//   )(list(visitorTeam, homeTeam))
// )

export const isConferenceGame = pipe(
  juxt([view(getHomeTeamConferenceId), view(getVisitorTeamConferenceId)]),
  allIdentical
)