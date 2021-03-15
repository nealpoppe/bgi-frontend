import React from 'react';

const Collection = props => {

  //sorting the games by name
  const myGames = props.addedGames;
  myGames.sort((a,b) => (a.title > b.title) ? 1 : -1);

  return(
    <div>
      <ul className="games_list">
        {myGames.map(game =>
          <div className="games_game">
            <li key={game.gameid}>
              <p>Title: {game.title}<br /> Game ID: {game.gameid}</p>
            </li>
          </div>
        )}
      </ul>
    </div>

  )
}

export default Collection;
