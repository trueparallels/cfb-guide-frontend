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
    <div className="border border-gray-300 px-3 py-2 rounded">
      <div className="inline-flex justify-between">
        <label className="font-bold mr-2">Networks:</label>
        <select onChange={handleNetwork} defaultValue={`-- All --`} className="block appearance-none border px-16">
          {
            filteredNetworks.map(network => (
              <option key={network} value={network}>{network}</option>
            ))
          }
        </select>

        <label className="font-bold mr-2">Conference Games Only:</label>
        <input type="checkbox" name="conf_games_only" onChange={handleConfGamesOnly} />
      </div>

      <div className="inline-flex justify-between mt-2">
        <label className="font-bold mr-2">Teams:</label>
        <select onChange={handleTeam} name="teams">
          {
            teams.map((team) => (
              <option key={team.id} value={team.id}>{ team.displayName }</option>
            ))
          }
        </select>
      </div>
    </div>
  )
};

export default Filters;