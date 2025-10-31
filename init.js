const mongoose = require("mongoose");
const path = require("path");
const Chat = require("./models/chat.js");

main()
  .then(() => {
    console.log("Connection successful");
  })
  .catch((err) => {
    console.log(err);
  });
async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/whatsapp");
}

let allChats = [
  {
    from: "A",
    to: "B",
    msg: "Hii from A",
    created_at: new Date(),
  },
  {
    from: "C",
    to: "D",
    msg: "Hii from C",
    created_at: new Date(),
  },
  {
    from: "E",
    to: "F",
    msg: "Hii from E",
    created_at: new Date(),
  },
  {
    from: "G",
    to: "H",
    msg: "Hii from G",
    created_at: new Date(),
  },
  {
    from: "I",
    to: "J",
    msg: "Hii from I",
    created_at: new Date(),
  },
];
Chat.insertMany(allChats);  