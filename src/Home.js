import React from 'react';

const Login = props => {
  if (props.currentUser === null) {
    return(
      <div>
        <h3>Signup</h3>
        <form onSubmit={props.signup}>
          <input
            name="username" type="text"
            value={props.username} onChange={props.signupOnChange} /><br></br>
          <input
            name="password" type="password"
            value={props.password} onChange={props.signupOnChange} /><br></br>
          <input
          type="submit" value="Signup" />
        </form><br></br>
        <h3>Login</h3>
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
  } else {
    return (
      <div>Welcome {props.username}
        <form onSubmit={props.logout}>
          <input
            type="submit" value="Logout" />
        </form>
      </div>
    )
  }
}

export default Login;
