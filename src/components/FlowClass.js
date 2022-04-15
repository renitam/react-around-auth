import React from 'react';
import * as auth from '../utils/auth';
import { Link, useHistory } from "react-router-dom";
import api from '../utils/api';

class FlowClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: props.title,
      email: '',
      _password: '',
      _hide: true,
      _icon: 'fa-solid fa-eye'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleEye = this.handleEye.bind(this)
  }
  // const { title } = this.props;
  // const [email, setEmail] = React.useState('');
  // const [password, setPassword] = React.useState('');
  // const [token, setToken] = React.useState('');
  // const [hide, setHide] = React.useState(true);
  // const [icon, setIcon] = React.useState('fa-solid fa-eye');

  handleChange = (e) => {
    const { name, value } = e.target
    this.setState({
      [name]: value
    })
  }

  handleSubmit = (e) => {
    // Prevent the browser from navigating to the form address
    e.preventDefault();
    if (this.title === 'Sign up') {
      auth.register(this.email, this._password)
      .then(res => this.setState({
        email: res.email,
        _password: ''
      }))
      .then(res => this.props.history.push('/signin'))
    } else if (this.title === 'Log in') {
      auth.login(this.email, this._password)
        .then(res => localStorage.setItem('token', res.token))
        .then(res => this.props.history.push('/'))
    }
    // Pass the values of the managed components to the external handler
    console.log(this.email, this._password);
  } 

  handleEye = (e) => {
    if (this._icon === 'fa-solid fa-eye') {
      this.setState({
        _hide: false,
        _icon: 'fa-solid fa-eye-slash'
      });
    } else {
      this.setState({
        _hide: true,
        _icon: 'fa-solid fa-eye'
      });
    }
  }

  render () {
    return (
      <main className='auth'>
        <form className='auth__form' name='auth' onSubmit={this.handleSubmit}>
          <h2 className='auth__this.title'>{this.title}</h2>
          <input
            type='text'
            name='email'
            id='email'
            placeholder='Email'
            value={this.email}
            onChange={this.handleChange}
            className='auth__input'
            minLength='3'
            maxLength='256'
            required
          />
          <span className='auth__input-error auth__input-error_email'></span>
          <input
            type={this._hide ? 'password' : 'text'}
            name='password'
            id='password'
            placeholder='Password'
            value={this._password}
            onChange={this.handleChange}
            className='auth__input'
            minLength='8'
            maxLength='16'
            required
          />
          <i className={`${this._icon} auth__eye link`} onClick={this.handleEye} />
          <span className='auth__input-error auth__input-error_pass'></span>
          <button type='submit' className='auth__save'>{this.title}</button>
        </form>
      </main>
    )
  }
}

export default FlowClass;