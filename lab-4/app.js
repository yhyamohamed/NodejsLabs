const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const port = 3000;
// =========================
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname + "/public")));
// ==========================================
app.get("/", (req, res) => {
  res.render("home");
});
app.get("/login", (req, res) => {
  res.render("login");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  let obj = fs.readFileSync("./data.json", (err, data) => {
    if (err) throw err;
  });
  obj = JSON.parse(obj);
  let checkCredintials = obj.filter((ele) => ele.user == req.body.user && ele.passWord == req.body.pass);
  if (checkCredintials.length <= 0) {
    res.render("login", { errors: "that user doesn't exists " });
  } else {
    checkCredintials = checkCredintials[0];
    res.render("profile", { user: checkCredintials });
  }
});

app.get("/sign-up", (req, res) => {
  res.render("sign-up");
});

app.post("/sign-up", (req, res) => {
  console.log(req.body);
  if (!req.body.user || !req.body.passWord) {
    res.render("sign-up", { errors: "pls provid pass & email " });
  }
  let user = req.body;
  let obj = fs.readFileSync("./data.json", (err, data) => {
    if (err) console.log(err);
  });
  obj = JSON.parse(obj);

  let checkCredintials = obj.filter((ele) => ele.user == user.user && ele.passWord == user.passWord);
  if (checkCredintials.length <= 0) {
    obj.push(user);
    fs.writeFile("./data.json", JSON.stringify(obj), (err) => {
      if (err) console.log(err);
    });
    res.render("profile", { user: user });
  } else {
    res.render("sign-up", { errors: "that user already exists " });
  }
});
// ==========================================
//                 API Routes
// ==========================================
app.post("/api/login", (req, res) => {
    console.log(req.body);
    let obj = fs.readFileSync("./data.json", (err, data) => {
      if (err) throw err;
    });
    obj = JSON.parse(obj);
    let checkCredintials = obj.filter((ele) => ele.user == req.body.user && ele.passWord == req.body.pass);
    if (checkCredintials.length <= 0) {
        res.status(400).send({ error: "that user doesn't exists " });
    } else {
      checkCredintials = checkCredintials[0];
      res.status(200).send({ user: checkCredintials });
    }
  });
  
app.post("/api/sign-up", (req, res) => {
    res.status(404).send({error: "not allowed"});
    if (!req.body.user || !req.body.passWord) {
        res.status(400).send({errors: "pls provid pass & email " });
      }
      let user = req.body;
      let obj = fs.readFileSync("./data.json", (err, data) => {
        if (err) console.log(err);
      });
      obj = JSON.parse(obj);
    
      let checkCredintials = obj.filter((ele) => ele.user == user.user && ele.passWord == user.passWord);
      if (checkCredintials.length <= 0) {
        obj.push(user);
        fs.writeFile("./data.json", JSON.stringify(obj), (err) => {
          if (err) console.log(err);
        });
        res.status(200).send({ user: user });
      } else {
        res.status(404).send({ error: "that user already exists " });
      }
});
app.get('*',(req,res)=>{
    res.status(405).send({error: "method not allowed " });
})
app.post('*',(req,res)=>{
    res.status(405).send({error: "method not allowed " });
})
app.listen(port, () => {
  console.log(` app started on port ${port}`);
});
