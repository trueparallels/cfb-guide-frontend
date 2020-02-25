import React from 'react'
import { getWeekName } from '../utils/game-utils'

const JumpToWeek = (props) => {
  const { weeks, year, setSelectedWeek } = props;

  const handleSelectedWeek = (event) => {
    setSelectedWeek(event.target.value)
  }

  return (
    <div className="flex flex-wrap bg-gray-500 text-gray-100 mb-5 px-5 py-4">
      <label htmlFor="jump-to" className="mr-2 font-bold text-shadow-lg">Jump To:</label>
      <select name="jump-to" className="text-black w-1/4" onBlur={handleSelectedWeek} onChange={handleSelectedWeek}>
        <option>-- Select Week --</option>
        {
          weeks.map(week => {
            const weekNumber = week.replace(`${year}-`, '')
            const weekTitle = getWeekName(weekNumber);

            return (
              <option key={week} value={`/${year}#week-${week}`}>{weekTitle}</option>
            );
          })
        }
      </select>
    </div>
  )
}

export default JumpToWeek;