const connection = require("../config/connection")
const { User } = require("../models")

connection.once('open', async () => {
  await User.deleteMany()

  await User.create({
    username: "Max",
    email: "maxrrice@hotmail.com",
    password: "12345"
  })
  console.log("Seed complete!")
  process.exit(0)
})