import React from 'react'
import AuthForm from './AuthForm'

function Login({ onLogin, email }) {

  return(
    <AuthForm title='Log in' onSubmit={onLogin} initialEmail={email} />
  )
}

export default Login