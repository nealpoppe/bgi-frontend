import React from 'react';

const Collection = props => {

  //sorting the games by name
  const myGames = props.addedGames;
  myGames.sort((a,b) => (a.title > b.title) ? 1 : -1);

  return(
    <div>
      {props.addedGames.map(game =>
        <p>Title: {game.title}<br /> Game ID: {game.gameid}</p>
      )}
    </div>

  )
}

export default Collection;
