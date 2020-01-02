Meteor.methods({

    // createUser: newUserData => Accounts.createUser(newUserData),

    // changePassword: (oldPassword, newPassword) => Accounts.changePassword(oldPassword, newPassword),

    incrementPromotionIndex: userId => Meteor.users.update({ _id: userId }, { $inc: { 'profile.promotionIndex': 1 } })
    
})