const seeder = require("mongoose-seed");
const path = require("path");
const MODEL_PATH = path.resolve("src/backend/models");

// Connect to MongoDB via Mongoose
seeder.connect("mongodb://localhost/oisp-buddy", function() {
  // Load Mongoose models
  seeder.loadModels([`${MODEL_PATH}/User.js`]);

  // Clear specified collections
  seeder.clearModels(["User"], function() {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function() {
      seeder.disconnect();
    });
  });
});

const data = [
  {
    model: "User",
    documents: [
      {
        username: "longkh",
        email: "kimhoanglong.cs@gmail.com",
        password: 123456,
        role: "user"
      },
      {
        username: "jimcbl",
        email: "jimcbl@gmail.com",
        password: 123456,
        role: "user"
      },
      {
        username: "sarah123",
        email: "sarah@gmail.com",
        password: 123456,
        role: "user"
      },
      {
        username: "anng96",
        email: "anng96@gmail.com",
        password: 123456,
        role: "admin"
      }
    ]
  }
];
