import React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"

import Layout from "../components/layout"
import SEO from "../components/seo"

import { getYearsDataFromStaticQuery } from '../utils/year-utils'

const IndexPage = () => {
  const data = useStaticQuery(graphql`
    query GamesQuery {
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
      allSitePage(sort: {fields: context___year}, filter: {context: {contentType: {eq: "year"}}}) {
        nodes {
          context {
            contentType
            year
          }
        }
      }
    }
  `)

  try {
    const years = getYearsDataFromStaticQuery(data)

    return (
      <Layout>
        <SEO title="CFB Guide" />
        <div className="my-3 mx-2">
          <div>
            <span className="text-3xl font-bold">&nbsp;</span>
          </div>
          <div>
            <ul>
              {
                years && years.map(year => (
                    <li key={year}>
                      <Link to={`/${year}`}>
                        <span className="text-2xl">{year}</span>
                      </Link>
                    </li>
                ))
              }
            </ul>
          </div>
        </div>        
      </Layout>
    )
  } catch {
    return (
      <div>Oops ¯\_(ツ)_/¯</div>
    )
  }
}

export default IndexPage
