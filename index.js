const express = require("express");
const path = require("path");
const logger = require("./middlewares/logger");
const exphbs = require("express-handlebars");
const members = require("./Members");

const app = express();

//HandleBars
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.get("/", (req, res) => {
  res.render("index", {
    title: "Members App",
    members,
  });
});

app.use(logger);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/members", require("./routes/api/members"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server runnning on PORT ${PORT}...`));
