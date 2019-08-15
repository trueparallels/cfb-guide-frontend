import React from 'react'

import Layout from './layout';

const Game = ({path, pageContext}) => {
  return (
    <Layout>
      <div>
        <ul>
          { Object.keys(pageContext).map((key, idx) => (
            <li key={key}>{ key }: { pageContext[key] }</li>
          ))}
        </ul>
      </div>
    </Layout>
  )
};

export default Game;