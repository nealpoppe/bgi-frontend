import React from 'react';
import { Link } from 'react-router-dom';

const Collection = props => {

  //sorting the games by name
  const myGames = props.addedGames;
  myGames.sort((a,b) => (a.title > b.title) ? 1 : -1);
  console.log(myGames)
  console.log(props.currentUser)
  if (props.currentUser === null) {
    return (
      <h3>Log in to see collection</h3>
    )
  } else {
    return(
      <div>
        <ul className="games_list">
          {myGames.map(game =>
            <li key={game.gameid}>
              <div className= "games_game">
                <Link to={`/collection/games/${game.gameid}`}>
                  <div className="inner">
                    <h4>{game.title}<br /></h4>
                  </div>
                </Link>
              </div>
            </li>
          )}
        </ul>
      </div>
    )
  }
}

export default Collection;
