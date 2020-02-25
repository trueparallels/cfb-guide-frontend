/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"

import Header from "./header"
import "./tailwind.css"

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <div className="min-h-screen font-opensans flex flex-col">
      <Header siteTitle={data.site.siteMetadata.title} />
      <main className="flex-grow">{children}</main>
      <footer className="px-2 py-1 bg-gray-800 text-gray-100 text-sm">
        © {new Date().getFullYear()}, cfbtv.guide
      </footer>
    </div>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
