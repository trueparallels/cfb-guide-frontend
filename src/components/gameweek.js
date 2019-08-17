import React from 'react';

const GameWeek = (props) => {
  const { week, children } = props;

  return (
    <div className="max-w-5xl mx-auto my-6">
      <a href={`week-${week}`} name={`week-${week}`}>
        <h2 className="font-raleway text-3xl">{ `Week ${week}` }</h2>
      </a>
      <ul>
        { children }
      </ul>
    </div>
  );
};

export default GameWeek;