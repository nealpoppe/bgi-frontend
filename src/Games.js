import React from 'react';
import { Link } from 'react-router-dom';

const Games = props => {
  // console.log(props.gamesList)
  return(
    <div>
      <ul className="games_list">
        {props.gamesList.map(game => (
          <li key={game.id}>
            <div className= "games_game">
              <Link to={`/games/${game.id}`} onclick={props.updateCurrentGame}>
                <div className="inner">
                  <img src={game.image_url} alt="game_image"/>
                  <h4>{game.name}</h4>
                </div>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Games;
