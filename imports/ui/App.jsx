import { Meteor } from 'meteor/meteor'
import { withTracker } from 'meteor/react-meteor-data'
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import QRCode from 'qrcode-react'

class App extends Component {
    state = {
        loggedIn: true,
        promotionUrl: `${window.location.origin}/promote/${Meteor.userId()}`,
        oldPassword: '',
        password: '',
        password2: '',
        errmsgClass: '',
        errmsg: '',
        newUsername: '',
        newPassword: '',
        newPassword2: '',
        newName: '',
        newPhone: '',
        newErrmsgClass: '',
        newErrmsg: ''
    }

    changePwd() {
        if (this.state.password != this.state.password2) {
            this.setState({
                errmsg: '两次输入密码不一致',
                errmsgClass: 'text-danger'
            })
            return
        }

        if (!this.state.oldPassword || !this.state.password || !this.state.password2) {
            this.setState({
                errmsg: '请确认已填写所有项目',
                errmsgClass: 'text-danger'
            })
            return
        }

        Meteor.call('changePassword', this.state.oldPassword, this.state.password, err => {
            if (err) {
                this.setState({
                    errmsg: err.reason,
                    errmsgClass: 'text-danger'
                })
            } else {
                this.setState({
                    errmsg: '已为您更改密码',
                    errmsgClass: 'text-success'
                })
            }
        })
    }

    logout() {
        Meteor.logout(err => {
            if (!err) this.setState({ loggedIn: false })
        })
    }

    createUser() {
        if (this.state.newPassword != this.state.newPassword2) {
            this.setState({
                newErrmsg: '两次输入密码不一致',
                newErrmsgClass: 'text-danger'
            })
            return
        }

        if (!this.state.newUsername || !this.state.newPassword || !this.state.newName || !this.state.newPhone) {
            this.setState({
                newErrmsg: '请确认已填写所有栏目',
                newErrmsgClass: 'text-danger'
            })
            return
        }

        const newUser = {
            username: this.state.newUsername,
            password: this.state.newPassword,
            profile: {
                name: this.state.newName,
                phone: this.state.newPhone,
                promotionIndex: 0,
                referer: Meteor.userId()
            }
        }

        Meteor.call('createUser', newUser, err => {
            if (err) {
                this.setState({
                    newErrmsg: err.reason,
                    newErrmsgClass: 'text-danger'
                })
            } else {
                this.setState({
                    newErrmsg: '已为您新建推广用户',
                    newErrmsgClass: 'text-success'
                })
            }
        })
    }

    render() {
        if (!this.state.loggedIn) return <Redirect to='/login' />

        const { name, phone, promotionIndex } = this.props.user ? this.props.user.profile : {}

        return (
            <div className='container'>
                <div className='row justify-content-md-center align-items-center mt-5 mb-5' style={styles.row}>
                    <div className='col-12 col-md-6'>
                        <div className='card'>
                            <div className='ml-2 mr-2 mt-2 mb-2' align='center'>
                                <QRCode value={this.state.promotionUrl} align='center' />
                                <p>右键或长按进行下载</p>
                            </div>
                            <div className='card-header'>
                                用户信息
                            </div>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>姓名：{name}</li>
                                <li className='list-group-item'>电话：{phone}</li>
                                <li className='list-group-item'>推广指数：{promotionIndex}</li>
                                <li className='list-group-item'>
                                <input className='form-control mb-1' type='text' placeholder='原始密码'
                                    value={this.state.oldPassword}
                                    onChange={e => this.setState({oldPassword: e.target.value})}/>
                                <input className='form-control mb-1' type='text' placeholder='新密码'
                                    value={this.state.password}
                                    onChange={e => this.setState({password: e.target.value})}/>
                                <input className='form-control' type='text' placeholder='确认新密码'
                                    value={this.state.password2}
                                    onChange={e => this.setState({password2: e.target.value})}/>
                                <p className={this.state.errmsgClass}>{this.state.errmsg}</p>
                                </li>
                            </ul>
                            <div className='card-body' align='center'>
                                <button className='btn btn-primary mr-4' onClick={() => this.changePwd()}>更改密码</button>
                                <button className='btn btn-primary' onClick={() => this.logout()}>登出</button>
                            </div>
                        </div>
                    </div>
                    <div className='col-12 col-md-6'>
                        <div className='card'>
                            <div className='card-header'>
                                新增推广用户
                            </div>
                            <ul className='list-group list-group-flush'>
                                <li className='list-group-item'>
                                <input className='form-control' type='text' placeholder='用户名'
                                    value={this.state.newUsername}
                                    onChange={e => this.setState({newUsername: e.target.value})}/>
                                </li>
                                <li className='list-group-item'>
                                <input className='form-control mb-1' type='text' placeholder='密码'
                                    value={this.state.newPassword}
                                    onChange={e => this.setState({newPassword: e.target.value})}/>
                                <input className='form-control' type='text' placeholder='确认密码'
                                    value={this.state.newPassword2}
                                    onChange={e => this.setState({newPassword2: e.target.value})}/>
                                </li>
                                <li className='list-group-item'>
                                <input className='form-control mb-1' type='text' placeholder='姓名'
                                    value={this.state.newName}
                                    onChange={e => this.setState({newName: e.target.value})}/>
                                <input className='form-control' type='text' placeholder='电话'
                                    value={this.state.newPhone}
                                    onChange={e => this.setState({newPhone: e.target.value})}/>
                                </li>
                            </ul>
                            <div className='card-body' align='center'>
                                <button className='btn btn-primary' onClick={() => this.createUser()}>加入</button>
                                <p className={this.state.newErrmsgClass}>{this.state.newErrmsg}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const styles = {
    row: {
        // height: '100vh',
        overflow: 'scroll'
    }
}

const AppContainer = withTracker(() => {
    return { user: Meteor.user() }
})(App)

export default AppContainer