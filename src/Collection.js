import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';

class Collection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: true
    }
    this.myGames = props.addedGames.sort((a,b) => (a.title > b.title) ? 1 : -1);
  }

  componentDidMount=() => {
    this.props.getUser();
    this.setState({
      toggle: !this.state.toggle
    })
  }

  render () {

    if (this.props.currentUser === null) {
      return (
        <h3>Log in or sign up to see your collection</h3>
      )
    } else {

      return(
        <div>
          <h3>{this.props.currentUser.username}'s Games</h3>
          <ul className="games_list">
            {this.myGames.map(game =>
              <li key={game.gameid}>
                <div className= "games_game">
                  <div className="inner">
                    <h4>{game.title}<br /></h4> &nbsp; &nbsp;
                    <form onSubmit={(e) => {
                      e.preventDefault();
                      const data = {
                        userId:this.props.currentUser.id,
                        gameId:game.id,
                      };
                      this.props.deleteGame(data);
                    }}>
                      <input class="btn btn-danger"
                        type="submit" value="Delete from Collection" />
                    </form>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      )
    }
  }
}

export default Collection;
