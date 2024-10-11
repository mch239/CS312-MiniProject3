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

//Following Permalist Project's lead on putting default Blog titles and number. 
let blogsList = [
    { id: 1, title: "October Scare" },
    { id: 2, title: "Ready for Halloween" },
];

app.get("/", async (req, res) => {
    try {
        const result = await db.query("SELECT * from blogs ORDER BY id ASC");
        blogs = result.rows;
        
        res.render("index.ejs", {
            blogsTitle: "Today",
            blogsList: blogs, 
        });
    }   catch (err) {
            console.log(err);
    }
});

app.post("/home", (req, res) => {
    const blogsTitle = req.body.blogsTitle;
    const blogsText = req.body.blogsText;
    blogsList.push({
        id: generateID(),
        title: blogsTitle,
        description: blogsText,
    });
    res.render(homePath, {
        blogsList: blogsList,
    });
});

//Updating  blog entry
app.post("/edit", async (req, res) => {
    const blogsTitle = req.body.updatedblogsTitle;
    const blogsid = req.body.updatedblogsId;

    try {
        await db.query("UPDATE blogs SET title = ($1) WHERE id = $2", [item, id]);
        res.redirect("/");
    }   catch (err) {
        console.log(err);
    }
});

    





//Console log
app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
  