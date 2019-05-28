const bcrypt = require("bcrypt");
const localStrategy = require("passport-local").Strategy;
const JWTStrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const models = require("backend/database/models/index");
const Op = require("sequelize").Op;

const SALT_ROUNDS = 10;
const User = models.User;

module.exports = passport => {
  passport.serializeUser((user, done) => {
    done(null, user.user_id);
  });

  passport.deserializeUser((id, done) => {
    models.User.findOne({
      where: {
        user_id: id
      }
    }).then(user => {
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
              [Op.or]: [{ username: username }, { email: req.body.email }]
            }
          }).then(user => {
            if (user !== null) {
              // User/Email already exists
              console.log("Username/email taken.");
              return done(null, false, {
                message: "Username/Email already taken!"
              });
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
        passwordField: "password"
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

  // passport.use(
  //   "jwt",
  //   new JWTStrategy(
  //     {
  //       jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
  //       secretOrKey: process.env.JWT_SECRET
  //     },
  //     (payload, done) => {
  //       User.findByPk(payload.id)
  //         .then(user => {
  //           if (user) {
  //             console.log("Found user");
  //             done(null, user);
  //           } else {
  //             console.log("Not found.");
  //             done(null, false);
  //           }
  //         })
  //         .catch(err => {
  //           done(err);
  //         });
  //     }
  //   )
  // );
};
