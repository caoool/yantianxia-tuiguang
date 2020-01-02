import { Mongo } from 'meteor/mongo'
 
const Redirect = new Mongo.Collection('redirects')

Meteor.methods({

    'createRedirect': redirect => Redirect.insert(redirect)

})

export default Redirect