import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="bg-gray-500 px-4 py-4">
    <div>
      <h1 className="text-3xl font-semibold">
        <Link
          to="/"
        >
          {`${siteTitle} 🏈`}
        </Link>
      </h1>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
