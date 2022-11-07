const mongoose = require("mongoose");
//database info
const username = process.env.dbusername;
const password = process.env.password;
const dbname = process.env.dbname;
const db_cluster_url = `mongodb+srv://${username}:${password}@cluster0.08polbo.mongodb.net/${dbname}?retryWrites=true&w=majority`;
//connect database
mongoose
  .connect(db_cluster_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("db connection successfull");
  })
  .catch((err) => {
    //console.log("db connection unsuccessfull", err);
    console.log("db connection unsuccessfull", err.message);
  });
