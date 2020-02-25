import { path, pipe, map } from 'ramda'

export const getIndividualYear = path(['context', 'year'])

export const getYearsDataFromStaticQuery = pipe(
  path(['allSitePage', 'nodes']),
  map(getIndividualYear)
)
