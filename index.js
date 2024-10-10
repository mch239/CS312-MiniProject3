import express from "express";
import bodyParser from "body-parser";


const app = express();
const port = 3000;

//middleware
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));

app.listen(port, () => {
    console.log('Server started on port ${port}');
});