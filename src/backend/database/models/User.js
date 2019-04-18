const bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
      },
      username: {
        type: DataTypes.STRING(20),
        unique: true,
        validate: {
          is: /^[^._][a-z0-9._]+$/,
          len: [6, 20]
        },
        allowNull: false
      },
      email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          isEmail: true
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      },
      role: {
        type: DataTypes.ENUM("user", "admin"),
        defaultValue: "user",
        allowNull: false
      },
      first_name: {
        type: DataTypes.STRING(30),
        validate: {
          isAlpha: true
        }
      },
      last_name: {
        type: DataTypes.STRING(60),
        validate: {
          isAlpha: true
        }
      },
      dept: {
        type: DataTypes.STRING(50)
      },
      year: {
        type: DataTypes.TINYINT
      }
    },
    {}
  );

  User.associate = function(models) {
    User.hasMany(models.Thread, { foreignKey: "author_id" });
    User.hasMany(models.Post, { foreignKey: "posted_by" });
    User.hasMany(models.Report, { foreignKey: "reported_by" });
    User.belongsToMany(models.Thread, {
      as: "Subscription",
      through: models.SubscriptionModel,
      foreignKey: "user_id"
    });
    User.belongsToMany(models.Thread, {
      as: "ThreadVote",
      through: models.ThreadVoteModel,
      foreignKey: "user_id"
    });
  };

  User.addHook("beforeSave", (user, _options) => {
    return bcrypt
      .hash(user.password, 10)
      .then(hash => {
        user.password = hash;
      })
      .catch(err => {
        console.error(err);
      });
  });

  User.prototype.getFullName = () => {
    return [this.first_name, this.last_name].join(" ");
  };

  return User;
};
