import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";
dotenv.config();
const username = process.env.MONGODB_USER;
const password = process.env.MONGODB_PASSWORD;
const dbName = "test";

const app = express();
const dbUrl = `mongodb+srv://${username}:${password}@cluster0.knp27ox.mongodb.net/${dbName}?retryWrites=true&w=majority`;
const options = {
	useNewUrlParser: true,
	useUnifiedTopology: true,
};
mongoose
	.connect(dbUrl, options)
	.then(() => console.log("MongoDB Connected"))
	.catch((error) => console.log("MongoDB : " + error.message));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/user", userRoute);
app.listen(3001, () => {
	console.log("Server Connected");
});
