import express from "express";
import bodyParser from "body-parser";
import pg from "pg"; 

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

//middleware
app.use(express.static("public"));

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//Come back to change 'today'
app.get("/", (req, res) => {
    res.render("index.ejs", {
        listTitle: "Today",
        listItems: items,   
    });
});

//Adding new blog entry
app.post("/add", (req, res) => {
    const item = req.body.newItem;
    items.push({ title: item });
    res.redirect("/");
});





//Console log
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
  