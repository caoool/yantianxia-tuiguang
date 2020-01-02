import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Redirect } from 'react-router'

export default class Login extends Component {
  state = {
    user: '',
    password: '',
    errmsg: '',
    loggedIn: false,
  }

  login() {
    const { user, password } = this.state
    Meteor.loginWithPassword(user, password, err => {
      if (err) {
        this.setState({ errmsg: err.reason })
      } else {
        this.setState({ loggedIn: true})
      }
    })
  }

  render() {
    if (this.state.loggedIn) return <Redirect to='/' />
    return (
      <div className='row justify-content-md-center align-items-center' style={{height: '100vh'}}>
        <div className='col-md-auto' align='center'>
          <p className='h1 mb-3'>宴天下</p>
          <input className='form-control mt-1 mb-1' type='text' placeholder='用户名'
            value={this.state.user}
            onChange={e => this.setState({user: e.target.value})}/>
          <input className='form-control mt-1 mb-1' type='password' placeholder='密码'
            value={this.state.password}
            onChange={e => this.setState({password: e.target.value})}/>
          <button className='btn btn-primary btn-block mt-3 mb-3' onClick={() => this.login()}>Login</button>
          <p className='text-danger'>{this.state.errmsg}</p>
        </div>
      </div>
    )
  }
}
