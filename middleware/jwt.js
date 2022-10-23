const jwt = require('jsonwebtoken');
const resData = require('../helper/response');

function getToken(authHeader) {
  let splitHeader = authHeader.split(' ');

  if (splitHeader.length > 1) {
    return splitHeader[1];
  }

  return splitHeader[0];
}

const authorized = (authorization, roleId) => {
  try {

    if (authorization !== undefined && typeof authorization !== 'string') {
      return null;
    }
    let token = getToken(authorization);
    let payload = null;
    payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
    if (payload.roleId !== roleId) {
      return null;
    }
    const user = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
    return user;
  } catch (err) {
    return null;
  }

};

const admin = (req, res, next) => {
  const { authorization } = req.headers;
  const roleId = 1;
  const getAuthorization = authorized(authorization, roleId);

  if (getAuthorization === null) {
    return res.status(401).json(resData.failed('unauthorized'));
  }
  req.user = getAuthorization;
  next();
};

const member = (req, res, next) => {
  const { authorization } = req.headers;
  const roleId = 2;
  const getAuthorization = authorized(authorization, roleId);
  if (getAuthorization === null) {
    return res.status(401).json(resData.failed('unauthorized'));
  }

  req.user = getAuthorization;

  next();
};


const authorizedPublic = (authorization, isRegistered) => {
  try {

    if (authorization !== undefined && typeof authorization !== 'string') {
      return null;
    }
    let token = getToken(authorization);
    let payload = null;
    payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
    if (payload.isRegistered !== isRegistered) {
      return null;
    }
    const user = {
      id: payload.id,
      username: payload.username,
      email: payload.email,
    };
    return user;
  } catch (err) {
    return null;
  }

};

const public = (req, res, next) => {
  const { authorization } = req.headers;
  let isRegistered = true;
  const getAuthorization = authorizedPublic(authorization, isRegistered);

  if (getAuthorization === null) {
    return res.status(401).json(resData.failed('unauthorized'));
  }

  req.user = getAuthorization;

  next();
};

function socket_io(socket, next) {
  let authHeader = socket.handshake.headers['authorization']

  if (typeof authHeader !== 'string') {
    return next(new Error(resData.failed('unauthorized')));
  }

  let token = getToken(authHeader);
  let payload = null;

  try {
    payload = jwt.verify(token, process.env.JWT_KEY_SECRET);
  } catch (err) {
    return next(new Error(resData.failed('unauthorized')))
  }

  let auth = {
    username: payload.username,
    roleId: payload.roleId
  };
  socket.handshake.auth = auth
  next()

};

module.exports = { public, member, admin, public, socket_io };