const R = require('ramda')
const path = require(`path`)

exports.createPages = async ({actions, graphql}) => {
  const allGamesQuery = async (year) => {
    return await graphql(`
    {
      cfbApi {
        allGamesByYear(year: "${year}") {
          gameId
          gameWeekYear
          date
          dateIsValid
          network
          headline
          home
          homeFinalScore
          visitor
          visitorFinalScore
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
    `)
  }

  const years = R.range(2019, new Date().getFullYear() + 1)

  const allYears = Promise.all(
    R.map(allGamesQuery)(years)
  )

  const getGameYear = R.pipe(R.split('-'), R.nth(0))

  return allYears.then((data) => {
    data.forEach(item => {
      const gamesByYear = item.data.cfbApi.allGamesByYear
      if (!gamesByYear) {
        const { errors } = item

        const errorMap = R.map(err => R.prop('message', err), errors)
        const errorMsg = R.join("; ", errorMap)

        throw `Error accessing games data: ${errorMsg}`
      }
      const sampleGame = gamesByYear[0].gameWeekYear

      actions.createPage({
        path: `${getGameYear(sampleGame)}`,
        component: path.resolve('src/components/YearPage.js'),
        context: {
          games: gamesByYear,
          contentType: 'year',
          year: getGameYear(sampleGame),
        }
      })
    })
  })
}