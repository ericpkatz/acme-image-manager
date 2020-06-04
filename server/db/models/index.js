const User = require('./user')
const Image = require('./Image')

Image.belongsTo(User)

module.exports = {
  User,
  Image
}
