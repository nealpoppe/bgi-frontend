import React from 'react';

const GameDetail = props => {
  const foundGame = props.gamesList.find(game => {
    return game.id === props.match.params.id;
  })
  console.log(foundGame);
  return (
    <div>
      <img src={foundGame.image_url} alt="game_image"/>
      <h1>{foundGame.name}</h1>
    </div>
  )
}

export default GameDetail;
