import { ExtractJwt, Strategy } from 'passport-jwt';
import User from '../../server/models/User';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_Secret,
  issuer: process.env.JWT_Issuer,
  audience: process.env.JWT_Audience,
};

const JwtStrategy = new Strategy(opts, async (payload, done) => {
  try {
    const user = await User.findOne({ id: payload.sub });

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (err) {
    return done(err);
  }
});

/**
 * Login Required middleware.
 */
export let isAuthenticated = (req, _, next) => {
  if (req.isAuthenticated()) {
    return next();
  }
  throw new Error('Unauthorized');
};

export default function passportConfig(passport) {
  passport.use(JwtStrategy);
}
