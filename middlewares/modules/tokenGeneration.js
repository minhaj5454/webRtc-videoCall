
const jwt = require('jsonwebtoken');
const { ACCESS_TOKEN_SECRET } = process.env;

exports.generateToken = (user, expiresIn) => {
  const tokenPayload = {
    id: user._id,
    isAdmin: user.isAdmin,
    isCompany : user.isCompany,
    email: user.email,
    isInspector : user.isInspector,
    isOperator : user.isOperator,
    isCompanyAdmin : user.isCompanyAdmin
  };

  const token = jwt.sign(tokenPayload, ACCESS_TOKEN_SECRET, {
    expiresIn: expiresIn, // Dynamic expiration time
  });
  return token;
};
