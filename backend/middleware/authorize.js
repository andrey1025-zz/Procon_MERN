const expressJwt = require('express-jwt');
const { secret } = require('config');

const User = require('../models/userModel');
const RefreshToken = require('../models/refreshTokenModel');
const responseStatus = require('../enums/responseStatus');

module.exports = authorize;

function authorize(roles = []) {
  // roles param can be a single role string (e.g. Role.User or 'User') 
  // or an array of roles (e.g. [Role.Admin, Role.User] or ['Admin', 'User'])
  if (typeof roles === 'string') {
    roles = [roles];
  }
  return [
    // authenticate JWT token and attach user to request object (req.user)
    expressJwt({ secret }),

    // authorize based on user role
    async (req, res, next) => {


      const user = await User.findById(req.user.id);
      if (!user || !user.id) {
        return res.status(401).json({
          status: responseStatus.unauthorized, errorMessage: {
            fatalError: "Unauthorized request"
          }
        });
      }
      const refreshTokens = await RefreshToken.find({ user: user.id });
      if (!user || (roles.length && !roles.includes(user.role))) {
        // user no longer exists or role not authorized
        return res.status(401).json({
          status: responseStatus.unauthorized, errorMessage: {
            fatalError: "Unauthorized request"
          }
        });
      }
      // authentication and authorization successful
      req.user.role = user.role;
      req.user.ownsToken = token => !!refreshTokens.find(x => x.token === token);
      next();
    }
  ];
}