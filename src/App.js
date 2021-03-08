import React, { Component } from 'react';
import axios from 'axios';
import { Route, Link } from 'react-router-dom';
import './App.css';

import Home from "./Home"
import Games from "./Games"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      games: [],
    }
  }

  componentDidMount = () => {
    this.getGames();
  }

  getGames = async () => {
    const response = await axios.get("https://api.boardgameatlas.com/api/search?&client_id=yXiWVjYNrj")
    this.setState({
      games: response.data.games
    })
  }

  render() {
    console.log(this.state.games)
    return (
      <div className="App">
        <nav>
          <Link exact to="/">Home</Link>
          <Link exact to="/games">Games</Link>
        </nav>
        <div className="main">
          <Route exact path="/" render={() => (
            <Home />
          )} />
          <Route exact path="/games" render={() => (
            <Games />
          )} />
        </div>
        <h1>Welcome to Board Game Index</h1>
      </div>
    );
  }
}

export default App;
