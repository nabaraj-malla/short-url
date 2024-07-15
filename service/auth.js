const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const secretKey = process.env.secretKey;
console.log(secretKey);
function setUser(user) {
  return jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    secretKey
  );
}

function getUser(token) {
  if (!token) {
    return null;
  }

  try {
    // return jwt.verify(token, secretKey);
    const user = jwt.verify(token, secretKey);
    return user;
  } catch (error) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};

// const sessionIdToUserMap = new Map();

// function setUser(id, user) {
//   sessionIdToUserMap.set(id, user);
// }

// function getUser(id) {
//   return sessionIdToUserMap.get(id);
// }
