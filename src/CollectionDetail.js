import React from 'react';

const CollectionDetail = props => {
  console.log(props);
  const foundGame = props.gamesList.find(game => {
    // console.log(game.id);
    return game.id === props.match.params.id;
  })
  console.log(foundGame);
  return (
    <div>
      <h1>a game</h1>
    </div>
  )
}

export default CollectionDetail;
