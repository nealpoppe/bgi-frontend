import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import Home from "./Home"
import Collection from "./Collection"
import Games from "./Games"
import GameDetail from "./GameDetail"

// import 'bootstrap/dist/css/bootstrap.min.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      gamesList: [],
      gamesListAPILoaded: false,
      addedGames: [],
      currentGame: null,
      username: "",
      password: "",
      currentUser: null,
      title: "",
      gameId: ""
    }
  }

  componentDidMount = () => {
    this.getGamesList();
  }

//this is from the user DB
  getUser = async () => {
    console.log("in get user");

    const response = await axios.get(`http://localhost:3001/user/profile/${this.state.currentUser.id}`);
    console.log(response);
    this.setState({
      addedGames: response.data.Games
    })
  }

//this is from the API
  getGamesList = async () => {
    const response = await axios.get("https://api.boardgameatlas.com/api/search?&client_id=yXiWVjYNrj");
    this.setState({
      gamesList: response.data.games,
      gamesListAPILoaded: true
    })
  }

  signupOnChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  signup = async (e) => {
    e.preventDefault();
    const data = {
      username: this.state.username1,
      password: this.state.password1
    }
    console.log(data);

    const response = await axios.post("http://localhost:3001/user/signup", data);
    console.log(response.data);
    this.setState({currentUser: response.data})
    console.log("currentUser in signup");
    console.log(this.state.currentUser);
    console.log(this.state.username);
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

    const response = await axios.post("http://localhost:3001/user/login", data);
    this.setState({currentUser: response.data})
    console.log(this.state.currentUser);
    this.getUser();
  }

  logout = async (e) => {
    e.preventDefault();
    this.setState({currentUser: null})
  }

  addGame = async (data) => {
    console.log(data);
    console.log("in addgame")
    const response = await axios.post(`http://localhost:3001/game/${data.gameid}`, data)
    console.log(response)
    this.getUser();
  }

  addGameOnChange = (e) => {
    e.preventDefault();
    this.setState({[e.target.name]: e.target.value})
  }

  deleteGame = async (data) => {
    console.log(data);
    console.log("in deleteGame")
    const response = await axios.delete(`http://localhost:3001/game/${data.gameId}`, data)
    console.log(response);
    this.getUser();
  }

  updateCurrentGame = (e) => {
    e.preventDefault();
    console.log("in update current game");
    this.setState({currentGame: e.target.value})
    console.log(this.state.currentGame)
  }

  render() {
    return (
      <div className="App">
        <nav>
          <div>
            <h1 id="title">Board Game Index</h1>
          </div>
          <NavLink exact to="/">Home</NavLink>
          <NavLink to="/collection">Collection</NavLink>
          <NavLink to="/games">Games</NavLink>
        </nav>
        <div className="content">
          <Route exact path="/" render={() => (
            <Home username={this.state.username}
              password={this.state.password}
              signupOnChange={this.signupOnChange}
              signup={this.signup}
              loginOnChange={this.loginOnChange}
              login={this.login}
              currentUser={this.state.currentUser}
              getUser={this.getUser}/>
          )} />
          <Route exact path="/collection" render={() => (
            <Collection
              addedGames={this.state.addedGames}
              currentUser={this.state.currentUser}
              currentGame={this.state.currentGame}
              updateCurrentGame={this.updateCurrentGame}
              getUser={this.getUser}
              deleteGame={this.deleteGame} />
          )} />
          {this.state.gamesListAPILoaded ? (
            <div>
              <Route exact path="/games" render={() => (
                <Games gamesList={this.state.gamesList} />
              )} />
              <Route path="/games/:id" render={(routerProps) => (
                <GameDetail
                  gamesList={this.state.gamesList} {...routerProps}
                  addGame={this.addGame}
                  addGameOnChange={this.addGameOnChange}
                  currentUser={this.state.currentUser}/>
              )} />
            </div>) : <p>Data Not Loaded</p> }
        </div>
      </div>
    );
  }
}

export default App;
