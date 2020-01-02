import { Meteor } from 'meteor/meteor'
import React, { Component } from 'react'
import { Redirect } from 'react-router'
import $ from 'jquery'

export default class Promote extends Component {

    render() {
        const userId = this.props.match.params.userId
        $.getJSON("https://api.ipify.org/?format=json", res => {
            const redirect = {
                userId,
                sourceIp: res.ip,
                userAent: window.clientInformation.userAgent
            }
            Meteor.call('createRedirect', redirect, (err, res) => {
                if (err) {
                    console.log(err)
                } else {
                    Meteor.call('incrementPromotionIndex', userId, (err, res) => {
                        if (err) {
                            console.log(err)
                        } else {
                            this.inputElement.click()
                        }
                    })
                }
            })
        })

        return (
            <div>
                <a href='http://www.whyantianxia.com' ref={input => this.inputElement = input}>跳转中...</a>
            </div>
        )
    }
}
