const jwt = require('jsonwebtoken');

function generateAccessToken(data) {
  const userData = {
    id: data.id,
    firstName: data.firstName,
    lastName : data.lastName,
    username: data.username,
    email: data.email,
    isAdmin: data.isAdmin,
  };

  const accessToken = jwt.sign(
    userData,
    process.env.JWT_KEY_SECRET,
    {
      expiresIn: '6h',
    },
  );

  return accessToken;
}

module.exports = generateAccessToken;
