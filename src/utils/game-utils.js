import { pipe, path, lensPath, juxt, view, compose, not, isNil } from 'ramda'
import { allIdentical } from 'ramda-adjunct'

export const getTeamConferenceName = path(['conference', 'name'])
export const homeTeamLens = lensPath(['homeTeam'])
export const visitorTeamLens = lensPath(['visitorTeam'])
export const getTeamConferenceLens = lensPath(['conference'])
export const getHomeTeamConferenceLens = compose(homeTeamLens, getTeamConferenceLens)
export const getVisitorTeamConferenceLens = compose(visitorTeamLens, getTeamConferenceLens)
export const getHomeTeamConferenceId = compose(getHomeTeamConferenceLens, lensPath(['id']))
export const getVisitorTeamConferenceId = compose(getVisitorTeamConferenceLens, lensPath(['id']))
export const getHomeTeamLocation = view(compose(homeTeamLens, lensPath(['location'])))
export const getVisitorTeamLocation = view(compose(visitorTeamLens, lensPath(['location'])))

export const isConferenceGame = pipe(
  juxt([view(getHomeTeamConferenceId), view(getVisitorTeamConferenceId)]),
  allIdentical
)

export const homeFinalScore = path(['homeFinalScore'])
export const visitorFinalScore = path(['visitorFinalScore'])

export const isFinal = (game) => not(isNil(homeFinalScore(game))) && not(isNil(visitorFinalScore(game)))

export const homeWinner = (game) => {
  const homeFinal = Number(homeFinalScore(game))
  const visitorFinal = Number(visitorFinalScore(game))

  return homeFinal > visitorFinal
}

export const visitorWinner = (game) => {
  const homeFinal = Number(homeFinalScore(game))
  const visitorFinal = Number(visitorFinalScore(game))

  return visitorFinal > homeFinal
}