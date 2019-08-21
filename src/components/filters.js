import React from 'react'
import { isNil, reject, prepend, pipe } from 'ramda'

const Filters = (props) => {
  // console.log(props)
  const { networks, teams, setNetwork, setConfGamesOnly, setSelectedTeam } = props;

  const filteredNetworks = pipe(reject(isNil), prepend('-- All --'))(networks);

  const handleNetwork = (event) => {
    setNetwork(event.target.value);
  };

  const handleConfGamesOnly = (event) => {
    setConfGamesOnly(event.target.checked);
  }

  const handleTeam = (event) => {
    setSelectedTeam(event.target.value);
  };

  return (
    <div className="border border-gray-300 px-3 py-2 rounded bg-gray-100">
      <div className="flex flex-wrap justify-between">
        <div className="mr-4 flex flex-wrap justify-start items-center mb-3">
          <label className="font-bold mr-2">Networks:</label>
          <select onChange={handleNetwork} defaultValue={`-- All --`} className="appearance-none border">
            {
              filteredNetworks.map(network => (
                <option key={network} value={network}>{network}</option>
              ))
            }
          </select>
        </div>

        <div className="flex flex-wrap justify-start items-center mb-3">
          <label className="font-bold mr-2">Conference Only:</label>
          <input type="checkbox" name="conf_games_only" onChange={handleConfGamesOnly} />
        </div>

        <div className="flex flex-wrap justify-start items-center mb-3">
          <label className="font-bold mr-2">Team:</label>
          <select onChange={handleTeam} name="teams" className="appearance-none border">
            {
              teams.map((team) => (
                <option key={team.id} value={team.id}>{ team.displayName }</option>
              ))
            }
          </select>
        </div>
      </div>
    </div>
  )
};

export default Filters;