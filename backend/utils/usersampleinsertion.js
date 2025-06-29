const User = require('../models/usermodel');
const mongoose = require('mongoose');

module.exports = async function newfunc() {
  console.log("Checking users...");
  
  const userCount = await User.countDocuments();
  
  if (userCount === 0) {
    console.log("Creating sample user...");
    const newUser = new User({
      handlename: "coder169",
      username: "Kameshwar",
      email: "coder@zcoder.dev",
      password: "hashedpassword456",
      description: "Frontend developer at ZCoder",
      bookmarks: [1]
    });
    await newUser.save();
    console.log("Sample user created");
  } else {
    console.log(`${userCount} users exist - skipping sample creation`);
  }
};