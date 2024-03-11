const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require("mongoose");
axios = require("axios")
const fs = require('fs');

var port = "3000"
var http = require('http')
var path = require('path')
var nodemailer = require('nodemailer')


const app = express();
const server = http.Server(app)
const Blog = require('../models/Blog');
const API_URL = "http://localhost:6000"

mongoose.set('strictQuery', true)
mongoose.connect("mongodb+srv://admin:1234@api.w1sen0x.mongodb.net/?retryWrites=true&w=majority");

app.set("port", port)
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "views/contact.ejs")));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


// Routes

// Home Page
app.get("/", async (req, res) => {
  const response = await axios.get(`${API_URL}/Blog/?key=123456789`);
  res.render("home", { Blogs: response.data })
})
app.get("/about", async (req, res) => {
  res.render("about")
})

app.get("/contact", async (req, res) => {
  res.render("contact")
})

app.get("/sign", async (req, res) => {
  res.render("sign")
})


// Read more page
app.get("/readMore/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/Blog/${req.params.id}`);
    // console.log(response.data);
    res.render("readMore", { blog: response.data });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});



app.get("/createBlog", async (req, res) => {
  res.render("createBlog", {
    heading: "New Blog",
    submit: "Create"
  })
});

app.post("/Blog", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/Blog`, req.body);
    // console.log(response.data);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
})

// Contact page



app.post("/Contact", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/Message`, req.body);
    // console.log(response.data);
    res.redirect("/Contact");
  } catch (error) {
    res.status(500).json({ message: "error" });
  }
})




// Admin Side



app.get("/admin", (req, res) => {
  res.render("admin")
})

// Blog data

app.get("/blog", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/Blog/?key=123456789`)
    res.render("blog", { datas: response.data })
  } catch (error) {
    res.status(500).json({ message: "error" });

  }

})
app.get("/edit/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/Blog/${req.params.id}`);
    res.render("createBlog", {
      heading: "Edit Blog",
      submit: "Update Blog",
      Blogs: response.data,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

app.post("/api/Blog/:id", async (req, res) => {
  // console.log("called");
  try {
    const response = await axios.patch(`${API_URL}/Blog/${req.params.id}`, req.body);
    // console.log(response.data);
    res.redirect("/blog");
  } catch (error) {
    res.status(500).json({ message: "Error updating blog" });
  }
});

app.get("/api/blog/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/Blog/${req.params.id}/?key=123456789`);
    res.redirect("/blog");
  } catch (error) {
    res.json({ message: "Error deleting Blog" });
  }
});
// User data

// app.get("/blog", (req, res) => {
//   const response = axios.get(`${API_URL}/`Post`s/?key=123456789`)
//   res.render("blog", { Datas: response.data })
// })


// User message

app.get("/message", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/Message/?key=123456789`)
    res.render("message", { datas: response.data })
  } catch (error) {
    res.status(500).json({ message: "error" });

  }
})


app.get("/api/message/delete/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/Message/${req.params.id}/?key=123456789`);
    res.redirect("/message");
  } catch (error) {
    res.json({ message: "Error deleting Message" });
  }
});


app.listen(process.env.PORT || port, () => {
  console.log("Listening on port 3000");
});
