import { prop, pipe, map } from 'ramda'
import { list, allIdentical } from 'ramda-adjunct'

export const getTeamConferenceName = pipe(prop('conference'), prop('name'))

export const isConferenceGame = (visitorTeam, homeTeam) => (
  pipe(
    map(getTeamConferenceName),
    allIdentical
  )(list(visitorTeam, homeTeam))
)