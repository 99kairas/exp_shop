const db = require('../index')

const User = db.user

exports.userSeed = () => {
    User.create({
        name: 'Rizki Andika S',
        email: 'rizkiandika616@gmail.com',
        phone: '0878813234',
        password: '$2a$08$Ri25LYKfKRAHBBFhh4B0BuRerhMRAuxkW0WbmFMkpWPOEULmKe6hy', //password
    })
}