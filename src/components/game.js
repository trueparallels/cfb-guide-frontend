import React from 'react'

const Game = ({path, pageContext}) => {
  return (
    <div>
      <ul>
        { Object.keys(pageContext).map((key, idx) => (
          <li key={key}>{ key }: { pageContext[key] }</li>
        ))}
      </ul>
    </div>
  )
};

export default Game;