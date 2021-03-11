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
      gamesList: [],
      username: "",
      password: "",
    }
  }

  componentDidMount = () => {
    this.getGamesList();
    this.getGames();
    this.getUser();
  }

  getGames = async () => {
    const response = await axios.get("http://localhost:3001/game/all")
    console.log(response.data);
  }

  getUser = async () => {
    const response = await axios.get("http://localhost:3001/user/profile/1")
    console.log(response.data);
  }

  getGamesList = async () => {
    const response = await axios.get("https://api.boardgameatlas.com/api/search?&client_id=yXiWVjYNrj")
    this.setState({
      gamesList: response.data.games
    })
  }

  loginOnChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  login = async (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username,
      password: this.state.password
    }
    console.log(data);

  }

  render() {
    // console.log("app.js")
    // console.log(this.state.gamesList)
    return (
      <div className="App">
        <nav>
          <div>
            <h1 id="title">Board Game Index</h1>
            <p id="login">Login/Logout</p>
          </div>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/collection">Collection</NavLink>
          <NavLink to="/games">Games</NavLink>
        </nav>
        <div className="content">
          <Route exact path="/" render={() => (
            <Home />
          )} />
          <Route path="/collection" render={() => (
            <Collection />
          )} />
          <Route path="/games" render={() => (
            <Games gamesList={this.state.gamesList}/>
          )} />
        </div>
      </div>
    );
  }
}

export default App;
