import React from 'react'
import Flow from './Flow'

function Login({ onLogin, email }) {

  return(
    <Flow title='Log in' onSubmit={onLogin} initialEmail={email} />
  )
}

export default Login