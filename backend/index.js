import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import userRoute from "./routes/UserRoute.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const dbUrl = process.env.MONGODB_URL;
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
