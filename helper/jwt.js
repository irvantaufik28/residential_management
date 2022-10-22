const jwt = require('jsonwebtoken')
function generateAccessToken(data) {
   let user = {
    id : data.id,
    firsName :data.firsName,
    lastName : data.lastName,
    username : data.username,
    email :data.email,
    phone : data.phone,
    roleId : data.roleId
   }
  
    const token = jwt.sign(
        user,
        process.env.JWT_KEY_SECRET,
        {
            expiresIn: '6h'
        }
    )
    return token
    
}

module.exports = generateAccessToken