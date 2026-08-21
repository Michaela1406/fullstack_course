import { TextField, Button  } from '@mui/material'

const LoginForm = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleSubmit
}) => {
  return (
      <form onSubmit={handleSubmit}>
        <div>
          <TextField variant='standard'
            label="username"
            size="small"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <TextField variant='standard'
            label="password"
            size="small"
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div>
          <Button type="submit" variant="contained" style={{ marginTop: 10 }}>
            login
          </Button>
        </div>
      </form>)
}

export default LoginForm