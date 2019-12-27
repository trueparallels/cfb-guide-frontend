import React from 'react'
import { prop } from 'ramda'

const TeamImage = (props) => {
  const { team, isSmall = false } = props;

  const teamId = prop('id', team)
  const teamLocation = prop('location', team)

  if (!teamId) {
    return (
      <div></div>
    )
  }

  if (isSmall) {
    return (
      <img className="w-6 h-6 sm:w-10 sm:h-10" src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${teamId}.png&h=80`} alt={teamLocation} />
    )
  }

  return (
    <img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${teamId}.png&h=80`} alt={teamLocation} />
  )
}

export default TeamImage;
