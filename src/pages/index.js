import React from "react"
import { Link, useStaticQuery, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query GamesQuery {
      allSitePage(filter: {path: {regex: "/week-.*/"}}) {
        nodes {
          id
          path
          context {
            gameId
            gameWeekYear
            date
            homeAbbreviation
            visitorAbbreviation
          }
        }
      }
    }
  `);

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
      <Link to="/page-2/">Go to page 2</Link>
      <ul>
        {
          data.allSitePage.nodes.map((game) => (
            <li key={game.context.gameId}>
              <Link to={game.path}>{`${game.context.gameWeekYear}: ${game.context.visitorAbbreviation} vs. ${game.context.homeAbbreviation}`}</Link>
            </li>
          ))
        }
      </ul>
    </Layout>
  )
}

export default IndexPage
