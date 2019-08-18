import React from 'react'
import { isNil, reject, prepend, pipe } from 'ramda'

const Filters = (props) => {
  // console.log(props)
  const { networks, setNetwork } = props;

  const filteredNetworks = pipe(reject(isNil), prepend('-- All --'))(networks);

  const handleNetwork = (event) => {
    setNetwork(event.target.value);
  };

  return (
    <div>
      <div className="inline-flex">
        <label className="font-bold mr-2">Networks:</label>
        <select onChange={handleNetwork} defaultValue={`-- All --`} className="block appearance-none border px-16">
          {
            filteredNetworks.map(network => (
              <option key={network} value={network}>{network}</option>
            ))
          }
        </select>
      </div>
      
    </div>
  )
};

export default Filters;