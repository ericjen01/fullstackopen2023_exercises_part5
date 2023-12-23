
const LoginForm = ({ username, password, handleLogin, updateUsername, updatePassword }) => {

    return (
        <>
            <form onSubmit={handleLogin}>
                Username <input
                    type="text"
                    value={username}
                    onChange={updateUsername}
                />
                Password <input
                    type="text"
                    value={password}
                    onChange={updatePassword}
                />
                <button>Login</button>
            </form>
        </>
    )
}

export default LoginForm