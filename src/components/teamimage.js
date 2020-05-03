import React from 'react'
import { prop } from 'ramda'
import LazyLoad from 'react-lazy-load'

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
      <LazyLoad height={24} width={24} offset={1000} debounce={false}>
        <img className="w-6 h-6 sm:w-10 sm:h-10" src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${teamId}.png&h=80`} alt={teamLocation} />
      </LazyLoad>
    )
  }

  return (
    <LazyLoad height={80} width={80} offset={1000} debounce={false}>
      <img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${teamId}.png&h=80`} alt={teamLocation} />
    </LazyLoad>
  )
}

export default TeamImage;
