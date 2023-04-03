const bcrypt = require("bcrypt")

const createPasswordHash = async (user) => {
  const salt = await bcrypt.genSalt(8)
  user.password = await bcrypt.hash(user.password, salt)
}

const verifyPasswordHash = async (password, hash) => {
  return await bcrypt.compare(password, hash)
}

module.exports = {
  createPasswordHash,
  verifyPasswordHash,
}
