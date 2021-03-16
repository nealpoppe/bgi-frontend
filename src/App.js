import React, { Component } from 'react';
import axios from 'axios';
import { Route, NavLink } from 'react-router-dom';
import './App.css';

import Home from "./Home"
import Collection from "./Collection"
import CollectionDetail from "./CollectionDetail"
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
    // this.getGames();
    // this.getUser();
  }

// this is from the game DB
  // getGames = async () => {
  //   console.log("inside getGames");
  //   console.log(this.state.currentUser);
  //   const response = await axios.get("http://localhost:3001/game/all");
  //   this.setState({
  //     addedGames: response.data
  //   })
  //   // console.log(getUser)
  //   console.log(this.state.addedGames);
  //
  // }

//this is from the user DB
  getUser = async () => {
    const response = await axios.get(`http://localhost:3001/user/profile/${this.state.currentUser.id}`);
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
      username: this.state.username,
      password: this.state.password
    }
    // console.log(data);

    const response = await axios.post("http://localhost:3001/user/signup", data);
    this.setState({currentUser: response.data.user.id})
    console.log("currentUser in signup");
    console.log(this.state.currentUser);
    console.log(this.state.username);
    // console.log(this.state.getUser);
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

    const response = await axios.post("http://localhost:3001/user/login", data);
    // console.log(response.data);
    this.setState({currentUser: response.data})
    // console.log("currentUser in login");
    // console.log(this.state.currentUser);
    this.getUser();
    // this.getGames();
  }

  logout = async (e) => {
    e.preventDefault();
    this.setState({currentUser: null})
  }

  addGame = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:3001/games/:id")
    console.log(response)
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
              currentUser={this.state.currentUser}/>
          )} />
          <Route path="/collection/:id" render={(routerProps) => (
            <CollectionDetail gamesList={this.state.gamesList} {...routerProps} addgame={this.addGame}/>
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
