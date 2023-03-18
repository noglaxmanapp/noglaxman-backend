const bcrypt = require('bcryptjs')

//Encripta la contraseña
const encrypt = async (textPplain) => {
  const hash = await bcrypt.hash(textPplain, 10)
  return hash
}

//Compara la contraseña plana con la encriptada 
const compare = async (passwordPlain, hashPassword) => {
  return await bcrypt.compare(passwordPlain, hashPassword)
}

module.exports = {
 encrypt,
 compare
}