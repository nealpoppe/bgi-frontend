import React from 'react';

const Games = props => {
  // console.log(props.gamesList)
  return(
    <div>
      <h1>Games Page</h1>
      {props.gamesList.map(game => (
        <div key={game.id}>
          <h4>{game.name}</h4>
        </div>
      ))}
    </div>
  )
}

export default Games;
