const passport = require('passport');
const { Strategy: JwtStrategy, ExtractJwt } = require('passport-jwt');
const Account = require('../models/Account');

const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET,
};

passport.use(
  new JwtStrategy(jwtOptions, async (jwtPayload, done) => {
    try {
      const account = await Account.findById(jwtPayload.sub);
      if (!account) {
        return done(null, false);
      }
      done(null, account);
    } catch (err) {
      done(err, false);
    }
  })
);

module.exports = passport.authenticate('jwt', { session: false });
