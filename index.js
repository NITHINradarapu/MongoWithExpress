const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Chat = require("./models/chat.js");
const methodOverride = require('method-override');

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

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

app.get("/", (req, res) => {
  res.send("root is working");
});
// this route shows all chats
app.get("/chats", async (req, res) => {
  let chats = await Chat.find(); // fetches all chats
  res.render("index.ejs", { chats });
});

// this route takes to new chat page
app.get("/chats/new", (req, res) => {
  res.render("new.ejs");
});

// from new chat we have a post request so accept that and show on main route
app.post("/chats", (req, res) => {
  let { from, to, msg } = req.body;
  let newChat = new Chat({
    from: from,
    to: to,
    msg: msg,
    created_at: new Date(),
  });
  newChat
    .save()
    .then((req) => console.log("New chat Added"))
    .catch((err) => console.log(err));
  res.redirect('/chats');
});


// Edit Chat Route
app.get("/chats/:id/edit", async (req, res) => {
  let { id } = req.params; // Fetch the chat ID from the URL
  let chat = await Chat.findById(id); // Retrieve the chat from the database

  if (!chat) {
    return res.status(404).send("Chat not found");
  }

  res.render("edit.ejs", { chat }); // Render the edit page and pass the chat object
});

// Accepting Edit chat route
app.put("/chats/:id",async(req,res) => {
  let {id} = req.params;
  let {msg:newMsg} = req.body;
  let updatedMsg =await Chat.findByIdAndUpdate(id, {msg:newMsg}, {runValidators:true, new:true});
  console.log(updatedMsg);
  res.redirect("/chats");
})

//Deleting chat route
app.delete("/chats/:id" , async(req,res)  => {
  let {id} = req.params;
  let deletedChat =await Chat.findByIdAndDelete(id);
  console.log(deletedChat);
  res.redirect("/chats");
})

//-----
app.listen(8080, () => {
  console.log("App is listening");
});
