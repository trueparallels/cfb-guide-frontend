import React from 'react';

const GameWeek = (props) => {
  const { week, children } = props;

  return (
    <div className="max-w-5xl mx-auto my-0">
      <a href={`week-${week}`} name={`week-${week}`}>
        <h3 className="text-2xl font-semibold">{ `Week ${week}` }</h3>
      </a>
      <ul>
        { children }
      </ul>
    </div>
  );
};

export default GameWeek;