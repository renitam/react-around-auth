import React from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Login({ title, onSubmit, buttonText, redirectText }) {

  const currentUser = React.useContext(CurrentUserContext) || ''
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  React.useEffect( () => {
    setUserName(currentUser.name || '')
    setUserAbout(currentUser.about || '')
    setUserAvatar(currentUser.avatar || '')
  }, [currentUser])

  return(
    <main>
      <section className='login'>
        <form className={`login__form`} email={email} password={password} onSubmit={onSubmit}>
            <h2 className='login__title'>{title}</h2>
            <button type='submit' className='modal__save'>{buttonText}</button>
            <p>{redirectText}</p>
          </form>
      </section>
    </main>
  )
}

export default Login