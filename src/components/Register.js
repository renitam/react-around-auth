import Flow from "./Flow"

const Register = (props) => {
  const { onRegister, email } = props

  return(
    <Flow title='Sign up' onSubmit={onRegister} initialEmail={email} />
  )
}

export default Register