const jwt_secret = require("./jwt_config");
const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const models = require("backend/database/models/index");
const JWTStrategy = require("passport-jwt").Strategy;
const extractJWT = require("passport-jwt").ExtractJwt;

const SALT_ROUNDS = 10;
const User = models.User;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findOne({ user_id: id }).then(user => {
      done(null, user);
    });
  });

  passport.use(
    "register",
    new localStrategy(
      {
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      },
      (req, username, password, done) => {
        try {
          User.findOne({
            where: {
              username: username
            }
          }).then(user => {
            if (user !== null) {
              // User already exists
              console.log("Username taken.");
              return done(null, false, { message: "Username already taken" });
            } else {
              bcrypt.hash(password, SALT_ROUNDS).then(hashedPassword => {
                const data = {
                  username: username,
                  password: hashedPassword,
                  email: req.body.email
                };
                User.create(data).then(user => {
                  console.log("User created.");
                  return done(null, user);
                });
              });
            }
          });
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    "login",
    new localStrategy(
      {
        usernameField: "username",
        passwordField: "password",
      },
      (username, password, done) => {
        try {
          User.findOne({
            where: {
              username: username
            }
          }).then(user => {
            if (user === null) {
              return done(null, false, { message: "Bad username." });
            } else {
              bcrypt.compare(password, user.password).then(res => {
                if (res !== true) {
                  console.log("Password do not match.");
                  return done(null, false, {
                    message: "Password do not match."
                  });
                }
                console.log("Authenticated.");
                return done(null, user);
              });
            }
          });
        } catch (err) {
          done(err);
        }
      }
    )
  );

  const opts = {
    jwtFromRequest: extractJWT.fromAuthHeaderWithScheme("JWT"),
    secretOrKey: jwt_secret.secret
  };

  passport.use(
    "jwt",
    new JWTStrategy(opts, (jwt_payload, done) => {
      try {
        User.findOne({
          where: {
            username: jwt_payload.id
          }
        }).then(user => {
          if (user) {
            console.log("User found.");
            done(null, user);
          } else {
            console.log("User not found.");
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    })
  );
};
