import { pathEq, ascend, prop, sort } from 'ramda';

export const isFCSTeam = pathEq(['conference', 'name'], 'FCS')

export const sortTeamsByName = sort(ascend(prop('displayName')))