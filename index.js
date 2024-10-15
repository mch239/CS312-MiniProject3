import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const app = express();
const port = 3000;



//Connect to BlogDB database
const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "blogdb",
    password: "mopassword",
    port: 5432,
});
db.connect();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));


let blogList = [];

//Page get routes
//Home Page
app.get("/", (req, res) => {
    res.render("home.ejs");
});

//Login Page after clicking login button
app.get("/login", (req, res) => {
    res.render("login.ejs");
});

//Register Page after clicing register button
app.get("/register", (req, res) => {
    res.render("register.ejs");
});

app.get("/home", (req, res) => {
    res.render("blog.ejs");
});


//Page post routes
//using name here instead of email because did not include 'email' in DB
app.post("/register", async (req, res) => {
    const name = req.body.name;
    const username = req.body.username;
    const password = req.body.password;
    console.log(username);
    console.log(password);

    try {
        const checkResult = await db.query("SELECT * FROM users WHERE username = $1", [
            username,
        ]);
    if (checkResult.rows.lenght > 0) {
        res.send("Registered username already exists. Try logging in.");
    } else {
        //If not already registered, insert credentials into DB
    const result = await db.query("INSERT INTO users (username, password, name) VALUES ($1, $2, $3)",
        [username, password, name]
    );
    console.log(result);
    res.render("blog.ejs");
    }
    } catch(err) {
        console.log(err);
    }
});

app.post("/login", async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
        try{
            const result = await db.query("SELECT * FROM users WHERE username = $1", [
                username,
            ]);
            if (result.rows.length > 0) {
                const user = result.rows[0];
                const storedPassword = user.password;

                if (password === storedPassword) {
                    res.render("blog.ejs");
                } else {
                    res.send("Incorrect Password");  
                }
            } else {
                res.send("User not found");
            }
        } catch(err) {
            console.log(err);
        }
});




app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});