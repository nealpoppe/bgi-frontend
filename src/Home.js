import React from 'react';

const Home = props => {
  return(
    <div>
      <form onSubmit={props.login}>
        <input
          name="username" type="text"
          value={props.username} onChange={props.loginOnChange} /><br></br>
        <input
          name="password" type="password"
          value={props.password} onChange={props.loginOnChange} /><br></br>
        <input
        type="submit" value="Login" />
      </form>
    </div>
  )
}

export default Home;
