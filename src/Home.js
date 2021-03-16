import React from 'react';

const Login = props => {
  if (props.currentUser === null) {
    return(
      <div>
        <h3>Login</h3>
        <form onSubmit={props.login}>
          <input
            name="username"
            type="text"
            placeholder="username"
            value={props.username}
            onChange={props.loginOnChange} /><br></br>
          <input
            name="password"
            type="password"
            placeholder="password"
            value={props.password}
            onChange={props.loginOnChange} /><br></br>
          <input
          type="submit" value="Login" />
        </form><br></br>
        <h3>Signup</h3>
        <form onSubmit={props.signup}>
          <input
            name="username1"
            type="text"
            placeholder="username"
            value={props.username1}
            onChange={props.signupOnChange}
            /><br></br>
          <input
            name="password1"
            type="password"
            placeholder="password"
            value={props.password1}
            onChange={props.signupOnChange}
            /><br></br>
          <input
          type="submit" value="Signup" />
        </form>
      </div>
    )
  } else {
    return (
      <div>
        <h3>Welcome {props.username}</h3>
        <form onSubmit={props.logout}>
          <input
            type="submit" value="Logout" />
        </form>
      </div>
    )
  }
}

export default Login;
