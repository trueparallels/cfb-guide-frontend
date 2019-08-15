const R = require('ramda')
const path = require(`path`)

exports.createPages = async ({actions, graphql}) => {
  const weekQuery = async (week) => {
    return await graphql(`
    {
      cfbApi {
        byWeek(week: "2019-${week}") {
          gameId
          gameWeekYear
          date
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
    `)
  }

  const weeks = R.range(1,15)

  const allWeeks = Promise.all(
    R.map(weekQuery)(weeks)
  )

  const getGameYear = R.pipe(R.split('-'), R.nth(0));
  const getGameWeek = R.pipe(R.split('-'), R.nth(1));
  const padGameWeek = R.ifElse(x => Number(getGameWeek(x)) < 10, x => R.concat('week-0', getGameWeek(x)), x => R.concat('week-', getGameWeek(x)));

  return allWeeks.then((data) => {
    data.forEach(item => {
      console.log(item.data.cfbApi.byWeek)

      item.data.cfbApi.byWeek.forEach((game) => {
        const context = {
          ...game
        }

        actions.createPage({
          path: `/${getGameYear(game.gameWeekYear)}/${padGameWeek(game.gameWeekYear)}/${game.gameId}`,
          component: path.resolve('src/components/game.js'),
          context
        })
      })
    });
  });
};