const express = require("express");
const app = express();
const mongoose = require('mongoose');

const apiRoutes = require('./routes/apiRoutes.js');

const port = 3000;

mongoose.connect("mongodb://localhost/clients", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}) .then(() => console.log('DB Connection Successfull'))
.catch((err) => {
    console.error(err)

})

app.use(express.json())
app.use('/api',apiRoutes)

app.use((err,req,res,next)=>{
    res.status(402).send({error:err.message})
})
app.listen(port, () => {
    console.log(` app started on port ${port}`);
  });
  