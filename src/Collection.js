import React from 'react';

const Collection = props => {

  return(
    <div>
      {props.addedGames.map(game =>
        <p>Title: {game.title}<br /> Game ID: {game.gameid}</p>
      )}
    </div>

  )
}

export default Collection;
