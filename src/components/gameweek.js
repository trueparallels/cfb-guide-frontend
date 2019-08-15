import React from 'react';

const GameWeek = (props) => {
  const { week, children } = props;

  return (
    <div>
      <h3>{ `Week ${week}` }</h3>
      { children }
    </div>
  );
};

export default GameWeek;