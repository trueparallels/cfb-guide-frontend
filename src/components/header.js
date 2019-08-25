import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="bg-white px-4 py-4 border-b border-green-600 hidden">
    <div className="text-center">
      <h1 className="font-raleway text-3xl md:text-5xl font-semibold text-green-600">
        <Link
          to="/"
        >
          {`🏈 ${siteTitle} 🏈`}
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
