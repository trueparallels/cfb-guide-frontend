import React from 'react';

const GameWeek = (props) => {
  const { week, children } = props;

  return (
    <div>
      <h3 class="text-2xl font-semibold">{ `Week ${week}` }</h3>
      <ul>
        { children }
      </ul>
    </div>
  );
};

export default GameWeek;