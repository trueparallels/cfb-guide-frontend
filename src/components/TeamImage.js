import React from 'react'

const TeamImage = (props) => {
  const { team, isSmall = false } = props;

  if (isSmall) {
    return (
      <img className="w-6 h-6 sm:w-10 sm:h-10" src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${team.id}.png&h=80`} alt={team.location} />
    )
  }

  return (
    <img src={`https://a.espncdn.com/combiner/i?img=/i/teamlogos/ncaa/500/${team.id}.png&h=80`} alt={team.location} />
  )
}

export default TeamImage;
