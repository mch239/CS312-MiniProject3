import express from "express";
import bodyParser from "body-parser";
import pg from "pg"; 
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;

//Linking to SQL database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "BlogDB",
    password: "mopassword",
    port: 5432,
});

db.connect();

//Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

//Path definition
const __dirname = dirname(fileURLToPath(import.meta.url));
const indexPath = join(__dirname, "index.ejs");
const homePath = join(__dirname, "views/home.ejs");
const blogDetailsPath = join(__dirname, "views/blogDetails.ejs");

let blogs = [];


app.get("/", async (req, res) => {
  try {
    const result = await db.query("SELECT * FROM blogs ORDER BY id ASC");
    blogs = result.rows;

    res.render("index.ejs", {
      listTitle: "Today",
      listBlogs: blogs,
    });
  } catch (err) {
    console.log(err);
  }
});

app.post("/add", async (req, res) => {
  const item = req.body.newItem;
  // blogs.push({title: item});
  try {
    await db.query("INSERT INTO blogs (title) VALUES ($1)", [blog]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});


app.post("/edit", async (req, res) => {
  const blogs = req.body.updatedblogsTitle;
  const id = req.body.updatedItemId;

  try {
    await db.query("UPDATE blogs SET title = ($1) WHERE id = $2", [item, id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.deleteblogId;
  try {
    await db.query("DELETE FROM blogs WHERE id = $1", [id]);
    res.redirect("/");
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
