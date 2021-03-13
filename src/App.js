import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import Home from "./Home"
import Collection from "./Collection"
import Games from "./Games"
import GameDetail from "./GameDetail"

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gamesList: [],
      gamesListAPILoaded: false,
      addedGames: [],
      username: "",
      password: "",
      currentUser: null
    }
  }

  componentDidMount = () => {
    this.getGamesList();
    this.getGames();
    // this.getUser();
  }

// this is from the game DB
  getGames = async () => {
    const response = await axios.get("http://localhost:3001/game/all")
    this.setState({
      addedGames: response.data
    })

  }

//this is from the user DB
  getUser = async () => {
    const response = await axios.get(`http://localhost:3001/user/profile/${this.state.currentUser}`)
    console.log(response.data);
  }

//this is from the API
  getGamesList = async () => {
    const response = await axios.get("https://api.boardgameatlas.com/api/search?&client_id=yXiWVjYNrj")
    this.setState({
      gamesList: response.data.games,
      gamesListAPILoaded: true
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
    // console.log(data);

    const response = await axios.post("http://localhost:3001/auth/login", data);
    this.setState({currentUser: response.data.user.id})
    console.log(this.state.currentUser);
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
            <Home username={this.state.username} password={this.state.password}
              loginOnChange={this.loginOnChange} login={this.login} />
          )} />
          <Route path="/collection" render={() => (
            <Collection addedGames={this.state.addedGames} />
          )} />
          {this.state.gamesListAPILoaded ? (
            <div>
              <Route exact path="/games" render={() => (
                <Games gamesList={this.state.gamesList} />
              )} />
              <Route path="/games/:id" render={(routerProps) => (
                <GameDetail gamesList={this.state.gamesList} {...routerProps} />
              )} />
            </div>) : <p>Data Not Loaded</p> }
        </div>
      </div>
    );
  }
}

export default App;
