import React from 'react';

const Games = props => {
  console.log(props.gamesList)
  return(
    <ul className="games_list">
      {props.gamesList.map(game => (
        <li key={game.id}>
          <div className= "games_game">
            <img src={game.image_url} alt="game_image"/>
            <h4>{game.name}</h4>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default Games;
