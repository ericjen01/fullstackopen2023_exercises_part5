import PropTypes from 'prop-types'
const LoginForm = ({ username, password, handleLogin, updateUsername, updatePassword }) => {

  return (
    <>
      <form onSubmit={handleLogin}>
        Username <input
          id='username'
          type="text"
          value={username}
          onChange={updateUsername}
        />
        Password <input
          id='password'
          type="text"
          value={password}
          onChange={updatePassword}
        />
        <button id='login'>Login</button>
      </form>
    </>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  updateUsername: PropTypes.func.isRequired,
  updatePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm