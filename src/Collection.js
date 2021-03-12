import React from 'react';

const Collection = props => {

  //sorting the games by name
  const myGames = props.addedGames;
  myGames.sort((a,b) => (a.title > b.title) ? 1 : -1);

  return(
    <div>
      {myGames.map(game =>
        <div key={game.gameid}>
          <p>Title: {game.title}<br /> Game ID: {game.gameid}</p>
        </div>
      )}
    </div>

  )
}

export default Collection;
