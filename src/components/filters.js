import React from 'react'
import { isNil, reject, prepend, pipe } from 'ramda'

const Filters = (props) => {
  const { networks, teams, conferences, setNetwork, setConfGamesOnly, setSelectedTeam, setSelectedConference, setTvNotScheduled } = props;

  const filteredNetworks = pipe(reject(isNil), prepend('-- All --'))(networks);
  const filteredConferences = pipe(reject(isNil), prepend({id: null, name: '-- All --'}))(conferences);

  const handleNetwork = (event) => {
    setNetwork(event.target.value);
  };

  const handleConfGamesOnly = (event) => {
    setConfGamesOnly(event.target.checked);
  }

  const handleTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  const handleConference = (event) => {
    setSelectedConference(event.target.value)
  }

  const handleTvNotScheduled = (event) => {
    setTvNotScheduled(event.target.checked)
  }

  return (
    <div className="px-3 py-2 bg-green-600 text-green-100">
      <div className="flex flex-wrap justify-between">
        <div className="mr-4 flex flex-wrap justify-start items-center py-2 mx-1">
          <label htmlFor="filter-networks" className="font-bold mr-2">Networks:</label>
          <select name="filter-networks" onChange={handleNetwork} onBlur={handleNetwork} defaultValue={`-- All --`} className="appearance-none border bg-white text-black">
            {
              filteredNetworks.map(network => (
                <option key={network} value={network}>{network}</option>
              ))
            }
          </select>
        </div>

        <div className="flex flex-wrap justify-start items-center py-2 mx-1">
          <label htmlFor="tv_not_scheduled" className="font-bold mr-2">TV Not Scheduled:</label>
          <input type="checkbox" name="tv_not_scheduled" onChange={handleTvNotScheduled} onBlur={handleTvNotScheduled} />
        </div>

        <div className="flex flex-wrap justify-start items-center py-2 mx-1">
          <label htmlFor="conf_games_only" className="font-bold mr-2">Conference Only:</label>
          <input type="checkbox" name="conf_games_only" onChange={handleConfGamesOnly} onBlur={handleConfGamesOnly} />
        </div>

        <div className="flex flex-wrap justify-start items-center py-2 mx-1">
          <label htmlFor="teams" className="font-bold mr-2">Team:</label>
          <select onChange={handleTeam} onBlur={handleTeam} name="teams" className="appearance-none border bg-white text-black">
            {
              teams.map((team) => (
                <option key={team.id} value={team.id}>{ team.displayName }</option>
              ))
            }
          </select>
        </div>

        <div className="flex flex-wrap justify-start items-center py-2 mx-1">
          <label htmlFor="conferences" className="font-bold mr-2">Conference:</label>
          <select onChange={handleConference} onBlur={handleConference} name="conferences" className="appearance-none border bg-white text-black">
            {
              filteredConferences.map((conference) => (
                <option key={conference.id} value={conference.id}>{ conference.name }</option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  )
};

export default Filters;