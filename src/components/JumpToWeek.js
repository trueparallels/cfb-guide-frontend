import React from 'react'

const JumpToWeek = (props) => {
  const { weeks } = props;

  return (
    <div className="flex flex-wrap border border-green-400 bg-green-200 my-5 px-5 py-4">
      <div className="w-full font-bold">Jump To:</div>
      {
        weeks.map(week => {
          const weekNumber = week.replace('2019-', '')
          const weekTitle = `Week ${weekNumber}`;

          return (
            <span key={week} className="pr-2 py-1">
              <a className="underline" href={`#week-${week.replace('2019-', '')}`}>{parseInt(weekNumber) === 15 ? "Championship Weekend" : weekTitle}</a>
            </span>
          );
        })
      }
    </div>
  )
}

export default JumpToWeek;