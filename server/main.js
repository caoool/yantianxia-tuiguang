import { Meteor } from 'meteor/meteor'

import '../imports/api/users'
import '../imports/api/redirects'

Meteor.startup(() => {

    if (Meteor.users.find().count() < 1) {
        Accounts.createUser({
            username: 'admin',
            password: 'yantianxia9102',
            profile: {
                name: 'admin',
                phone: '18110252168',
                promotionIndex: 0,
                referer: ''
            }
        })
    }

})
