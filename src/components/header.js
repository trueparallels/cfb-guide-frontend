import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

const Header = ({ siteTitle }) => (
  <header className="bg-green-600 px-4 py-4">
    <div className="text-center">
      <h1 className="font-raleway text-5xl font-semibold text-orange-800">
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
