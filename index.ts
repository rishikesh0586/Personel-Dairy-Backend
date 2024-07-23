import  express  from "express";
import connectDB from "./src/utils/Db.js";
import userrouter from "./src/Routes/User.Routes.js";
const app = express();

app.use(express.json());

const port = 9999;
const uri ='mongodb://127.0.0.1/my_database';
connectDB(uri);
app.use('/',userrouter);
app.listen((port),()=>{
    console.log("server listening on port " + port);
});