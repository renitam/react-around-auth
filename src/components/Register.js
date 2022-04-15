import AuthForm from "./AuthForm"

const Register = (props) => {
  const { onRegister, email } = props

  return(
    <AuthForm title='Sign up' onSubmit={onRegister} initialEmail={email} />
  )
}

export default Register