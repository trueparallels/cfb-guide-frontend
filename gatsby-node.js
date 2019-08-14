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
          homeAbbreviation
          visitorAbbreviation
        }
      }
    }
    `)
  }

  const weeks = R.range(1,15)

  const allWeeks = Promise.all(
    R.map(weekQuery)(weeks)
  )

  return allWeeks.then((data) => {
    data.forEach(item => {
      console.log(item.data.cfbApi.byWeek)

      item.data.cfbApi.byWeek.forEach((game) => {
        const context = {
          ...game
        }

        actions.createPage({
          path: `/week-${game.gameWeekYear}/${game.gameId}`,
          component: path.resolve('src/components/game.js'),
          context
        })
      })
    });
  });
};