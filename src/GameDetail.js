import React from 'react';

const GameDetail = props => {
  const foundGame = props.gamesList.find(game => {
    return game.id === props.match.params.id;
  })
  console.log(foundGame);
  console.log(props.currentUser)
  return (
    <div className="game_content">
      <img src={foundGame.image_url} alt="game_image"/>
      <h1>{foundGame.name}</h1>

      <form onSubmit={(e) => {
        e.preventDefault();
        const data = {
          title:foundGame.name,
          gameid:foundGame.id,
          userId:props.currentUser.id
        };
        props.addGame(data);
        props.history.push("/");
      }}>
        <input
          type="submit" value="Add Game to Collection" />
      </form><br></br>

      <div className="game_detail_content">
        {foundGame.min_players} - {foundGame.max_players} Players &nbsp; &nbsp;
        {foundGame.min_playtime} - {foundGame.max_playtime} Minutes &nbsp; &nbsp;
        Age:{foundGame.min_age}+
        <br></br><br></br>
        Designer: {foundGame.primary_designer.name}<br></br>
        Publisher: {foundGame.primary_publisher.name}
        <br></br><br></br>
        {foundGame.description_preview}
      </div>
    </div>
  )
}

export default GameDetail;
