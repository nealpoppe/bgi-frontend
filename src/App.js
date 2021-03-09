import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import Home from "./Home"
import Collection from "./Collection"
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
        <h1>Welcome to Board Game Index</h1>
        <nav>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/collection">Collection</NavLink>
          <NavLink to="/games">Games</NavLink>
        </nav>
        <Route exact path="/" render={() => (
          <Home />
        )} />
        <Route path="/collection" render={() => (
          <Collection />
        )} />
        <Route path="/games" render={() => (
          <Games />
        )} />
      </div>
    );
  }
}

export default App;
