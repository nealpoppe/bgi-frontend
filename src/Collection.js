import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Collection extends Component {
  constructor(props) {
    super(props)
    this.state = {
      toggle: false
    }
    this.myGames = props.addedGames.sort((a,b) => (a.title > b.title) ? 1 : -1);
  }
  // useEffect(() => {
  //   console.log("loading component")
  //   props.getUser();
  // })

  //sorting the games by name

  // this.myGames.sort((a,b) => (a.title > b.title) ? 1 : -1);
  // console.log("mygames")
  // console.log(myGames)
  // console.log("currentUser")
  // console.log(props.currentUser)
  componentDidMount=() => {
    console.log("in component did mount")
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
          <ul className="games_list">
            {this.myGames.map(game =>
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
}

export default Collection;
